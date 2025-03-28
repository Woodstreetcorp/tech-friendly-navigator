
import { createContext, useContext, useState, useEffect, useRef } from 'react';

// Define the structure of analytics events
export interface AnalyticsEvent {
  eventType: string;
  productId?: string;
  productName?: string;
  providerId?: string;
  providerName?: string;
  source: string;
  url: string;
  timestamp: number;
  [key: string]: any;
}

// Define the structure of user data
interface UserData {
  name: string;
  email: string;
  phone?: string;
  postalCode?: string;
  consentToMarketing: boolean;
}

// Define the context type
interface UserContextType {
  userData: UserData | null;
  updateUserData: (data: UserData) => void;
  trackEvent: (event: Partial<AnalyticsEvent>) => void;
  events: AnalyticsEvent[]; // Add this line to expose events
}

// Create the context with a default value
const UserContext = createContext<UserContextType>({
  userData: null,
  updateUserData: () => {},
  trackEvent: () => {},
  events: [], // Add default empty array
});

// Create a provider component
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(() => {
    // Initialize from localStorage
    const storedData = localStorage.getItem('smartHomeUserData');
    return storedData ? JSON.parse(storedData) : null;
  });
  
  // Use useRef to hold analytics events
  const analyticsEvents = useRef<AnalyticsEvent[]>([]);

  useEffect(() => {
    // Load analytics events from localStorage on component mount
    const storedAnalytics = localStorage.getItem('smartHomeAnalytics');
    if (storedAnalytics) {
      try {
        analyticsEvents.current = JSON.parse(storedAnalytics);
      } catch (error) {
        console.error('Error parsing analytics data from localStorage:', error);
        // If there's an error parsing, initialize with an empty array
        analyticsEvents.current = [];
      }
    } else {
      // If no data in localStorage, initialize with an empty array
      analyticsEvents.current = [];
    }
  }, []);

  // Function to update user data and store it in localStorage
  const updateUserData = (data: UserData) => {
    setUserData(data);
    localStorage.setItem('smartHomeUserData', JSON.stringify(data));
  };

  // Function to track analytics events and store them in localStorage
  const trackEvent = (event: Partial<AnalyticsEvent>) => {
    if (!event.eventType || !event.url) {
      console.error('Event missing required properties:', event);
      // Add required properties if missing
      const completeEvent: AnalyticsEvent = {
        eventType: event.eventType || 'unknown_event',
        source: event.source || 'unknown_source',
        url: event.url || window.location.href,
        ...event,
        timestamp: Date.now()
      };
      
      // Now track the event with all required properties
      const events = [...analyticsEvents.current, completeEvent];
      analyticsEvents.current = events;
      
      // Store in localStorage
      try {
        localStorage.setItem('smartHomeAnalytics', JSON.stringify(events));
      } catch (error) {
        console.error('Error storing analytics data:', error);
      }
      
      // Log the event for debugging
      console.log('Tracked event:', completeEvent);
    } else {
      // If all required properties are present, just add timestamp
      const eventWithTimestamp: AnalyticsEvent = {
        ...event as any,
        source: event.source || 'unknown_source',
        timestamp: Date.now()
      };
      
      // Track the event
      const events = [...analyticsEvents.current, eventWithTimestamp];
      analyticsEvents.current = events;
      
      // Store in localStorage
      try {
        localStorage.setItem('smartHomeAnalytics', JSON.stringify(events));
      } catch (error) {
        console.error('Error storing analytics data:', error);
      }
      
      // Log the event for debugging
      console.log('Tracked event:', eventWithTimestamp);
    }
  };

  // Provide the context value
  return (
    <UserContext.Provider value={{ 
      userData, 
      updateUserData, 
      trackEvent,
      events: analyticsEvents.current 
    }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the context
export const useUser = () => useContext(UserContext);
