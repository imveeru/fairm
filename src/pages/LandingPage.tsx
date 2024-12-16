import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sprout, Send } from 'lucide-react';
import { features } from '@/config/features';

const LandingPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleGetStarted = () => {
    navigate('/auth?type=login');
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col justify-center hero-gradient relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <Sprout className="h-12 w-12 text-white" />
            <h1 className="text-4xl font-bold ml-2 text-white">FAIrm</h1>
          </div>
          <h2 className="text-5xl font-bold text-white mb-6">
            Cultivate Success with AI-Powered Farming
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Transform your farming journey with intelligent insights, personalized recommendations,
            and data-driven decision making.
          </p>
          <button 
            onClick={handleGetStarted}
            className="bg-white text-primary px-8 py-3 rounded-lg text-lg font-medium hover:shadow-lg transition-all duration-200"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-16">Why Choose FAIrm?</h3>
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold mb-4">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center mb-6">
            <h4 className="text-2xl font-semibold mb-2">
              Stay Updated with FAIrm
            </h4>
            <p className="text-gray-600 mb-4">
              Get the latest updates on farming technology and market insights
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <Button type="submit">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
          <div className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} FAIrm. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;