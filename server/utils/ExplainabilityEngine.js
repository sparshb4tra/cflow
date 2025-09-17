/**
 * Explainability Engine for Credit Scoring
 * Provides interpretable explanations for credit scoring decisions
 */

class ExplainabilityEngine {
  constructor() {
    this.featureDescriptions = {
      age: 'Age indicates experience and stability in financial decisions',
      income: 'Higher income suggests greater ability to repay debts',
      employment_years: 'Employment stability indicates reliable income source',
      phone_payment_consistency: 'Consistent mobile bill payments show payment discipline',
      monthly_usage_gb: 'Data usage patterns indicate digital engagement and lifestyle',
      network_stability: 'Network quality in area suggests socioeconomic status',
      electricity_payment_history: 'Utility payment history is a strong predictor of creditworthiness',
      internet_payment_consistency: 'Internet bill payments indicate modern lifestyle and payment habits',
      monthly_purchases: 'Online purchasing behavior shows digital commerce engagement',
      return_rate: 'Lower return rates indicate better purchase decisions',
      avg_transaction_amount: 'Transaction patterns reveal spending habits and financial behavior',
      address_stability_years: 'Residential stability indicates life stability and lower risk',
      work_location_consistency: 'Consistent work location suggests employment stability',
      social_network_quality: 'Social connections can indicate support system and stability',
      financial_app_usage: 'Financial app usage shows proactive financial management',
      budgeting_behavior: 'Good budgeting behavior indicates financial responsibility'
    };

    this.positiveFactors = [
      'phone_payment_consistency',
      'electricity_payment_history', 
      'internet_payment_consistency',
      'address_stability_years',
      'employment_years',
      'income',
      'budgeting_behavior',
      'financial_app_usage',
      'network_stability',
      'work_location_consistency'
    ];

    this.negativeFactors = [
      'return_rate' // High return rate is negative
    ];
  }

  /**
   * Generate comprehensive explanation for credit score
   */
  async explain(inputData, scoreResult) {
    try {
      const featureImportance = this.calculateFeatureImportance(inputData);
      const topFactors = this.getTopFactors(featureImportance, 5);
      const summary = this.generateSummary(inputData, scoreResult, topFactors);
      const recommendations = this.generateRecommendations(inputData, featureImportance);
      
      return {
        summary,
        featureImportance,
        topPositiveFactors: topFactors.positive,
        topNegativeFactors: topFactors.negative,
        recommendations,
        riskFactors: this.identifyRiskFactors(inputData),
        improvementAreas: this.identifyImprovementAreas(inputData, featureImportance)
      };
    } catch (error) {
      throw new Error(`Explanation generation failed: ${error.message}`);
    }
  }

  /**
   * Calculate feature importance based on contribution to score
   */
  calculateFeatureImportance(inputData) {
    const importance = {};
    
    // Normalize features for importance calculation
    const normalizedData = this.normalizeForImportance(inputData);
    
    // Calculate importance based on feature weights and values
    const featureWeights = {
      age: 0.08,
      income: 0.15,
      employment_years: 0.12,
      phone_payment_consistency: 0.09,
      monthly_usage_gb: 0.04,
      network_stability: 0.06,
      electricity_payment_history: 0.10,
      internet_payment_consistency: 0.08,
      monthly_purchases: 0.05,
      return_rate: 0.07,
      avg_transaction_amount: 0.04,
      address_stability_years: 0.08,
      work_location_consistency: 0.06,
      social_network_quality: 0.05,
      financial_app_usage: 0.03,
      budgeting_behavior: 0.10
    };

    for (const [feature, weight] of Object.entries(featureWeights)) {
      const normalizedValue = normalizedData[feature];
      const contribution = weight * normalizedValue;
      
      importance[feature] = {
        weight: Math.round(weight * 100),
        normalizedValue: Math.round(normalizedValue * 100) / 100,
        contribution: Math.round(contribution * 1000) / 10,
        impact: this.getImpactLevel(contribution),
        description: this.featureDescriptions[feature]
      };
    }

    return importance;
  }

