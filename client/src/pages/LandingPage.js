import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield,
  TrendingUp,
  Globe,
  ArrowRight,
  Star,
  Brain,
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Scoring',
      description: 'Advanced machine learning algorithms analyze alternative data sources for accurate credit assessment.',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'GDPR compliant with end-to-end encryption and transparent data usage policies.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving underbanked populations across emerging markets and developed economies.',
    },
    {
      icon: TrendingUp,
      title: 'Better Outcomes',
      description: '40% improvement in approval rates while maintaining lower default rates.',
    },
  ];

  const stats = [
    { number: '1.7B+', label: 'Underbanked Population' },
    { number: '85%', label: 'Accuracy Rate' },
    { number: '40%', label: 'Approval Improvement' },
    { number: '25ms', label: 'Response Time' },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CEO, FinNext',
      content: 'cflow helped us approve 45% more customers while reducing defaults by 20%. Game-changing technology.',
      rating: 5,
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Risk, LendFlow',
      content: 'The alternative data insights are incredible. We can now serve customers we never could before.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-25">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-25 pt-16 pb-24">
        <div className="pattern-dots"></div>
        {/* Subtle animated gradient accents */}
        <div className="hidden lg:block">
          <span className="accent-blob accent-blob--pink" style={{ width: '220px', height: '220px', left: '-60px', top: '90px' }} />
          <span className="accent-blob accent-blob--blue" style={{ width: '180px', height: '180px', right: '10px', top: '60px', animationDelay: '0.4s' }} />
          <span className="accent-blob accent-blob--aqua" style={{ width: '160px', height: '160px', left: '36%', bottom: '80px', animationDelay: '0.8s' }} />
          <span className="accent-blob accent-blob--pink" style={{ width: '150px', height: '150px', right: '22%', bottom: '40px', animationDelay: '1.2s' }} />
          <span className="accent-blob accent-blob--blue" style={{ width: '120px', height: '120px', left: '32px', top: '24px', animationDelay: '1.6s' }} />
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[44px] sm:text-[64px] md:text-[88px] font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight tracking-tight"
          >
              Go from <span className="font-bold">0</span> to <span className="text-bright-pink font-bold">850</span>
          </motion.h1>
          
          {/* Description is inside the action card below */}

          {/* Accent card enclosing Start and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group mt-5 bg-white rounded-3xl border border-gray-200 p-5 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-bright-pink/10 blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-sea-green/10 blur-3xl"></div>
            </div>
            <div className="relative flex flex-col items-center gap-5 sm:gap-6">
              <p className="text-gray-700 text-base sm:text-lg text-center max-w-3xl leading-relaxed sm:leading-8 tracking-tight">
                Anyone can build their credit score with alternative data. Just start with what you have,
                see what works, and get approved. It's that easy.
              </p>
              <div className="flex w-full justify-center gap-3 sm:gap-4 md:gap-5">
                <Link 
                  to="/scoring" 
                  className="btn-primary interactive-accent ring-1 ring-bright-pink/30 hover:ring-bright-pink/60 text-base sm:text-lg px-6 sm:px-7 py-3.5 inline-flex items-center justify-center min-w-[160px]"
                >
                  Start scoring
                </Link>
                <div className="flex items-center bg-white rounded-xl border border-gray-200 overflow-hidden flex-1 max-w-md h-12 sm:h-[52px]">
                  <input
                    type="text"
                    placeholder="Search credit scoring"
                    className="px-4 text-gray-700 placeholder-gray-400 bg-white focus:outline-none w-full h-full"
                  />
                  <button className="px-3 text-gray-400 hover:text-gray-600 flex-shrink-0 h-full">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* GitHub badge is in footer */}
        </div>
      </section>

      {/* Keyword carousel */}
      <section className="py-12 bg-gray-25 overflow-hidden">
        <div className="relative">
          {/* Row 1 */}
          <div className="flex animate-scroll hover:pause-animation mb-4">
            {[
              { name: 'alternative data', icon: '📊', color: 'bg-teal-green' },
              { name: 'mobile payments', icon: '📱', color: 'bg-light-yellow' },
              { name: 'utility bills', icon: '⚡', color: 'bg-sky-blue' },
              { name: 'e-commerce', icon: '🛒', color: 'bg-orange-500' },
              { name: 'social credit', icon: '👥', color: 'bg-bright-pink' },
              { name: 'underbanked', icon: '🏦', color: 'bg-bright-red' },
              { name: 'ai scoring', icon: '🤖', color: 'bg-sea-green' },
              { name: 'fintech', icon: '💳', color: 'bg-deep-yellow' },
              { name: 'risk assessment', icon: '⚖️', color: 'bg-purple-600' },
              { name: 'credit invisible', icon: '👻', color: 'bg-teal-green' },
              { name: 'machine learning', icon: '🔬', color: 'bg-sky-blue' },
              { name: 'blockchain', icon: '⛓️', color: 'bg-bright-pink' },
            ].concat([
              { name: 'alternative data', icon: '📊', color: 'bg-teal-green' },
              { name: 'mobile payments', icon: '📱', color: 'bg-light-yellow' },
              { name: 'utility bills', icon: '⚡', color: 'bg-sky-blue' },
              { name: 'e-commerce', icon: '🛒', color: 'bg-orange-500' },
              { name: 'social credit', icon: '👥', color: 'bg-bright-pink' },
              { name: 'underbanked', icon: '🏦', color: 'bg-bright-red' },
              { name: 'ai scoring', icon: '🤖', color: 'bg-sea-green' },
              { name: 'fintech', icon: '💳', color: 'bg-deep-yellow' },
              { name: 'risk assessment', icon: '⚖️', color: 'bg-purple-600' },
              { name: 'credit invisible', icon: '👻', color: 'bg-teal-green' },
              { name: 'machine learning', icon: '🔬', color: 'bg-sky-blue' },
              { name: 'blockchain', icon: '⛓️', color: 'bg-bright-pink' },
            ]).map((item, index) => (
              <div key={`row1-${index}`} className="flex items-center mr-4 group cursor-pointer">
                <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200`}>
                  <span className="text-xl">{item.icon}</span>
                </div>
                <div className="bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm group-hover:shadow-md transition-all duration-200 whitespace-nowrap">
                  <span className="ui-text text-gray-700">{item.name}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex animate-scroll-reverse hover:pause-animation mb-4">
            {[
              { name: 'credit scoring', icon: '📈', color: 'bg-bright-red' },
              { name: 'digital identity', icon: '🆔', color: 'bg-sea-green' },
              { name: 'payment history', icon: '📋', color: 'bg-deep-yellow' },
              { name: 'behavioral data', icon: '🧠', color: 'bg-purple-600' },
              { name: 'financial inclusion', icon: '🌍', color: 'bg-teal-green' },
              { name: 'microfinance', icon: '💰', color: 'bg-bright-pink' },
              { name: 'open banking', icon: '🏛️', color: 'bg-light-yellow' },
              { name: 'fraud detection', icon: '🛡️', color: 'bg-orange-500' },
              { name: 'kyc verification', icon: '✅', color: 'bg-sky-blue' },
              { name: 'data privacy', icon: '🔒', color: 'bg-bright-red' },
              { name: 'api integration', icon: '🔌', color: 'bg-sea-green' },
              { name: 'real-time scoring', icon: '⚡', color: 'bg-deep-yellow' },
            ].concat([
              { name: 'credit scoring', icon: '📈', color: 'bg-bright-red' },
              { name: 'digital identity', icon: '🆔', color: 'bg-sea-green' },
              { name: 'payment history', icon: '📋', color: 'bg-deep-yellow' },
              { name: 'behavioral data', icon: '🧠', color: 'bg-purple-600' },
              { name: 'financial inclusion', icon: '🌍', color: 'bg-teal-green' },
              { name: 'microfinance', icon: '💰', color: 'bg-bright-pink' },
              { name: 'open banking', icon: '🏛️', color: 'bg-light-yellow' },
              { name: 'fraud detection', icon: '🛡️', color: 'bg-orange-500' },
              { name: 'kyc verification', icon: '✅', color: 'bg-sky-blue' },
              { name: 'data privacy', icon: '🔒', color: 'bg-bright-red' },
              { name: 'api integration', icon: '🔌', color: 'bg-sea-green' },
              { name: 'real-time scoring', icon: '⚡', color: 'bg-deep-yellow' },
            ]).map((item, index) => (
              <div key={`row2-${index}`} className="flex items-center mr-4 group cursor-pointer">
                <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200`}>
                  <span className="text-xl">{item.icon}</span>
                </div>
                <div className="bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm group-hover:shadow-md transition-all duration-200 whitespace-nowrap">
                  <span className="ui-text text-gray-700">{item.name}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Row 3 */}
          <div className="flex animate-scroll hover:pause-animation">
            {[
              { name: 'predictive analytics', icon: '🔮', color: 'bg-purple-600' },
              { name: 'credit bureau', icon: '📊', color: 'bg-teal-green' },
              { name: 'loan approval', icon: '✓', color: 'bg-sea-green' },
              { name: 'risk management', icon: '⚖️', color: 'bg-bright-red' },
              { name: 'financial wellness', icon: '💚', color: 'bg-deep-yellow' },
              { name: 'credit repair', icon: '🔧', color: 'bg-bright-pink' },
              { name: 'debt consolidation', icon: '📦', color: 'bg-light-yellow' },
              { name: 'peer-to-peer', icon: '🤝', color: 'bg-orange-500' },
              { name: 'regulatory compliance', icon: '📜', color: 'bg-sky-blue' },
              { name: 'data analytics', icon: '📈', color: 'bg-teal-green' },
              { name: 'customer onboarding', icon: '👋', color: 'bg-bright-pink' },
              { name: 'credit monitoring', icon: '👁️', color: 'bg-sea-green' },
            ].concat([
              { name: 'predictive analytics', icon: '🔮', color: 'bg-purple-600' },
              { name: 'credit bureau', icon: '📊', color: 'bg-teal-green' },
              { name: 'loan approval', icon: '✓', color: 'bg-sea-green' },
              { name: 'risk management', icon: '⚖️', color: 'bg-bright-red' },
              { name: 'financial wellness', icon: '💚', color: 'bg-deep-yellow' },
              { name: 'credit repair', icon: '🔧', color: 'bg-bright-pink' },
              { name: 'debt consolidation', icon: '📦', color: 'bg-light-yellow' },
              { name: 'peer-to-peer', icon: '🤝', color: 'bg-orange-500' },
              { name: 'regulatory compliance', icon: '📜', color: 'bg-sky-blue' },
              { name: 'data analytics', icon: '📈', color: 'bg-teal-green' },
              { name: 'customer onboarding', icon: '👋', color: 'bg-bright-pink' },
              { name: 'credit monitoring', icon: '👁️', color: 'bg-sea-green' },
            ]).map((item, index) => (
              <div key={`row3-${index}`} className="flex items-center mr-4 group cursor-pointer">
                <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200`}>
                  <span className="text-xl">{item.icon}</span>
                </div>
                <div className="bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm group-hover:shadow-md transition-all duration-200 whitespace-nowrap">
                  <span className="ui-text text-gray-700">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <div className="text-4xl sm:text-6xl md:text-8xl font-black text-gray-900 mb-4 font-numeric">
              $2,007,677
            </div>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
              The amount of credit extended by<br />
              cflow digital lenders last week.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12 lg:mb-20">
            {/* Score anything */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Score anything</h3>
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gumroad-400 to-gumroad-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
              </div>
              
              {/* Mock interface */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="bg-white rounded p-3">
                  <div className="text-sm font-medium text-gray-900 mb-2">Alternative Credit Scoring</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Mobile Payment History</span>
                      <span className="text-xs font-medium text-green-600">✓ Connected</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Utility Bills</span>
                      <span className="text-xs font-medium text-green-600">✓ Verified</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gumroad-500 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                Credit scores. Income verification. Risk assessment. 
                Whatever! cflow was created to help you 
                experiment with all kinds of alternative data and 
                formats.
              </p>
            </motion.div>

            {/* Make your own road */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Make your own road</h3>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Whether you need more balance, flexibility, or just a different approach, we 
                make it easy to chart a new path in credit scoring.
              </p>
              
              {/* Stats mockup */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">9</div>
                    <div className="text-xs text-gray-500">• Sales</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">481</div>
                    <div className="text-xs text-gumroad-500">• Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">$201,083</div>
                  </div>
                </div>
                <div className="h-16 bg-gradient-to-r from-gumroad-100 to-gumroad-50 rounded-lg flex items-end p-2">
                  <div className="w-full flex items-end space-x-1">
                    {[...Array(12)].map((_, i) => (
                      <div 
                        key={i} 
                        className="bg-gumroad-400 rounded-sm flex-1" 
                        style={{ height: `${Math.random() * 40 + 10}px` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Fintech Leaders
            </h2>
            <p className="text-xl text-gray-600">
              See how companies are transforming their lending with cflow
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-25">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-white rounded-3xl border border-gray-200 p-10 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-bright-pink/10 blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-sea-green/10 blur-3xl"></div>
            </div>
            <div className="md:flex md:items-center md:justify-between relative">
              <div className="mb-8 md:mb-0">
                <h2 className="heading-lg text-gray-900 mb-4">Build your credit</h2>
                <p className="body-text text-gray-600 max-w-xl">
                  Use alternative data to grow your score. See instant insights and clear next steps.
                </p>
              </div>
              <Link
                to="/scoring"
                className="relative inline-flex items-center px-8 py-4 rounded-xl bg-black text-white font-semibold interactive-accent ring-1 ring-bright-pink/30 hover:ring-bright-pink/60"
              >
                <span className="mr-3">Calculate My Score</span>
                <span className="w-2 h-2 rounded-full bg-deep-yellow animate-pulse"></span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">
              Subscribe to get credit tips and<br />
              alternative data insights.
            </h3>
            <div className="flex max-w-md">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 bg-transparent border border-gray-600 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-gumroad-500"
              />
                <button className="bg-bright-pink hover:bg-pastel-pink px-6 py-3 rounded-r-lg transition-colors">
                  <ArrowRight className="h-5 w-5" />
                </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-bright-pink rounded-full"></div>
                <span className="font-semibold">
                  <span className="text-bright-pink">c</span>flow
                </span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Discover</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/scoring" className="hover:text-white transition-colors">Credit Scoring</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Help</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400 text-sm text-center">© cflow, Inc.</p>
            <p className="mt-3 text-center">
              <a
                href="https://github.com/sparshb4tra"
                target="_blank"
                rel="noreferrer"
                className="github-badge ring-1 ring-bright-pink/30 hover:ring-bright-pink/60"
                aria-label="GitHub profile @sparshb4tra"
              >
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.11 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.91.08 2.11.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                </svg>
                <span>@sparshb4tra</span>
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
