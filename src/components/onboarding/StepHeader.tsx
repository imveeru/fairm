import React from 'react';

interface StepHeaderProps {
  title: string;
  description: string;
}

export const StepHeader: React.FC<StepHeaderProps> = ({ title, description }) => (
  <div>
    <h3 className="text-lg font-medium">{title}</h3>
    <p className="text-sm text-gray-500">{description}</p>
  </div>
);