  /**
   * Normalize data for importance calculation
   */
  normalizeForImportance(data) {
    const normalized = {};
    
    // Age normalization
    normalized.age = Math.min(Math.max((data.age - 18) / (65 - 18), 0), 1);
    
    // Income normalization
    normalized.income = Math.min(data.income / 100000, 1);
    
    // Employment years
    normalized.employment_years = Math.min(data.employment_years / 20, 1);
    
    // Payment consistency scores (1-10 scale)
    normalized.phone_payment_consistency = (data.phone_payment_consistency - 1) / 9;
    normalized.electricity_payment_history = (data.electricity_payment_history - 1) / 9;
    normalized.internet_payment_consistency = (data.internet_payment_consistency - 1) / 9;
    
    // Usage patterns
    normalized.monthly_usage_gb = Math.min(data.monthly_usage_gb / 50, 1);
    normalized.network_stability = (data.network_stability - 1) / 9;
    
    // E-commerce behavior
    normalized.monthly_purchases = Math.min(data.monthly_purchases / 50, 1);
    normalized.return_rate = 1 - (data.return_rate / 100); // Invert for positive correlation
    normalized.avg_transaction_amount = Math.min(data.avg_transaction_amount / 500, 1);
    
    // Stability indicators
    normalized.address_stability_years = Math.min(data.address_stability_years / 10, 1);
    normalized.work_location_consistency = (data.work_location_consistency - 1) / 9;
    
    // Digital footprint
    normalized.social_network_quality = (data.social_network_quality - 1) / 9;
    normalized.financial_app_usage = (data.financial_app_usage - 1) / 9;
    normalized.budgeting_behavior = (data.budgeting_behavior - 1) / 9;
    
    return normalized;
  }

  /**
   * Get impact level based on contribution
   */
  getImpactLevel(contribution) {
    if (contribution >= 8) return 'High Positive';
    if (contribution >= 5) return 'Medium Positive';
    if (contribution >= 2) return 'Low Positive';
    if (contribution >= -2) return 'Neutral';
    if (contribution >= -5) return 'Low Negative';
    if (contribution >= -8) return 'Medium Negative';
    return 'High Negative';
  }

