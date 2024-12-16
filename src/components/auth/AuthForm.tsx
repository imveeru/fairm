import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { mockSignIn } from '@/lib/mockAuth';
import { useAuthStore } from '@/store/authStore';
import { useConfigStore } from '@/store/configStore';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';
import { handleError } from '@/utils/helpers';

interface AuthFormProps {
  type: 'login' | 'signup';
}

export const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setUser = useAuthStore((state) => state.setUser);
  const isTestMode = useConfigStore((state) => state.isTestMode);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isTestMode) {
        const { data, error } = await mockSignIn(email, password);
        if (error) throw error;
        if (data.user) {
          setUser(data.user);
          sessionStorage.setItem('user', JSON.stringify(data.user));
          navigate('/onboarding');
        }
      } else {
        const { data, error } = type === 'login' 
          ? await supabase.auth.signInWithPassword({ email, password })
          : await supabase.auth.signUp({ email, password });
          
        if (error) throw error;
        if (data.user) {
          setUser(data.user);
          sessionStorage.setItem('user', JSON.stringify(data.user));
          navigate('/onboarding');
        }
      }
    } catch (err) {
      setError(handleError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {type === 'login' ? (
            <span className="flex items-center justify-center gap-2">
              👋 Welcome back
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              🌱 Create your account
            </span>
          )}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {type === 'login' 
            ? 'Sign in to access your dashboard'
            : 'Start your journey with us'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            📧 Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-400"
            placeholder="Enter your email"
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            🔒 Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-400"
            placeholder="Enter your password"
            required
            disabled={loading}
          />
        </div>
        <Button
          type="submit"
          className="w-full shadow-md hover:shadow-lg transition-shadow"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              {type === 'login' ? 'Signing in...' : 'Creating account...'}
            </>
          ) : (
            type === 'login' ? 'Sign In' : 'Get Started'
          )}
        </Button>
      </form>

      {isTestMode && type === 'login' && (
        <div className="text-sm text-gray-600 text-center mt-4 p-3 bg-primary/5 rounded-md border border-primary/10">
          <p className="font-medium text-primary mb-1">🔑 Test Account</p>
          <p className="text-gray-500">admin@fairm.com / password</p>
        </div>
      )}
    </div>
  );
};