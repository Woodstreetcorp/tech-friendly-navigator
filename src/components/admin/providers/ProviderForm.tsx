
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Plus, LinkIcon, DollarSign } from 'lucide-react';
import { ImageUploader } from '../common/ImageUploader';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  affiliateUrl?: string;
  commissionRate?: number;
  affiliateId?: string;
};

type Category = {
  id: string;
  name: string;
};

interface ProviderFormProps {
  provider: Partial<Provider>;
  onProviderChange: (updatedProvider: Partial<Provider>) => void;
  onSubmit: () => void;
  submitLabel: string;
  categories?: Category[];
}

export const ProviderForm = ({
  provider,
  onProviderChange,
  onSubmit,
  submitLabel,
  categories = []
}: ProviderFormProps) => {
  const [newFeature, setNewFeature] = React.useState('');
  const [newCompatiblity, setNewCompatibility] = React.useState('');
  const [newRecommendationReason, setNewRecommendationReason] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('basic');

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
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="affiliate">Affiliate & Revenue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4">
          <ImageUploader 
            currentImage={provider.image || '/placeholder.svg'} 
            onImageChange={(imageUrl) => onProviderChange({...provider, image: imageUrl})}
            label="Provider Logo/Image"
          />
          
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
            {categories.length > 0 ? (
              <Select
                value={provider.category}
                onValueChange={(value) => onProviderChange({...provider, category: value})}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input 
                id="category" 
                value={provider.category || ''} 
                onChange={(e) => onProviderChange({...provider, category: e.target.value})}
              />
            )}
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
        </TabsContent>
        
        <TabsContent value="details" className="space-y-6">
          <div className="space-y-2">
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

          <div className="space-y-2">
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
          
          <div className="space-y-4">
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
        </TabsContent>
        
        <TabsContent value="affiliate" className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <LinkIcon size={16} className="text-primary" />
              <label htmlFor="affiliateUrl" className="text-sm font-medium">Affiliate URL</label>
            </div>
            <Input 
              id="affiliateUrl" 
              placeholder="https://example.com/partner/your-id"
              value={provider.affiliateUrl || ''} 
              onChange={(e) => onProviderChange({...provider, affiliateUrl: e.target.value})}
            />
            <p className="text-xs text-muted-foreground">The affiliate link provided by this service provider to track referrals.</p>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="affiliateId" className="text-sm font-medium">Affiliate ID/Tracking Code</label>
            <Input 
              id="affiliateId" 
              placeholder="YourID123"
              value={provider.affiliateId || ''} 
              onChange={(e) => onProviderChange({...provider, affiliateId: e.target.value})}
            />
            <p className="text-xs text-muted-foreground">Your unique identifier for this affiliate partnership.</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <DollarSign size={16} className="text-primary" />
              <label htmlFor="commissionRate" className="text-sm font-medium">Commission Rate (%)</label>
            </div>
            <Input 
              id="commissionRate" 
              type="number" 
              min="0" 
              max="100" 
              step="0.1" 
              placeholder="10.0"
              value={provider.commissionRate || ''} 
              onChange={(e) => onProviderChange({...provider, commissionRate: parseFloat(e.target.value)})}
            />
            <p className="text-xs text-muted-foreground">The percentage of referral value you earn from this provider.</p>
          </div>
        </TabsContent>
      </Tabs>
      
      <Button className="w-full mt-4" onClick={onSubmit}>{submitLabel}</Button>
    </div>
  );
};
