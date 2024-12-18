import React from 'react';
// import { Scheduler } from 'react-big-schedule';
import 'react-big-schedule/dist/css/style.css';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

// const resources = [
//   { id: 'field1', name: 'Field 1' },
//   { id: 'field2', name: 'Field 2' },
//   { id: 'field3', name: 'Field 3' },
// ];

const events = [];

export const TaskScheduler = ({}) => {
  const hasData = events.length > 0;

  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Sparkles className="w-12 h-12 mb-4 text-primary" />
        <h3 className="mb-2 text-lg font-semibold">
          Want to optimize your daily schedule with AI assistance?
        </h3>
        <p className="mb-6 text-gray-600">
          Let our AI assistant analyze your farm data and create an efficient task schedule
        </p>
        {/* <Button>
          <Sparkles className="w-4 h-4 mr-2" />
          Generate Smart Schedule
        </Button> */}
      </div>
    );
  }

  return (
    <div className="task-scheduler">
      {/* <Scheduler
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
      /> */}
    </div>
  );
};