import React from 'react';
import { Button } from '@/components/ui/button';

interface StepNavigationProps {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  isNextDisabled: boolean;
  showBack?: boolean;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  onBack,
  onNext,
  nextLabel = 'Next',
  isNextDisabled,
  showBack = true,
}) => (
  <div className="flex justify-between">
    {showBack && onBack && (
      <Button onClick={onBack} variant="outline">
        Back
      </Button>
    )}
    <Button
      onClick={onNext}
      disabled={isNextDisabled}
      className={!showBack ? 'w-full' : ''}
    >
      {nextLabel}
    </Button>
  </div>
);