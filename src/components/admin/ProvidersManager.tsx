
import React, { useState } from 'react';
import { toast } from 'sonner';
import { ProviderList } from './providers/ProviderList';
import { AddProviderDialog } from './providers/AddProviderDialog';
import { EditProviderDialog } from './providers/EditProviderDialog';

// Sample providers data (in a real app, this would come from your backend)
const sampleProviders = [
  {
    id: 'prov1',
    name: 'Bell Smart Home',
    category: 'Full Home Solution',
    image: '/placeholder.svg',
    rating: 4.8,
    description: 'Professional installation and monitoring for complete home security.',
    website: 'https://bell.ca/smart-home',
    contactEmail: 'info@bellsmarthome.ca',
    features: ['Professional Installation', '24/7 Monitoring', 'Mobile App Control'],
    compatibility: ['Google Home', 'Amazon Alexa', 'Apple HomeKit'],
    recommended: true,
    recommendationReasons: ['Top-rated service', 'Comprehensive coverage', 'Excellent customer support']
  },
  {
    id: 'prov2',
    name: 'Rogers Smart Home Monitoring',
    category: 'Security & Monitoring',
    image: '/placeholder.svg',
    rating: 4.6,
    description: '24/7 professional monitoring and smart home integration.',
    website: 'https://rogers.com/smart-home',
    contactEmail: 'support@rogers.com',
    features: ['DIY Installation Option', 'Professional Installation', 'Mobile App'],
    compatibility: ['Google Home', 'Amazon Alexa'],
    recommended: false
  }
];

type Provider = typeof sampleProviders[0];

export const ProvidersManager = () => {
  const [providers, setProviders] = useState<Provider[]>(sampleProviders);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProvider, setCurrentProvider] = useState<Provider | null>(null);
  const [newProvider, setNewProvider] = useState<Partial<Provider>>({
    name: '',
    category: '',
    rating: 5.0,
    description: '',
    image: '/placeholder.svg',
    website: '',
    contactEmail: '',
    features: [],
    compatibility: [],
    recommended: false,
    recommendationReasons: []
  });

  const handleAddProvider = () => {
    if (!newProvider.name || !newProvider.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    const providerToAdd = {
      ...newProvider,
      id: `prov${Date.now()}`,
      name: newProvider.name || '',
      category: newProvider.category || '',
      rating: Number(newProvider.rating) || 5.0,
      image: newProvider.image || '/placeholder.svg',
      description: newProvider.description || '',
      website: newProvider.website || '',
      contactEmail: newProvider.contactEmail || '',
      features: newProvider.features || [],
      compatibility: newProvider.compatibility || [],
      recommended: newProvider.recommended || false,
      recommendationReasons: newProvider.recommendationReasons || []
    } as Provider;

    setProviders([...providers, providerToAdd]);
    setNewProvider({
      name: '',
      category: '',
      rating: 5.0,
      description: '',
      image: '/placeholder.svg',
      website: '',
      contactEmail: '',
      features: [],
      compatibility: [],
      recommended: false,
      recommendationReasons: []
    });
    setIsAddDialogOpen(false);
    
    // In a real app, you'd make an API call to save the provider
    toast.success('Provider added successfully');
  };

  const handleEditProvider = () => {
    if (!currentProvider || !currentProvider.name || !currentProvider.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    const updatedProviders = providers.map(provider => 
      provider.id === currentProvider.id ? currentProvider : provider
    );
    
    setProviders(updatedProviders);
    setIsEditDialogOpen(false);
    
    // In a real app, you'd make an API call to update the provider
    toast.success('Provider updated successfully');
  };

  const handleDeleteProvider = (id: string) => {
    if (confirm('Are you sure you want to delete this provider?')) {
      const updatedProviders = providers.filter(provider => provider.id !== id);
      setProviders(updatedProviders);
      
      // In a real app, you'd make an API call to delete the provider
      toast.success('Provider deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Service Providers Management</h2>
        <AddProviderDialog
          isOpen={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          newProvider={newProvider}
          onProviderChange={setNewProvider}
          onAddProvider={handleAddProvider}
        />
      </div>

      <ProviderList
        providers={providers}
        onEdit={(provider) => {
          setCurrentProvider(provider);
          setIsEditDialogOpen(true);
        }}
        onDelete={handleDeleteProvider}
      />

      <EditProviderDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        currentProvider={currentProvider}
        onProviderChange={setCurrentProvider}
        onEditProvider={handleEditProvider}
      />
    </div>
  );
};
