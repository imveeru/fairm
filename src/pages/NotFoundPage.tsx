import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sprout } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <Sprout className="h-12 w-12 text-primary mb-4" />
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>
      <Button asChild>
        <Link to="/">Return Home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;