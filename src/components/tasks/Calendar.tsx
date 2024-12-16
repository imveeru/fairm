import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  due_date: string;
  status: string;
  category: string;
}

interface CalendarProps {
  tasks: Task[];
}

export const Calendar: React.FC<CalendarProps> = ({ tasks }) => {
  const daysInMonth = 31;
  const today = new Date().getDate();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">March 2024</h3>
        <CalendarIcon className="h-5 w-5 text-gray-500" />
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 p-2"
          >
            {day}
          </div>
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const isToday = day === today;
          const hasTask = tasks.some(
            (task) => new Date(task.due_date).getDate() === day
          );

          return (
            <div
              key={day}
              className={`
                aspect-square p-2 border border-gray-100 rounded-md
                ${isToday ? 'bg-primary/10 border-primary' : ''}
                ${hasTask ? 'font-semibold' : ''}
              `}
            >
              <div className="text-sm">{day}</div>
              {hasTask && (
                <div className="mt-1">
                  <div className="h-1 w-1 bg-primary rounded-full"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};