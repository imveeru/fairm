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
import { useQuery } from '@tanstack/react-query';

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
  const avatarUrl = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${user?.email}`;

  const { data: locationAddress } = useQuery({
    queryKey: ['locationAddress'],
    queryFn: async () => {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${profile["location"].split(",")[0]}&lon=${profile["location"].split(",")[1]}`);
      return response.json();
    },
  });

  let locationName = "";
  if(locationAddress){
    locationName = locationAddress["address"]["state_district"]+", "+locationAddress["address"]["state"]+", "+locationAddress["address"]["country"];
  }
  
  return (
    <aside className="fixed left-0 w-64 h-screen bg-white border-r border-gray-200 top-16">
      <nav className="p-4 flex flex-col h-[calc(100vh-4rem)]">
        {/* Menu Items */}
        <ul className="flex-1 space-y-2">
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
                  <Icon className="w-5 h-5" />
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
            className="w-10 h-10 bg-gray-100 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.email}</p>
            <p className="text-xs text-gray-500 truncate">
              {locationName  || 'Set your location'}
            </p>
          </div>
        </Link>
      </nav>
    </aside>
  );
};