import React from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import { useSearchParams, Link } from 'react-router-dom';
import { AuthLayout } from '@/components/layout/AuthLayout';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') as 'login' | 'signup' || 'login';

  return (
    <AuthLayout title={type === 'login' ? 'Sign in to your account' : 'Create your account'}>
      <AuthForm type={type} />
      <p className="mt-4 text-center text-sm text-gray-600">
        {type === 'login' ? (
          <>
            Don't have an account?{' '}
            <Link to="/auth?type=signup" className="text-primary hover:text-primary/90">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link to="/auth?type=login" className="text-primary hover:text-primary/90">
              Sign in
            </Link>
          </>
        )}
      </p>
    </AuthLayout>
  );
};

export default AuthPage;