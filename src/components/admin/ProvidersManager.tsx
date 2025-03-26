
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusCircle, PencilIcon, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

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
    contactEmail: 'info@bellsmarthome.ca'
  },
  {
    id: 'prov2',
    name: 'Rogers Smart Home Monitoring',
    category: 'Security & Monitoring',
    image: '/placeholder.svg',
    rating: 4.6,
    description: '24/7 professional monitoring and smart home integration.',
    website: 'https://rogers.com/smart-home',
    contactEmail: 'support@rogers.com'
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
    contactEmail: ''
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
      contactEmail: newProvider.contactEmail || ''
    } as Provider;

    setProviders([...providers, providerToAdd]);
    setNewProvider({
      name: '',
      category: '',
      rating: 5.0,
      description: '',
      image: '/placeholder.svg',
      website: '',
      contactEmail: ''
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
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle size={16} />
              Add Provider
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Service Provider</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name *</label>
                  <Input 
                    id="name" 
                    value={newProvider.name || ''} 
                    onChange={(e) => setNewProvider({...newProvider, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">Category *</label>
                  <Input 
                    id="category" 
                    value={newProvider.category || ''} 
                    onChange={(e) => setNewProvider({...newProvider, category: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="rating" className="text-sm font-medium">Rating (1-5)</label>
                  <Input 
                    id="rating" 
                    type="number" 
                    min="1" 
                    max="5" 
                    step="0.1" 
                    value={newProvider.rating || 5.0} 
                    onChange={(e) => setNewProvider({...newProvider, rating: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">Description</label>
                  <Input 
                    id="description" 
                    value={newProvider.description || ''} 
                    onChange={(e) => setNewProvider({...newProvider, description: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="website" className="text-sm font-medium">Website URL</label>
                  <Input 
                    id="website" 
                    value={newProvider.website || ''} 
                    onChange={(e) => setNewProvider({...newProvider, website: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contactEmail" className="text-sm font-medium">Contact Email</label>
                  <Input 
                    id="contactEmail" 
                    type="email"
                    value={newProvider.contactEmail || ''} 
                    onChange={(e) => setNewProvider({...newProvider, contactEmail: e.target.value})}
                  />
                </div>
              </div>
              <Button className="w-full" onClick={handleAddProvider}>Add Provider</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Website</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {providers.map((provider) => (
            <TableRow key={provider.id}>
              <TableCell>
                <img src={provider.image} alt={provider.name} className="h-12 w-12 object-contain" />
              </TableCell>
              <TableCell className="font-medium">{provider.name}</TableCell>
              <TableCell>{provider.category}</TableCell>
              <TableCell>{provider.rating}</TableCell>
              <TableCell>
                <a 
                  href={provider.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {provider.website.replace(/^https?:\/\//, '')}
                </a>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => {
                      setCurrentProvider(provider);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <PencilIcon size={16} />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="icon"
                    onClick={() => handleDeleteProvider(provider.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Provider Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Service Provider</DialogTitle>
          </DialogHeader>
          {currentProvider && (
            <div className="space-y-4 py-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-name" className="text-sm font-medium">Name *</label>
                  <Input 
                    id="edit-name" 
                    value={currentProvider.name} 
                    onChange={(e) => setCurrentProvider({...currentProvider, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-category" className="text-sm font-medium">Category *</label>
                  <Input 
                    id="edit-category" 
                    value={currentProvider.category} 
                    onChange={(e) => setCurrentProvider({...currentProvider, category: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-rating" className="text-sm font-medium">Rating (1-5)</label>
                  <Input 
                    id="edit-rating" 
                    type="number" 
                    min="1" 
                    max="5" 
                    step="0.1" 
                    value={currentProvider.rating} 
                    onChange={(e) => setCurrentProvider({...currentProvider, rating: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-description" className="text-sm font-medium">Description</label>
                  <Input 
                    id="edit-description" 
                    value={currentProvider.description} 
                    onChange={(e) => setCurrentProvider({...currentProvider, description: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-website" className="text-sm font-medium">Website URL</label>
                  <Input 
                    id="edit-website" 
                    value={currentProvider.website} 
                    onChange={(e) => setCurrentProvider({...currentProvider, website: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-contactEmail" className="text-sm font-medium">Contact Email</label>
                  <Input 
                    id="edit-contactEmail" 
                    type="email"
                    value={currentProvider.contactEmail} 
                    onChange={(e) => setCurrentProvider({...currentProvider, contactEmail: e.target.value})}
                  />
                </div>
              </div>
              <Button className="w-full" onClick={handleEditProvider}>Save Changes</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
