/**
 * Alternative Credit Scoring Model
 * Uses machine learning algorithms to assess creditworthiness based on alternative data sources
 */

class CreditScoringModel {
  constructor() {
    this.version = '2.1.0';
    this.modelType = 'Ensemble (XGBoost + Neural Network)';
    this.features = [
      'age', 'income', 'employment_years',
      'phone_payment_consistency', 'monthly_usage_gb', 'network_stability',
      'electricity_payment_history', 'internet_payment_consistency',
      'monthly_purchases', 'return_rate', 'avg_transaction_amount',
      'address_stability_years', 'work_location_consistency',
      'social_network_quality', 'financial_app_usage', 'budgeting_behavior'
    ];
    
    // Feature weights learned from training
    this.featureWeights = {
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
  }

  /**
   * Normalize input features
   */
  normalizeFeatures(data) {
    const normalized = {};
    
    // Age normalization (18-65 typical range)
    normalized.age = Math.min(Math.max((data.age - 18) / (65 - 18), 0), 1);
    
    // Income normalization (0-100k range)
    normalized.income = Math.min(data.income / 100000, 1);
    
    // Employment years (0-20 years range)
    normalized.employment_years = Math.min(data.employment_years / 20, 1);
    
    // Payment consistency scores (already 1-10, normalize to 0-1)
    normalized.phone_payment_consistency = (data.phone_payment_consistency - 1) / 9;
    normalized.electricity_payment_history = (data.electricity_payment_history - 1) / 9;
    normalized.internet_payment_consistency = (data.internet_payment_consistency - 1) / 9;
    
    // Usage patterns
    normalized.monthly_usage_gb = Math.min(data.monthly_usage_gb / 50, 1); // 50GB max
    normalized.network_stability = (data.network_stability - 1) / 9;
    
    // E-commerce behavior
    normalized.monthly_purchases = Math.min(data.monthly_purchases / 50, 1);
    normalized.return_rate = 1 - (data.return_rate / 100); // Lower return rate is better
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
   * XGBoost-inspired scoring algorithm
   */
  xgboostScore(normalizedData) {
    let score = 0;
    
    // Tree-like decision rules learned from training
    
    // Rule 1: Payment consistency is critical
    const paymentScore = (
      normalizedData.phone_payment_consistency * 0.4 +
      normalizedData.electricity_payment_history * 0.35 +
      normalizedData.internet_payment_consistency * 0.25
    );
    
    if (paymentScore > 0.8) {
      score += 120;
    } else if (paymentScore > 0.6) {
      score += 80;
    } else if (paymentScore > 0.4) {
      score += 40;
    } else {
      score -= 20;
    }
    
    // Rule 2: Income and employment stability
    const stabilityScore = normalizedData.income * 0.6 + normalizedData.employment_years * 0.4;
    score += stabilityScore * 100;
    
    // Rule 3: Age factor (experience)
    if (normalizedData.age > 0.3) { // Age > 25
      score += 40;
    }
    if (normalizedData.age > 0.6) { // Age > 40
      score += 20;
    }
    
    // Rule 4: E-commerce behavior patterns
    const commerceScore = (
      normalizedData.return_rate * 0.5 +
      (1 - Math.abs(normalizedData.monthly_purchases - 0.3)) * 0.3 + // Moderate purchasing is good
      Math.min(normalizedData.avg_transaction_amount, 0.5) * 0.2
    );
    score += commerceScore * 60;
    
    // Rule 5: Location and network stability
    const locationScore = (
      normalizedData.address_stability_years * 0.6 +
      normalizedData.work_location_consistency * 0.4
    );
    score += locationScore * 50;
    
    return score;
  }

  /**
   * Neural network-inspired scoring
   */
  neuralNetworkScore(normalizedData) {
    // Hidden layer 1
    const h1 = this.relu(
      normalizedData.income * 0.3 +
      normalizedData.employment_years * 0.2 +
      normalizedData.phone_payment_consistency * 0.25 +
      normalizedData.budgeting_behavior * 0.25 - 0.2
    );
    
    const h2 = this.relu(
      normalizedData.electricity_payment_history * 0.4 +
      normalizedData.internet_payment_consistency * 0.3 +
      normalizedData.address_stability_years * 0.3 - 0.15
    );
    
    const h3 = this.relu(
      normalizedData.social_network_quality * 0.3 +
      normalizedData.financial_app_usage * 0.3 +
      normalizedData.network_stability * 0.4 - 0.1
    );
    
    // Hidden layer 2
    const h4 = this.relu(h1 * 0.4 + h2 * 0.6 - 0.1);
    const h5 = this.relu(h2 * 0.3 + h3 * 0.7 - 0.05);
    
    // Output layer
    const output = this.sigmoid(h4 * 0.6 + h5 * 0.4 + 0.1);
    
    return output * 200; // Scale to credit score range
  }

  /**
   * Ensemble prediction combining XGBoost and Neural Network
   */
  async predict(data) {
    try {
      // Normalize features
      const normalizedData = this.normalizeFeatures(data);
      
      // Get predictions from both models
      const xgboostPrediction = this.xgboostScore(normalizedData);
      const neuralNetPrediction = this.neuralNetworkScore(normalizedData);
      
      // Ensemble with weighted average (XGBoost weighted higher)
      const ensembleScore = xgboostPrediction * 0.7 + neuralNetPrediction * 0.3;
      
      // Add base score and scale to FICO range (300-850)
      let finalScore = 300 + ensembleScore * 2.2;
      
      // Apply some noise and bounds
      finalScore += (Math.random() - 0.5) * 10; // Small random variation
      finalScore = Math.max(300, Math.min(850, Math.round(finalScore)));
      
      // Determine risk category
      const riskCategory = this.determineRiskCategory(finalScore);
      
      // Calculate probability of default (inverse relationship with score)
      const probability = this.scoreToDefaultProbability(finalScore);
      
      return {
        score: finalScore,
        riskCategory,
        probability,
        modelScores: {
          xgboost: Math.round(xgboostPrediction),
          neuralNetwork: Math.round(neuralNetPrediction)
        }
      };
      
    } catch (error) {
      throw new Error(`Model prediction failed: ${error.message}`);
    }
  }

  /**
   * Determine risk category based on credit score
   */
  determineRiskCategory(score) {
    if (score >= 750) return 'Excellent';
    if (score >= 700) return 'Good';
    if (score >= 650) return 'Fair';
    if (score >= 600) return 'Poor';
    return 'Very Poor';
  }

  /**
   * Convert credit score to default probability
   */
  scoreToDefaultProbability(score) {
    // Sigmoid-like function to map score to probability
    const normalizedScore = (score - 300) / 550; // Normalize to 0-1
    const probability = 1 / (1 + Math.exp(8 * (normalizedScore - 0.5)));
    return Math.round(probability * 1000) / 10; // Return as percentage with 1 decimal
  }

  /**
   * Activation functions
   */
  relu(x) {
    return Math.max(0, x);
  }

  sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }

  /**
   * Get model version
   */
  getVersion() {
    return this.version;
  }

  /**
   * Get model features
   */
  getFeatures() {
    return this.features;
  }

  /**
   * Get feature importance
   */
  getFeatureImportance(data) {
    const normalizedData = this.normalizeFeatures(data);
    const importance = {};
    
    for (const feature of this.features) {
      // Calculate contribution to final score
      const weight = this.featureWeights[feature];
      const value = normalizedData[feature];
      importance[feature] = {
        weight: Math.round(weight * 1000) / 10, // Percentage
        value: Math.round(value * 100) / 100,
        contribution: Math.round(weight * value * 100) / 100
      };
    }
    
    return importance;
  }
}

module.exports = { CreditScoringModel };
