import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {  Send } from 'lucide-react';
import { features } from '@/config/features';
import FairmLogo  from '../static/FAIrm Logo.png'

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
      <div className="relative flex flex-col justify-center min-h-screen hero-gradient">
      <div className="absolute inset-0 hero-gradient"></div>
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{backgroundImage: "url('https://diagram.imgix.net/magician/overlay-min.png?s=e463f843ba0864b6fcccc6c2607133dd')", opacity: "50%"}}
      ></div>
        <div className="container relative z-10 px-4 mx-auto text-center">
          <div className="flex flex-col items-center justify-center mb-6">
            {/* <Sprout className="w-12 h-12 text-white" /> */}
            <img src={FairmLogo} alt="FAIrm Logo" className="w-24 h-24" />
            <h1 className="ml-2 text-2xl font-thin text-white">FAIrm</h1>
          </div>
          <h2 className="mb-6 text-5xl font-bold text-white">
            Cultivate Success<br/>with AI-Powered Farming
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-white/90">
            Transform your farming journey with intelligent insights, personalized recommendations,
            and data-driven decision making.
          </p>
          <button 
            onClick={handleGetStarted}
            className="px-8 py-3 text-lg font-semibold transition-all duration-200 bg-white rounded-lg text-primary hover:shadow-xl"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="container px-4 mx-auto">
          <h3 className="mb-16 text-3xl font-bold text-center">Why FAIrm?</h3>
          <div className="grid gap-12 md:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-green-50">
                  {feature.icon}
                </div>
                <h4 className="mb-4 text-xl font-semibold">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-xl mx-auto mb-6 text-center">
            <h4 className="mb-2 text-2xl font-semibold">
              Stay Updated with FAIrm
            </h4>
            <p className="mb-4 text-gray-600">
              Get the latest updates on farming technology and market insights
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <Button type="submit">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
          <div className="text-sm text-center text-gray-600">
            © {new Date().getFullYear()} FAIrm. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;