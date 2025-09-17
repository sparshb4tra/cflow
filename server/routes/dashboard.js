const express = require('express');
const router = express.Router();

// GET /api/dashboard/overview
router.get('/overview', (req, res) => {
  try {
    const overview = {
      kpis: [
        {
          label: 'Total Applications',
          value: '12,347',
          change: '+23.5%',
          trend: 'up',
          previousPeriod: '10,023'
        },
        {
          label: 'Approval Rate',
          value: '68.2%',
          change: '+12.3%',
          trend: 'up',
          previousPeriod: '60.7%'
        },
        {
          label: 'Average Score',
          value: '687',
          change: '+4.2%',
          trend: 'up',
          previousPeriod: '659'
        },
        {
          label: 'Default Rate',
          value: '2.1%',
          change: '-0.8%',
          trend: 'down',
          previousPeriod: '2.9%'
        }
      ],
      timestamp: new Date().toISOString()
    };

    res.json({
      success: true,
      data: overview
    });
  } catch (error) {
    console.error('Dashboard overview error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to retrieve dashboard overview'
      }
    });
  }
});

// GET /api/dashboard/analytics
router.get('/analytics', (req, res) => {
  try {
    const { timeRange = '30d' } = req.query;
    
    const analytics = {
      monthlyApplications: [
        { month: 'Jan', applications: 800, approvals: 520, defaults: 12 },
        { month: 'Feb', applications: 950, approvals: 665, defaults: 15 },
        { month: 'Mar', applications: 1200, approvals: 840, defaults: 18 },
        { month: 'Apr', applications: 1100, approvals: 770, defaults: 14 },
        { month: 'May', applications: 1350, approvals: 945, defaults: 16 },
        { month: 'Jun', applications: 1500, approvals: 1050, defaults: 19 },
      ],
      scoreDistribution: [
        { range: '300-499', count: 1240, percentage: 11.2 },
        { range: '500-599', count: 2100, percentage: 19.1 },
        { range: '600-699', count: 3200, percentage: 29.1 },
        { range: '700-749', count: 2800, percentage: 25.4 },
        { range: '750-850', count: 1960, percentage: 17.8 },
      ],
      dataSourcePerformance: [
        { source: 'Mobile Data', accuracy: 82, usage: 95, availability: 98 },
        { source: 'Utility Payments', accuracy: 78, usage: 88, availability: 94 },
        { source: 'E-commerce', accuracy: 75, usage: 72, availability: 87 },
        { source: 'Social Media', accuracy: 71, usage: 65, availability: 82 },
        { source: 'Geolocation', accuracy: 85, usage: 90, availability: 96 },
      ],
      riskCategories: [
        { name: 'Excellent', value: 1960, color: '#22c55e' },
        { name: 'Good', value: 2800, color: '#3b82f6' },
        { name: 'Fair', value: 3200, color: '#eab308' },
        { name: 'Poor', value: 2100, color: '#f97316' },
        { name: 'Very Poor', value: 1240, color: '#ef4444' },
      ],
      timeRange,
      timestamp: new Date().toISOString()
    };

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Dashboard analytics error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to retrieve dashboard analytics'
      }
    });
  }
});

// GET /api/dashboard/realtime
router.get('/realtime', (req, res) => {
  try {
    const realtime = {
      currentMetrics: {
        applicationsToday: 247,
        approvalsToday: 168,
        avgScoreToday: 692,
        processingTimeMs: 25
      },
      hourlyMetrics: generateHourlyMetrics(),
      activeConnections: 1247,
      systemHealth: {
        apiResponseTime: '23ms',
        modelLatency: '12ms',
        dataSourceStatus: {
          mobile: 'healthy',
          utilities: 'healthy',
          ecommerce: 'warning',
          social: 'healthy',
          geolocation: 'healthy'
        }
      },
      timestamp: new Date().toISOString()
    };

    res.json({
      success: true,
      data: realtime
    });
  } catch (error) {
    console.error('Realtime metrics error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to retrieve realtime metrics'
      }
    });
  }
});

