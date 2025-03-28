
import React, { createContext, useContext, useState, useEffect } from 'react';

export type AnalyticsEvent = {
  eventType: string;
  timestamp: number;
  url: string;
  source?: string;
  productId?: string;
  productName?: string;
  filterValue?: string;
  filterAction?: string;
  contactMethod?: string;
  [key: string]: any; // Allow additional properties
};

type UserContextType = {
  userId: string | null;
  isLoggedIn: boolean;
  events: AnalyticsEvent[];
  logIn: (email: string, password: string) => Promise<boolean>;
  logOut: () => void;
  trackEvent: (event: Omit<AnalyticsEvent, 'timestamp'>) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('smartHomeUser');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUserId(userData.id);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }
    
    // Load saved events
    const savedEvents = localStorage.getItem('smartHomeEvents');
    if (savedEvents) {
      try {
        setEvents(JSON.parse(savedEvents));
      } catch (error) {
        console.error('Failed to parse events:', error);
      }
    }
  }, []);
  
  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('smartHomeEvents', JSON.stringify(events));
  }, [events]);

  const logIn = async (email: string, password: string): Promise<boolean> => {
    // This is a mock login function
    // In a real app, you would validate credentials against a backend
    try {
      // Mock successful login
      const mockUser = {
        id: `user_${Math.random().toString(36).substring(2, 10)}`,
        email: email,
        name: email.split('@')[0]
      };
      
      setUserId(mockUser.id);
      setIsLoggedIn(true);
      
      // Save to localStorage
      localStorage.setItem('smartHomeUser', JSON.stringify(mockUser));
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logOut = () => {
    setUserId(null);
    setIsLoggedIn(false);
    localStorage.removeItem('smartHomeUser');
  };

  const trackEvent = (event: Omit<AnalyticsEvent, 'timestamp'>) => {
    const newEvent: AnalyticsEvent = {
      ...event,
      timestamp: Date.now()
    };
    
    setEvents(prev => [...prev, newEvent]);
    console.log('Tracked event:', newEvent);
  };

  return (
    <UserContext.Provider value={{ userId, isLoggedIn, events, logIn, logOut, trackEvent }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
