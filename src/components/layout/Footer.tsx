import React from 'react';

export const Footer = () => (
  <footer className="bg-gray-50 border-t border-gray-200 py-4">
    <div className="container mx-auto px-4 text-center text-sm text-gray-600">
      © {new Date().getFullYear()} FAIrm. All rights reserved.
    </div>
  </footer>
);