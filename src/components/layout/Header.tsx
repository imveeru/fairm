import React, { useState } from 'react';
import { Sprout, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useConfigStore } from '@/store/configStore';

export const Header = () => {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const isTestMode = useConfigStore((state) => state.isTestMode);

  const handleLogout = async () => {
    setLoading(true);
    try {
      if (!isTestMode) {
        await supabase.auth.signOut();
      }
      setUser(null);
      sessionStorage.clear();
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center space-x-2">
          <Sprout className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">FAIrm</span>
        </div>
        {user && (
          <Button 
            variant="outline" 
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Signing out...
              </>
            ) : (
              'Logout'
            )}
          </Button>
        )}
      </div>
    </header>
  );
};