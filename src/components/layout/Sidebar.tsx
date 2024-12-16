import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Sprout,
  CalendarDays,
  MessageSquareText,
  BarChart3,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useProfile } from '@/hooks/useProfile';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Sprout, label: 'Crop Planner', path: '/crop-planner' },
  { icon: CalendarDays, label: 'Task Manager', path: '/tasks' },
  { icon: MessageSquareText, label: 'Ask FAIrm AI', path: '/ask-ai' },
  { icon: BarChart3, label: 'Market Hub', path: '/market' },
];

export const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuthStore();
  const { profile } = useProfile();
  const avatarUrl = `https://api.dicebear.com/7.x/avatars/svg?seed=${user?.email}`;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-16">
      <nav className="p-4 flex flex-col h-[calc(100vh-4rem)]">
        {/* Menu Items */}
        <ul className="space-y-2 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    'flex items-center space-x-3 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50',
                    location.pathname === item.path && 'bg-primary/10 text-primary'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Profile Section */}
        <Link
          to="/profile"
          className={cn(
            'flex items-center space-x-3 px-4 py-3 rounded-md text-gray-700 hover:bg-gray-50 mt-auto border-t',
            location.pathname === '/profile' && 'bg-primary/10 text-primary'
          )}
        >
          <img
            src={avatarUrl}
            alt="Profile"
            className="h-10 w-10 rounded-full bg-gray-100"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.email}</p>
            <p className="text-xs text-gray-500 truncate">
              {profile?.location || 'Set your location'}
            </p>
          </div>
        </Link>
      </nav>
    </aside>
  );
};