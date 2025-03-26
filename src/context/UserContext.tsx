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

const MAX_STORED_EVENTS = 50;

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserDataState] = useState<UserData | null>(null);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [isUserDataCollected, setIsUserDataCollected] = useState<boolean>(false);

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

  useEffect(() => {
    if (userData) {
      try {
        localStorage.setItem('approvu_user_data', JSON.stringify(userData));
      } catch (e) {
        console.error('Error saving user data to localStorage', e);
      }
    }
  }, [userData]);

  useEffect(() => {
    if (events.length > 0) {
      try {
        const eventsToStore = events.slice(-MAX_STORED_EVENTS);
        localStorage.setItem('approvu_analytics_events', JSON.stringify(eventsToStore));
      } catch (e) {
        console.error('Error saving events to localStorage', e);
        
        if (e instanceof DOMException && e.name === 'QuotaExceededError') {
          try {
            const reducedEvents = events.slice(-Math.floor(MAX_STORED_EVENTS / 2));
            localStorage.setItem('approvu_analytics_events', JSON.stringify(reducedEvents));
            setEvents(reducedEvents);
          } catch (innerError) {
            console.error('Failed to save even reduced events, clearing localStorage events', innerError);
            localStorage.removeItem('approvu_analytics_events');
          }
        }
      }
    }
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
    
    setEvents(prev => {
      const updatedEvents = [...prev, newEvent];
      return updatedEvents.length > MAX_STORED_EVENTS 
        ? updatedEvents.slice(-MAX_STORED_EVENTS) 
        : updatedEvents;
    });
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
