import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import CropPlannerPage from './pages/CropPlannerPage';
import TaskManagerPage from './pages/TaskManagerPage';
import AskAIPage from './pages/AskAIPage';
import MarketHubPage from './pages/MarketHubPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Theme accentColor="jade" radius="large">
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute>
                  <OnboardingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/crop-planner"
              element={
                <ProtectedRoute>
                  <CropPlannerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <TaskManagerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ask-ai"
              element={
                <ProtectedRoute>
                  <AskAIPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/market"
              element={
                <ProtectedRoute>
                  <MarketHubPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </Theme>
    </QueryClientProvider>
  );
}

export default App;