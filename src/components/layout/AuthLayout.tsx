import React from 'react';
import { Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <Sprout className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
            <span className="text-xl font-semibold">FAIrm</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-xl sm:px-10 border border-gray-100">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} FAIrm. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};