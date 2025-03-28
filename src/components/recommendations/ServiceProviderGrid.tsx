
import { useRecommendationFilters } from "@/hooks/useRecommendationFilters";
import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import UserInfoForm from "@/components/UserInfoForm";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";

const ServiceProviderGrid = () => {
  const { getServiceProviders } = useRecommendationFilters();
  const { trackEvent } = useUser();
  const [showUserInfoForm, setShowUserInfoForm] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  
  // Get providers data - use dummy data as fallback to ensure we always show something
  const providersFromFilter = getServiceProviders();
  const providers = providersFromFilter.length > 0 ? providersFromFilter : [
    {
      id: 'default-provider-1',
      name: 'Smart Home Solutions',
      category: 'Full Home Integration',
      image: '/placeholder.svg',
      rating: 4.8,
      description: 'Professional installation and monitoring for all your smart home needs.',
      website: 'https://example.com/smart-home-solutions',
      contactEmail: 'info@smarthomesolutions.com'
    },
    {
      id: 'default-provider-2',
      name: 'Security Monitoring Pro',
      category: 'Security & Monitoring',
      image: '/placeholder.svg',
      rating: 4.6,
      description: '24/7 professional monitoring and smart security systems for your home.',
      website: 'https://example.com/security-monitoring',
      contactEmail: 'contact@securitymonitoring.com'
    }
  ];

  const handleProviderClick = (provider: any) => {
    // Track the click event
    trackEvent({
      eventType: 'provider_click',
      providerId: provider.id,
      providerName: provider.name,
      source: 'recommendations_page',
      url: window.location.href
    });
    
    setSelectedProvider(provider);
    setShowUserInfoForm(true);
  };

  const handleUserFormComplete = () => {
    setShowUserInfoForm(false);
    
    // Open provider website if available
    if (selectedProvider?.website) {
      window.open(selectedProvider.website, '_blank');
      toast.success(`Connecting you with ${selectedProvider.name}`);
    }
  };

  // Always provide some UI, never return empty even if no providers
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((provider) => (
          <Card key={provider.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-muted flex items-center justify-center">
              <img 
                src={provider.image || '/placeholder.svg'} 
                alt={provider.name} 
                className="h-full w-full object-cover" 
              />
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex items-center mb-2">
                <div className="flex items-center mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={`${i < Math.floor(provider.rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-300 fill-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{provider.rating}</span>
              </div>
              
              <CardTitle>{provider.name}</CardTitle>
              <CardDescription>{provider.category}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">{provider.description}</p>
            </CardContent>
            
            <CardFooter>
              <Button 
                className="w-full"
                onClick={() => handleProviderClick(provider)}
              >
                <ExternalLink size={16} className="mr-2" />
                Connect with Provider
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {showUserInfoForm && selectedProvider && (
        <UserInfoForm
          onClose={() => setShowUserInfoForm(false)}
          onComplete={handleUserFormComplete}
          providerName={selectedProvider.name}
          affiliateUrl={selectedProvider.website}
        />
      )}
    </div>
  );
};

export default ServiceProviderGrid;