// GET /api/dashboard/performance
router.get('/performance', (req, res) => {
  try {
    const performance = {
      modelMetrics: {
        accuracy: 0.892,
        precision: 0.876,
        recall: 0.854,
        f1Score: 0.865,
        auc: 0.923
      },
      biasMetrics: {
        demographicParity: 0.02,
        equalizedOdds: 0.03,
        equalOpportunity: 0.025,
        calibration: 0.98,
        overallFairnessScore: 0.95
      },
      dataQuality: {
        completeness: 0.94,
        accuracy: 0.97,
        consistency: 0.92,
        timeliness: 0.89
      },
      featureImportance: [
        { feature: 'Income', importance: 0.15, category: 'Financial' },
        { feature: 'Employment Years', importance: 0.12, category: 'Stability' },
        { feature: 'Electricity Payment History', importance: 0.10, category: 'Alternative Data' },
        { feature: 'Budgeting Behavior', importance: 0.10, category: 'Behavioral' },
        { feature: 'Phone Payment Consistency', importance: 0.09, category: 'Alternative Data' },
        { feature: 'Internet Payment Consistency', importance: 0.08, category: 'Alternative Data' },
        { feature: 'Age', importance: 0.08, category: 'Demographic' },
        { feature: 'Address Stability', importance: 0.08, category: 'Stability' },
        { feature: 'Return Rate', importance: 0.07, category: 'Behavioral' },
        { feature: 'Network Stability', importance: 0.06, category: 'Alternative Data' }
      ],
      timestamp: new Date().toISOString()
    };

    res.json({
      success: true,
      data: performance
    });
  } catch (error) {
    console.error('Performance metrics error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to retrieve performance metrics'
      }
    });
  }
});

// GET /api/dashboard/geographic
router.get('/geographic', (req, res) => {
  try {
    const geographic = {
      countryMetrics: [
        { country: 'United States', applications: 4200, avgScore: 695, approvalRate: 0.72 },
        { country: 'India', applications: 2800, avgScore: 678, approvalRate: 0.68 },
        { country: 'Brazil', applications: 1900, avgScore: 663, approvalRate: 0.65 },
        { country: 'Nigeria', applications: 1500, avgScore: 641, approvalRate: 0.59 },
        { country: 'Mexico', applications: 1200, avgScore: 658, approvalRate: 0.63 },
        { country: 'Philippines', applications: 950, avgScore: 669, approvalRate: 0.67 }
      ],
      regionalTrends: [
        { region: 'North America', trend: 'increasing', growthRate: 0.23 },
        { region: 'South America', trend: 'stable', growthRate: 0.08 },
        { region: 'Asia', trend: 'increasing', growthRate: 0.31 },
        { region: 'Africa', trend: 'increasing', growthRate: 0.45 },
        { region: 'Europe', trend: 'stable', growthRate: 0.12 }
      ],
      dataSourceAvailability: {
        mobile: { global: 0.95, developing: 0.89, developed: 0.98 },
        utilities: { global: 0.82, developing: 0.76, developed: 0.94 },
        ecommerce: { global: 0.71, developing: 0.58, developed: 0.89 },
        social: { global: 0.68, developing: 0.62, developed: 0.78 },
        geolocation: { global: 0.91, developing: 0.87, developed: 0.96 }
      },
      timestamp: new Date().toISOString()
    };

    res.json({
      success: true,
      data: geographic
    });
  } catch (error) {
    console.error('Geographic metrics error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to retrieve geographic metrics'
      }
    });
  }
});

// Helper function to generate hourly metrics
function generateHourlyMetrics() {
  const metrics = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const hour = new Date(now.getTime() - (i * 60 * 60 * 1000));
    metrics.push({
      hour: hour.getHours(),
      timestamp: hour.toISOString(),
      applications: Math.floor(Math.random() * 50) + 10,
      avgScore: Math.floor(Math.random() * 100) + 600,
      approvals: Math.floor(Math.random() * 30) + 5,
      processingTime: Math.floor(Math.random() * 20) + 15
    });
  }
  
  return metrics;
}

module.exports = router;
