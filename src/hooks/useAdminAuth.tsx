
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type AdminSession = {
  isAuthenticated: boolean;
  username: string;
  loginTime: string;
};

export const useAdminAuth = (redirectTo = '/admin') => {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const adminSession = localStorage.getItem('admin_session');
      
      if (!adminSession) {
        setIsLoading(false);
        navigate(redirectTo);
        return;
      }
      
      try {
        const parsedSession = JSON.parse(adminSession) as AdminSession;
        
        if (!parsedSession.isAuthenticated) {
          setIsLoading(false);
          navigate(redirectTo);
          return;
        }
        
        // Check if session has expired (optional - set to 24 hours)
        const loginTime = new Date(parsedSession.loginTime).getTime();
        const currentTime = new Date().getTime();
        const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours
        
        if (currentTime - loginTime > sessionDuration) {
          // Session expired
          localStorage.removeItem('admin_session');
          setIsLoading(false);
          navigate(redirectTo);
          return;
        }
        
        setSession(parsedSession);
        setIsLoading(false);
      } catch (error) {
        console.error('Error parsing admin session:', error);
        setIsLoading(false);
        navigate(redirectTo);
      }
    };
    
    checkAuth();
  }, [navigate, redirectTo]);

  const logout = () => {
    localStorage.removeItem('admin_session');
    setSession(null);
    navigate(redirectTo);
  };

  return { session, isLoading, logout };
};
