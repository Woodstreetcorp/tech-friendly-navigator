
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ArrowRight, CheckCircle, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/context/UserContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Sample provider data - this would typically come from an API
const providersData = [
  {
    id: 'prov1',
    name: 'Bell Smart Home',
    category: 'Full Home Solution',
    image: '/placeholder.svg',
    rating: 4.8,
    description: 'Professional installation and monitoring for complete home security.',
    longDescription: 'Bell Smart Home offers comprehensive smart home solutions with professional installation and 24/7 monitoring. Our services include security systems, camera installation, smart lighting, climate control, and full home automation.',
    services: [
      'Professional Security System Installation',
      '24/7 Professional Monitoring',
      'Smart Camera Installation',
      'Home Automation Integration',
      'Smart Lock Installation'
    ],
    benefits: [
      'Fully integrated system that works seamlessly across devices',
      'Professional installation ensures everything works correctly',
      'Regular software updates and maintenance',
      'Dedicated customer support team'
    ],
    contactInfo: {
      phone: '1-800-123-4567',
      email: 'support@bellsmarthome.ca',
      website: 'https://www.bellsmarthome.ca'
    }
  },
  {
    id: 'prov2',
    name: 'Rogers Smart Home Monitoring',
    category: 'Security & Monitoring',
    image: '/placeholder.svg',
    rating: 4.6,
    description: '24/7 professional monitoring and smart home integration.',
    longDescription: 'Rogers Smart Home Monitoring provides reliable security and monitoring services with professional installation. Our systems can be controlled from your smartphone and integrate with most popular smart home devices.',
    services: [
      'Home Security Monitoring',
      'Video Surveillance Installation',
      'Environmental Monitoring (smoke, carbon monoxide)',
      'Remote Access and Control',
      'Energy Management Solutions'
    ],
    benefits: [
      'Quick response time to security alerts',
      'Easy-to-use mobile app',
      'No long-term contract requirements',
      'Customizable systems for any home size'
    ],
    contactInfo: {
      phone: '1-800-987-6543',
      email: 'support@rogerssmarthome.ca',
      website: 'https://www.rogerssmarthome.ca'
    }
  }
];

const ProviderDetail = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const [provider, setProvider] = useState<typeof providersData[0] | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { trackEvent } = useUser();

  useEffect(() => {
    console.log("ProviderDetail mounted, loading provider ID:", providerId);
    
    // Find the provider in our data
    const foundProvider = providersData.find(p => p.id === providerId) || null;
    console.log("Found provider:", foundProvider ? foundProvider.name : "Not found");
    
    // Set provider and loading state immediately
    setProvider(foundProvider);
    setLoading(false);
    
    // Only track event if the provider is found
    if (foundProvider) {
      trackEvent({
        eventType: 'provider_detail_view',
        providerId: foundProvider.id,
        providerName: foundProvider.name,
        source: 'provider_detail',
        url: window.location.href
      });
    }
  }, [providerId, trackEvent]);

  const handleContactClick = () => {
    if (provider) {
      trackEvent({
        eventType: 'provider_contact',
        providerId: provider.id,
        providerName: provider.name,
        source: 'provider_detail',
        url: window.location.href
      });
      
      toast({
        title: "Contact Information",
        description: `${provider.contactInfo.phone} or ${provider.contactInfo.email}`,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="container-custom">
          {loading ? (
            // Loading skeleton
            <>
              <div className="mb-6">
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                <div className="glass-card p-6 flex items-center justify-center">
                  <Skeleton className="h-80 w-full rounded-lg" />
                </div>
                <div className="space-y-6">
                  <div>
                    <Skeleton className="h-4 w-1/4 mb-2" />
                    <Skeleton className="h-8 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-12 w-40" />
                </div>
              </div>
            </>
          ) : provider ? (
            <>
              <nav className="flex items-center space-x-2 mb-6 text-sm">
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
                <span className="text-muted-foreground">/</span>
                <Link to="/partners" className="text-muted-foreground hover:text-foreground transition-colors">
                  Service Providers
                </Link>
                <span className="text-muted-foreground">/</span>
                <span className="font-medium">{provider.name}</span>
              </nav>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                <div className="glass-card p-6 flex items-center justify-center">
                  <img 
                    src={provider.image} 
                    alt={provider.name} 
                    className="max-h-80 w-auto object-contain"
                  />
                </div>
                
                <div className="space-y-6">
                  <div>
                    <Badge variant="outline" className="mb-2">
                      {provider.category}
                    </Badge>
                    <h1 className="text-3xl font-bold mb-4">{provider.name}</h1>
                    <div className="flex items-center mb-4">
                      <div className="flex items-center text-amber-500 mr-2">
                        <Star size={18} fill="currentColor" />
                        <span className="ml-1 font-semibold">{provider.rating}</span>
                      </div>
                      <span className="text-muted-foreground">Trusted Provider</span>
                    </div>
                    <p className="text-lg text-muted-foreground">
                      {provider.longDescription}
                    </p>
                  </div>
                  
                  <Button onClick={handleContactClick} size="lg" className="mt-8">
                    Contact Provider
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                <div className="glass-card p-8">
                  <h2 className="text-2xl font-semibold mb-6">Services Offered</h2>
                  <ul className="space-y-4">
                    {provider.services.map((service, index) => (
                      <li key={index} className="flex">
                        <CheckCircle size={18} className="text-primary mt-1 mr-3 flex-shrink-0" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="glass-card p-8">
                  <h2 className="text-2xl font-semibold mb-6">Benefits</h2>
                  <ul className="space-y-4">
                    {provider.benefits.map((benefit, index) => (
                      <li key={index} className="flex">
                        <CheckCircle size={18} className="text-primary mt-1 mr-3 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="glass-card p-8 mb-16">
                <div className="flex items-start mb-6">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Shield className="text-primary h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Professional Service</h3>
                    <p className="text-muted-foreground">
                      All service providers featured on our platform are vetted for quality and reliability. 
                      We only partner with companies that meet our high standards for customer service and technical expertise.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Clock className="text-primary h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Quick Response Time</h3>
                    <p className="text-muted-foreground">
                      Our partner service providers guarantee a quick response to inquiries and service calls. 
                      Most providers offer same-day or next-day consultations.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Link to="/recommendations" className="btn-accent">
                  Explore Smart Home Products
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-4">Provider Not Found</h2>
              <p className="text-muted-foreground mb-8">
                We couldn't find the service provider you're looking for.
              </p>
              <Link to="/" className="btn-primary">
                Return to Home
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProviderDetail;
