import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Phone,
  Wifi,
  MapPin,
  TrendingUp,
  CheckCircle,
  Clock,
  BarChart3,
  Brain,
  Shield,
} from 'lucide-react';
import toast from 'react-hot-toast';

const CreditScoring = () => {
  /**
   * @typedef {Object} ScoringForm
   * @property {string|number} age
   * @property {string|number} income
   * @property {string|number} employment_years
   * @property {string|number} phone_payment_consistency
   * @property {string|number} electricity_payment_history
   * @property {string|number} internet_payment_consistency
   * @property {string|number} address_stability_years
   */
  /** @type {[ScoringForm, Function]} */
  const [formData, setFormData] = useState({
    age: '',
    income: '',
    employment_years: '',
    phone_payment_consistency: '',
    electricity_payment_history: '',
    internet_payment_consistency: '',
    address_stability_years: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [creditScore, setCreditScore] = useState(null);
  const [riskCategory, setRiskCategory] = useState(null);
  const [explanation, setExplanation] = useState(null);

  /** @param {React.ChangeEvent<HTMLInputElement>} e */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateCreditScore = async () => {
    setIsLoading(true);

    try {
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 1200));

      // Mock scoring algorithm
      const score = mockCreditScoring(formData);
      setCreditScore(score.score);
      setRiskCategory(score.category);
      setExplanation(score.explanation);

      toast.success('Credit score calculated successfully!');
    } catch (error) {
      toast.error('Error calculating credit score');
    } finally {
      setIsLoading(false);
    }
  };

  /** @param {ScoringForm} data */
  const mockCreditScoring = (data) => {
    // Simple scoring algorithm for demo
    let score = 300; // Base score

    // Age factor (older = more stable)
    if (Number(data.age) >= 25) score += 50;
    if (Number(data.age) >= 35) score += 30;

    // Income factor
    const income = parseInt(String(data.income)) || 0;
    score += Math.min(income / 1000, 200);

    // Employment stability
    const empYears = parseInt(String(data.employment_years)) || 0;
    score += empYears * 20;

    // Payment consistency factors (compact essential signals)
    const phoneConsistency = parseInt(String(data.phone_payment_consistency)) || 0;
    const electricityHistory = parseInt(String(data.electricity_payment_history)) || 0;
    const internetConsistency = parseInt(String(data.internet_payment_consistency)) || 0;
    score += (phoneConsistency + electricityHistory + internetConsistency) * 18;

    // Stability factor
    const addressStability = parseInt(String(data.address_stability_years)) || 0;
    score += addressStability * 20;

    // Cap the score
    score = Math.min(Math.max(score, 300), 850);

    // Determine category
    let category, explanation;
    if (score >= 750) {
      category = 'Excellent';
      explanation = 'Very low risk: strong on-time payments and long, stable residence.';
    } else if (score >= 700) {
      category = 'Good';
      explanation = 'Low risk: consistent payments with solid income and stability.';
    } else if (score >= 650) {
      category = 'Fair';
      explanation = 'Moderate risk: some positive signals, improve consistency and stability.';
    } else if (score >= 600) {
      category = 'Poor';
      explanation = 'Higher risk: build a track record of on-time payments.';
    } else {
      category = 'Very Poor';
      explanation = 'High risk: limited or inconsistent signals across key inputs.';
    }

    return { score: Math.round(score), category, explanation };
  };

  const getRiskColor = (category) => {
    switch (category) {
      case 'Excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'Good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Fair': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Poor': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Very Poor': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formSections = [
    {
      title: 'Personal Information',
      icon: User,
      fields: [
        { name: 'age', label: 'Age', type: 'number', placeholder: '25' },
        { name: 'income', label: 'Monthly Income ($)', type: 'number', placeholder: '5000' },
        { name: 'employment_years', label: 'Years in Current Job', type: 'number', placeholder: '3' },
      ]
    },
    {
      title: 'Payment Consistency',
      icon: Phone,
      fields: [
        { name: 'phone_payment_consistency', label: 'Phone Bill Consistency (1-10)', type: 'number', placeholder: '8' },
      ]
    },
    {
      title: 'Utility Payments',
      icon: Wifi,
      fields: [
        { name: 'electricity_payment_history', label: 'Electricity Payment Score (1-10)', type: 'number', placeholder: '9' },
        { name: 'internet_payment_consistency', label: 'Internet Payment Score (1-10)', type: 'number', placeholder: '8' },
      ]
    },
    {
      title: 'Stability Indicators',
      icon: MapPin,
      fields: [
        { name: 'address_stability_years', label: 'Years at Current Address', type: 'number', placeholder: '2' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gray-25 pt-8 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            Alternative Credit Scoring
          </motion.h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enter only the minimum data required to evaluate repayment reliability. We focus on
            payment consistency and stability signals — not invasive personal data.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2 flex items-center">
                <BarChart3 className="h-6 w-6 mr-2 text-primary-600" />
                Evaluation Inputs
              </h2>
              <p className="text-sm text-gray-600 mb-6">Left: enter values where asked. Right: we explain why each input matters — to gauge on-time payments, income stability, and length of residence.</p>

              <div className="space-y-8">
                {formSections.map((section, sectionIndex) => (
                  <motion.div
                    key={sectionIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: sectionIndex * 0.05 }}
                    className="border-b border-gray-100 pb-6 last:border-b-0"
                  >
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <section.icon className="h-5 w-5 mr-2 text-primary-600" />
                      {section.title}
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {section.fields.map((field) => (
                        <div key={field.name}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label}
                          </label>
                          <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleInputChange}
                            placeholder={field.placeholder}
                            className="form-input"
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
              <button
                onClick={calculateCreditScore}
                disabled={isLoading}
                className="w-full bg-bright-pink hover:bg-pastel-pink text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:-translate-y-1 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Clock className="h-5 w-5 mr-2 animate-spin" />
                    Analyzing Data...
                  </>
                ) : (
                  <>
                    <Brain className="h-5 w-5 mr-2" />
                    Calculate Credit Score
                  </>
                )}
              </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Score Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary-600" />
                Credit Score
              </h3>

              {creditScore ? (
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    {creditScore}
                  </div>
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(riskCategory)}`}>
                    {riskCategory}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">
                    Fill out the form and click "Calculate" to see your score
                  </p>
                </div>
              )}
            </motion.div>

            {/* Explanation */}
            {explanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary-600" />
                  Why this score
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {explanation}
                </p>
              </motion.div>
            )}

            {/* Data Sources */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Inputs considered
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Phone, label: 'Phone bill consistency' },
                  { icon: Wifi, label: 'Electricity & internet payments' },
                  { icon: MapPin, label: 'Address stability' },
                ].map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <source.icon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700">{source.label}</span>
                    </div>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900">Privacy & data minimization</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    We only request the fields shown and process them locally for this demo.
                    No personal information is stored.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditScoring;
