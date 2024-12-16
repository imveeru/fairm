import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '@/services/profileService';
import { useAuthStore } from '@/store/authStore';
import { useProfileStore } from '@/store/profileStore';
import { UserProfile } from '@/types/profile';

export const useProfile = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const { setProfile, setLoading, setError } = useProfileStore();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', user?.email],
    queryFn: () => profileService.getProfile(user?.email || ''),
    enabled: !!user?.email,
    onSuccess: (data) => {
      setProfile(data);
      sessionStorage.setItem('userProfile', JSON.stringify(data));
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const { mutate: updateProfile } = useMutation({
    mutationFn: (updates: Partial<UserProfile>) =>
      profileService.updateProfile(user?.email || '', updates),
    onSuccess: () => {
      queryClient.invalidateQueries(['profile', user?.email]);
    },
  });

  return {
    profile,
    isLoading,
    updateProfile,
  };
};