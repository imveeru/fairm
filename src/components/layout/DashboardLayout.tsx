import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => (
  <div className="min-h-screen">
    <Header />
    <Sidebar />
    <main className="ml-64 pt-16 min-h-[calc(100vh-4rem)]">
      <div className="p-6 bg-gray-50 min-h-full">{children}</div>
    </main>
    <Footer />
  </div>
);