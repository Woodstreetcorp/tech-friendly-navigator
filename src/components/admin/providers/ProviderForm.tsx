
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Provider = {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  description: string;
  website: string;
  contactEmail: string;
};

interface ProviderFormProps {
  provider: Partial<Provider>;
  onProviderChange: (updatedProvider: Partial<Provider>) => void;
  onSubmit: () => void;
  submitLabel: string;
}

export const ProviderForm = ({
  provider,
  onProviderChange,
  onSubmit,
  submitLabel
}: ProviderFormProps) => {
  return (
    <div className="space-y-4 py-4">
      <div className="grid gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">Name *</label>
          <Input 
            id="name" 
            value={provider.name || ''} 
            onChange={(e) => onProviderChange({...provider, name: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium">Category *</label>
          <Input 
            id="category" 
            value={provider.category || ''} 
            onChange={(e) => onProviderChange({...provider, category: e.target.value})}
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
            value={provider.rating || 5.0} 
            onChange={(e) => onProviderChange({...provider, rating: parseFloat(e.target.value)})}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">Description</label>
          <Input 
            id="description" 
            value={provider.description || ''} 
            onChange={(e) => onProviderChange({...provider, description: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="website" className="text-sm font-medium">Website URL</label>
          <Input 
            id="website" 
            value={provider.website || ''} 
            onChange={(e) => onProviderChange({...provider, website: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="contactEmail" className="text-sm font-medium">Contact Email</label>
          <Input 
            id="contactEmail" 
            type="email"
            value={provider.contactEmail || ''} 
            onChange={(e) => onProviderChange({...provider, contactEmail: e.target.value})}
          />
        </div>
      </div>
      <Button className="w-full" onClick={onSubmit}>{submitLabel}</Button>
    </div>
  );
};