  /**
   * Get top positive and negative factors
   */
  getTopFactors(featureImportance, topN = 5) {
    const factors = Object.entries(featureImportance)
      .map(([feature, data]) => ({ feature, ...data }))
      .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution));

    const positive = factors
      .filter(f => f.contribution > 0)
      .slice(0, topN)
      .map(f => ({
        feature: f.feature,
        contribution: f.contribution,
        description: f.description,
        humanReadable: this.getHumanReadableFactorName(f.feature)
      }));

    const negative = factors
      .filter(f => f.contribution < 0)
      .slice(0, topN)
      .map(f => ({
        feature: f.feature,
        contribution: f.contribution,
        description: f.description,
        humanReadable: this.getHumanReadableFactorName(f.feature)
      }));

    return { positive, negative };
  }

  /**
   * Convert feature names to human-readable format
   */
  getHumanReadableFactorName(feature) {
    const nameMap = {
      age: 'Age',
      income: 'Monthly Income',
      employment_years: 'Employment Stability',
      phone_payment_consistency: 'Mobile Payment History',
      monthly_usage_gb: 'Data Usage Pattern',
      network_stability: 'Network Quality',
      electricity_payment_history: 'Utility Payment History',
      internet_payment_consistency: 'Internet Bill Payments',
      monthly_purchases: 'Online Shopping Frequency',
      return_rate: 'Return Rate',
      avg_transaction_amount: 'Average Transaction Size',
      address_stability_years: 'Residential Stability',
      work_location_consistency: 'Work Location Stability',
      social_network_quality: 'Social Network Quality',
      financial_app_usage: 'Financial App Usage',
      budgeting_behavior: 'Budgeting Habits'
    };

    return nameMap[feature] || feature;
  }

  /**
   * Generate human-readable summary
   */
  generateSummary(inputData, scoreResult, topFactors) {
    const { score, riskCategory } = scoreResult;
    
    let summary = `Your credit score of ${score} places you in the "${riskCategory}" category. `;
    
    if (topFactors.positive.length > 0) {
      const topPositive = topFactors.positive[0];
      summary += `Your strongest factor is ${topPositive.humanReadable}, which positively contributed ${topPositive.contribution.toFixed(1)}% to your score. `;
    }
    
    if (topFactors.negative.length > 0) {
      const topNegative = topFactors.negative[0];
      summary += `The area with the most room for improvement is ${topNegative.humanReadable}, which reduced your score by ${Math.abs(topNegative.contribution).toFixed(1)}%. `;
    }
    
    // Add score range context
    if (score >= 750) {
      summary += 'Excellent score! You qualify for the best rates and terms.';
    } else if (score >= 700) {
      summary += 'Good score! You should qualify for competitive rates.';
    } else if (score >= 650) {
      summary += 'Fair score. Focus on improvement areas to access better rates.';
    } else {
      summary += 'There\'s significant room for improvement. Focus on the recommended areas below.';
    }

    return summary;
  }

  /**
   * Generate personalized recommendations
   */
  generateRecommendations(inputData, featureImportance) {
    const recommendations = [];

    // Income recommendations
    if (inputData.income < 40000) {
      recommendations.push({
        category: 'Income',
        priority: 'High',
        action: 'Focus on increasing income through career development or additional income sources',
        impact: 'High positive impact on credit score',
        timeframe: 'Long-term (6-12 months)'
      });
    }

    // Payment consistency recommendations
    if (inputData.phone_payment_consistency < 8 || inputData.electricity_payment_history < 8) {
      recommendations.push({
        category: 'Payment History',
        priority: 'High',
        action: 'Set up automatic payments for all bills to ensure 100% on-time payment rate',
        impact: 'High positive impact on credit score',
        timeframe: 'Immediate (within 1 month)'
      });
    }

    // Employment stability
    if (inputData.employment_years < 2) {
      recommendations.push({
        category: 'Employment Stability',
        priority: 'Medium',
        action: 'Focus on building tenure at current job or demonstrate consistent employment history',
        impact: 'Medium positive impact on credit score',
        timeframe: 'Long-term (12+ months)'
      });
    }

    // Financial app usage
    if (inputData.financial_app_usage < 5) {
      recommendations.push({
        category: 'Financial Management',
        priority: 'Medium',
        action: 'Use budgeting and financial tracking apps to demonstrate financial responsibility',
        impact: 'Medium positive impact on credit score',
        timeframe: 'Short-term (1-3 months)'
      });
    }

    // Budgeting behavior
    if (inputData.budgeting_behavior < 7) {
      recommendations.push({
        category: 'Budgeting',
        priority: 'High',
        action: 'Implement consistent budgeting practices and track spending patterns',
        impact: 'High positive impact on credit score',
        timeframe: 'Short-term (1-3 months)'
      });
    }

    // Return rate
    if (inputData.return_rate > 15) {
      recommendations.push({
        category: 'Purchase Decisions',
        priority: 'Low',
        action: 'Make more thoughtful purchase decisions to reduce return rate',
        impact: 'Low positive impact on credit score',
        timeframe: 'Short-term (1-3 months)'
      });
    }

    // Address stability
    if (inputData.address_stability_years < 2) {
      recommendations.push({
        category: 'Stability',
        priority: 'Medium',
        action: 'Maintain current address to build residential stability history',
        impact: 'Medium positive impact on credit score',
        timeframe: 'Long-term (12+ months)'
      });
    }

    return recommendations.slice(0, 5); // Return top 5 recommendations
  }

  /**
   * Identify risk factors
   */
  identifyRiskFactors(inputData) {
    const riskFactors = [];

    if (inputData.income < 25000) {
      riskFactors.push({
        factor: 'Low Income',
        severity: 'High',
        description: 'Income below typical lending thresholds may limit access to credit'
      });
    }

    if (inputData.employment_years < 1) {
      riskFactors.push({
        factor: 'Employment Instability',
        severity: 'Medium',
        description: 'Short employment history may indicate income instability'
      });
    }

    if (inputData.return_rate > 25) {
      riskFactors.push({
        factor: 'High Return Rate',
        severity: 'Low',
        description: 'High product return rate may indicate poor decision-making'
      });
    }

    return riskFactors;
  }

  /**
   * Identify improvement areas
   */
  identifyImprovementAreas(inputData, featureImportance) {
    const improvementAreas = [];

    // Find features with high weight but low contribution
    for (const [feature, data] of Object.entries(featureImportance)) {
      if (data.weight >= 8 && data.contribution < 5) {
        improvementAreas.push({
          area: this.getHumanReadableFactorName(feature),
          currentValue: data.normalizedValue,
          potentialImpact: data.weight,
          recommendation: this.getImprovementRecommendation(feature, inputData)
        });
      }
    }

    return improvementAreas.slice(0, 3); // Top 3 improvement areas
  }

  /**
   * Get specific improvement recommendation for a feature
   */
  getImprovementRecommendation(feature, inputData) {
    const recommendations = {
      income: 'Consider increasing income through career advancement or side hustles',
      employment_years: 'Focus on building tenure at your current position',
      phone_payment_consistency: 'Set up automatic payments to ensure consistent mobile bill payments',
      electricity_payment_history: 'Establish automatic utility bill payments',
      internet_payment_consistency: 'Set up automatic internet bill payments',
      budgeting_behavior: 'Use budgeting apps and create a monthly budget plan',
      financial_app_usage: 'Download and actively use financial management applications',
      address_stability_years: 'Maintain your current residence to build stability history',
      social_network_quality: 'Build professional networks and maintain positive relationships',
      return_rate: 'Make more thoughtful purchase decisions to reduce returns'
    };

    return recommendations[feature] || 'Focus on improving this area for better credit outcomes';
  }
}

module.exports = { ExplainabilityEngine };
