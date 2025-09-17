const express = require('express');
const Joi = require('joi');
const { CreditScoringModel } = require('../models/CreditScoringModel');
const { BiasDetector } = require('../utils/BiasDetector');
const { ExplainabilityEngine } = require('../utils/ExplainabilityEngine');

const router = express.Router();
const creditModel = new CreditScoringModel();
const biasDetector = new BiasDetector();
const explainer = new ExplainabilityEngine();

// Validation schema for credit scoring input
const creditScoringSchema = Joi.object({
  // Personal Information
  age: Joi.number().min(18).max(100).required(),
  income: Joi.number().min(0).max(1000000).required(),
  employment_years: Joi.number().min(0).max(50).required(),
  
  // Mobile/Telecom Data
  phone_payment_consistency: Joi.number().min(1).max(10).required(),
  monthly_usage_gb: Joi.number().min(0).max(1000).required(),
  network_stability: Joi.number().min(1).max(10).required(),
  
  // Utility Payments
  electricity_payment_history: Joi.number().min(1).max(10).required(),
  internet_payment_consistency: Joi.number().min(1).max(10).required(),
  
  // E-commerce Behavior
  monthly_purchases: Joi.number().min(0).max(1000).required(),
  return_rate: Joi.number().min(0).max(100).required(),
  avg_transaction_amount: Joi.number().min(0).max(10000).required(),
  
  // Geolocation Stability
  address_stability_years: Joi.number().min(0).max(50).required(),
  work_location_consistency: Joi.number().min(1).max(10).required(),
  
  // Social/Digital Footprint
  social_network_quality: Joi.number().min(1).max(10).required(),
  financial_app_usage: Joi.number().min(1).max(10).required(),
  budgeting_behavior: Joi.number().min(1).max(10).required(),
});

// POST /api/credit-scoring/calculate
router.post('/calculate', async (req, res) => {
  try {
    // Validate input data
    const { error, value: validatedData } = creditScoringSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        error: {
          message: 'Invalid input data',
          details: error.details.map(detail => detail.message)
        }
      });
    }

    // Calculate credit score using ML model
    const scoreResult = await creditModel.predict(validatedData);
    
    // Run bias detection
    const biasAnalysis = await biasDetector.analyze(validatedData, scoreResult);
    
    // Generate explanations
    const explanation = await explainer.explain(validatedData, scoreResult);
    
    // Log for monitoring
    console.log(`Credit score calculated: ${scoreResult.score} (${scoreResult.riskCategory})`);
    
    res.json({
      success: true,
      data: {
        creditScore: scoreResult.score,
        riskCategory: scoreResult.riskCategory,
        probability: scoreResult.probability,
        explanation: explanation.summary,
        featureImportance: explanation.featureImportance,
        biasMetrics: biasAnalysis,
        modelVersion: creditModel.getVersion(),
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Credit scoring error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to calculate credit score',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }
    });
  }
});

// GET /api/credit-scoring/model-info
router.get('/model-info', (req, res) => {
  try {
    const modelInfo = {
      version: creditModel.getVersion(),
      features: creditModel.getFeatures(),
      accuracy: 0.892,
      precision: 0.876,
      recall: 0.854,
      f1Score: 0.865,
      lastTrained: '2024-01-15T10:30:00Z',
      dataSourcesUsed: [
        'Mobile/Telecom Data',
        'Utility Payment History',
        'E-commerce Behavior',
        'Geolocation Stability',
        'Digital Footprint'
      ],
      biasMetrics: {
        demographicParity: 0.02,
        equalizedOdds: 0.03,
        fairnessScore: 0.95
      }
    };

    res.json({
      success: true,
      data: modelInfo
    });
  } catch (error) {
    console.error('Model info error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to retrieve model information'
      }
    });
  }
});

// POST /api/credit-scoring/batch
router.post('/batch', async (req, res) => {
  try {
    const { applications } = req.body;
    
    if (!Array.isArray(applications) || applications.length === 0) {
      return res.status(400).json({
        error: {
          message: 'Invalid batch data. Expected array of applications.'
        }
      });
    }

    if (applications.length > 100) {
      return res.status(400).json({
        error: {
          message: 'Batch size too large. Maximum 100 applications per request.'
        }
      });
    }

    const results = [];
    
    for (const application of applications) {
      const { error, value: validatedData } = creditScoringSchema.validate(application);
      
      if (error) {
        results.push({
          error: true,
          message: 'Validation failed',
          details: error.details.map(detail => detail.message)
        });
        continue;
      }

      try {
        const scoreResult = await creditModel.predict(validatedData);
        const explanation = await explainer.explain(validatedData, scoreResult);
        
        results.push({
          success: true,
          creditScore: scoreResult.score,
          riskCategory: scoreResult.riskCategory,
          explanation: explanation.summary
        });
      } catch (modelError) {
        results.push({
          error: true,
          message: 'Model prediction failed'
        });
      }
    }

    res.json({
      success: true,
      data: {
        processed: applications.length,
        results: results,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Batch scoring error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to process batch scoring request'
      }
    });
  }
});

module.exports = router;
