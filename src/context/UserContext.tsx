
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserData = {
  email: string;
  name?: string;
  phone?: string;
  postalCode?: string;
  consentToMarketing: boolean;
};

type AnalyticsEvent = {
  eventType: string;
  productId?: string;
  productName?: string;
  providerId?: string;
  providerName?: string;
  timestamp: string;
  source?: string;
  url?: string;
};

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  trackEvent: (event: Omit<AnalyticsEvent, "timestamp">) => void;
  events: AnalyticsEvent[];
  clearUserData: () => void;
  isUserDataCollected: boolean;
}

const defaultContext: UserContextType = {
  userData: null,
  setUserData: () => {},
  trackEvent: () => {},
  events: [],
  clearUserData: () => {},
  isUserDataCollected: false,
};

const UserContext = createContext<UserContextType>(defaultContext);

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserDataState] = useState<UserData | null>(null);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [isUserDataCollected, setIsUserDataCollected] = useState<boolean>(false);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUserData = localStorage.getItem('approvu_user_data');
    if (savedUserData) {
      try {
        const parsedData = JSON.parse(savedUserData);
        setUserDataState(parsedData);
        setIsUserDataCollected(true);
      } catch (e) {
        console.error('Error parsing saved user data', e);
      }
    }

    const savedEvents = localStorage.getItem('approvu_analytics_events');
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents);
        setEvents(parsedEvents);
      } catch (e) {
        console.error('Error parsing saved events', e);
      }
    }
  }, []);

  // Update localStorage when user data changes
  useEffect(() => {
    if (userData) {
      localStorage.setItem('approvu_user_data', JSON.stringify(userData));
    }
  }, [userData]);

  // Update localStorage when events change
  useEffect(() => {
    localStorage.setItem('approvu_analytics_events', JSON.stringify(events));
  }, [events]);

  const setUserData = (data: UserData) => {
    setUserDataState(data);
    setIsUserDataCollected(true);
  };

  const trackEvent = (event: Omit<AnalyticsEvent, "timestamp">) => {
    const newEvent = {
      ...event,
      timestamp: new Date().toISOString(),
    };
    
    console.log('Tracking event:', newEvent);
    
    // In a production app, you would send this to your analytics service
    // Example: await analyticsService.trackEvent(newEvent);
    
    // For now, we'll just store it locally
    setEvents(prev => [...prev, newEvent]);
  };

  const clearUserData = () => {
    setUserDataState(null);
    setIsUserDataCollected(false);
    localStorage.removeItem('approvu_user_data');
  };

  return (
    <UserContext.Provider value={{ 
      userData, 
      setUserData, 
      trackEvent, 
      events, 
      clearUserData,
      isUserDataCollected
    }}>
      {children}
    </UserContext.Provider>
  );
};
