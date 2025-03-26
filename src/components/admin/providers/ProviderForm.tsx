
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';

type Provider = {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  description: string;
  website: string;
  contactEmail: string;
  features?: string[];
  compatibility?: string[];
  recommended?: boolean;
  recommendationReasons?: string[];
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
  const [newFeature, setNewFeature] = React.useState('');
  const [newCompatiblity, setNewCompatibility] = React.useState('');
  const [newRecommendationReason, setNewRecommendationReason] = React.useState('');

  const addFeature = () => {
    if (!newFeature.trim()) return;
    const features = [...(provider.features || []), newFeature.trim()];
    onProviderChange({ ...provider, features });
    setNewFeature('');
  };

  const removeFeature = (index: number) => {
    const features = [...(provider.features || [])];
    features.splice(index, 1);
    onProviderChange({ ...provider, features });
  };

  const addCompatibility = () => {
    if (!newCompatiblity.trim()) return;
    const compatibility = [...(provider.compatibility || []), newCompatiblity.trim()];
    onProviderChange({ ...provider, compatibility });
    setNewCompatibility('');
  };

  const removeCompatibility = (index: number) => {
    const compatibility = [...(provider.compatibility || [])];
    compatibility.splice(index, 1);
    onProviderChange({ ...provider, compatibility });
  };

  const addRecommendationReason = () => {
    if (!newRecommendationReason.trim()) return;
    const recommendationReasons = [...(provider.recommendationReasons || []), newRecommendationReason.trim()];
    onProviderChange({ ...provider, recommendationReasons });
    setNewRecommendationReason('');
  };

  const removeRecommendationReason = (index: number) => {
    const recommendationReasons = [...(provider.recommendationReasons || [])];
    recommendationReasons.splice(index, 1);
    onProviderChange({ ...provider, recommendationReasons });
  };

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
          <Textarea 
            id="description" 
            value={provider.description || ''} 
            onChange={(e) => onProviderChange({...provider, description: e.target.value})}
            className="min-h-[100px]"
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

        {/* Features Section */}
        <div className="space-y-2 pt-2">
          <h3 className="text-sm font-semibold">Key Features</h3>
          <div className="flex gap-2">
            <Input
              placeholder="Add a feature..."
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addFeature()}
            />
            <Button type="button" onClick={addFeature} size="sm" className="shrink-0">
              <Plus size={16} />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {provider.features?.map((feature, index) => (
              <Badge key={index} variant="outline" className="flex items-center gap-1 pl-3">
                {feature}
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="h-auto p-1" 
                  onClick={() => removeFeature(index)}
                >
                  <X size={14} />
                </Button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Compatibility Section */}
        <div className="space-y-2 pt-2">
          <h3 className="text-sm font-semibold">Compatible With</h3>
          <div className="flex gap-2">
            <Input
              placeholder="Add compatibility..."
              value={newCompatiblity}
              onChange={(e) => setNewCompatibility(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCompatibility()}
            />
            <Button type="button" onClick={addCompatibility} size="sm" className="shrink-0">
              <Plus size={16} />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {provider.compatibility?.map((item, index) => (
              <Badge key={index} variant="outline" className="flex items-center gap-1 pl-3">
                {item}
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="h-auto p-1" 
                  onClick={() => removeCompatibility(index)}
                >
                  <X size={14} />
                </Button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Recommended Section */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="recommended"
              checked={provider.recommended || false}
              onCheckedChange={(checked) => onProviderChange({...provider, recommended: checked})}
            />
            <Label htmlFor="recommended" className="font-medium">Recommended Provider</Label>
          </div>

          {provider.recommended && (
            <div className="space-y-2 pl-6">
              <h3 className="text-sm font-semibold">Recommendation Reasons</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a reason..."
                  value={newRecommendationReason}
                  onChange={(e) => setNewRecommendationReason(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addRecommendationReason()}
                />
                <Button type="button" onClick={addRecommendationReason} size="sm" className="shrink-0">
                  <Plus size={16} />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {provider.recommendationReasons?.map((reason, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1 pl-3">
                    {reason}
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="h-auto p-1" 
                      onClick={() => removeRecommendationReason(index)}
                    >
                      <X size={14} />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Button className="w-full" onClick={onSubmit}>{submitLabel}</Button>
    </div>
  );
};
