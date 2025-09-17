import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Zap, BarChart3, CreditCard } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home', icon: Zap },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/scoring', label: 'Credit Scoring', icon: CreditCard },
  ];

  return (
    <nav className="bg-black sticky top-0 z-50">
      <div className="w-full px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
              <Link to="/" className="flex items-center space-x-4">
                <img src="/logo-cat.png" alt="cflow" className="w-12 h-12 rounded-full" />
                <span className="text-3xl font-bold tracking-tight text-white">
                  <span className="text-bright-pink">c</span>flow
                </span>
              </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-5 py-3 rounded-full text-base font-medium transition-all duration-200 ${
                        isActive(path)
                          ? 'bg-bright-pink/20 text-bright-pink'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}
            <button className="btn-gumroad px-7 py-3 rounded-xl text-base">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-gray-800"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(path)
                      ? 'bg-bright-pink/20 text-bright-pink'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              ))}
              <button className="btn-gumroad px-6 py-2 rounded-lg mt-4">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
