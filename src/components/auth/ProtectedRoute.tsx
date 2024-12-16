import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useOnboardingStore } from '@/store/onboardingStore';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/lib/supabase';
import { useConfigStore } from '@/store/configStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuthStore();
  // console.log("User:", user);
  const { isComplete, setComplete } = useOnboardingStore();
  // console.log("Complete?",isComplete)
  const location = useLocation();
  const isTestMode = useConfigStore((state) => state.isTestMode);

  const { data: profile, isSuccess } = useQuery({
    queryKey: ['profile', user?.email],
    queryFn: () => getUserProfile(user?.email || ''),
    enabled: !!user?.email && !isTestMode,
    // onSuccess: (data) => {
    //   if (data) {
    //     setComplete(true);
    //   }
    // },
  });

  useEffect(() => {
    if(isSuccess){
      // window.sessionStorage.setItem("Success","Trueee")
      console.log('Successfully Onboarded!');
      setComplete(true);
    }
  }, [isSuccess]);

  if (!isAuthenticated) {
    return <Navigate to="/auth?type=login" state={{ from: location }} replace />;
  }

  // Allow access to onboarding page if onboarding is not complete
  if (!isComplete && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  // Redirect to dashboard if trying to access onboarding when it's already complete
  if (isComplete && location.pathname === '/onboarding') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};