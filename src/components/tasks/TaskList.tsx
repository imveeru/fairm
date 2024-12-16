import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  due_date: string;
  status: string;
  category: string;
}

interface TaskListProps {
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No tasks scheduled</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
          >
            {task.status === 'completed' ? (
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
            ) : (
              <Circle className="h-5 w-5 text-gray-400 mt-0.5" />
            )}
            <div>
              <h4 className="font-medium">{task.title}</h4>
              <p className="text-sm text-gray-500">{task.description}</p>
              <p className="text-xs text-gray-400 mt-1">
                Due: {new Date(task.due_date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};