import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  
  return user?.isAdmin ? <>{children}</> : null;
};