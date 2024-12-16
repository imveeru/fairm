import React from 'react';
import { Scheduler } from 'react-big-schedule';
import 'react-big-schedule/dist/css/style.css';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const resources = [
  { id: 'field1', name: 'Field 1' },
  { id: 'field2', name: 'Field 2' },
  { id: 'field3', name: 'Field 3' },
];

const events = [];

export const TaskScheduler = () => {
  const hasData = events.length > 0;

  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Sparkles className="h-12 w-12 text-primary mb-4" />
        <h3 className="text-lg font-semibold mb-2">
          Want to optimize your daily schedule with AI assistance?
        </h3>
        <p className="text-gray-600 mb-6">
          Let our AI assistant analyze your farm data and create an efficient task schedule
        </p>
        <Button>
          <Sparkles className="h-4 w-4 mr-2" />
          Generate Smart Schedule
        </Button>
      </div>
    );
  }

  return (
    <div className="task-scheduler">
      <Scheduler
        schedulerData={{
          resources,
          events,
          viewType: 'week',
        }}
        prevClick={() => {}}
        nextClick={() => {}}
        onSelectDate={() => {}}
        onViewChange={() => {}}
        eventItemClick={() => {}}
      />
    </div>
  );
};