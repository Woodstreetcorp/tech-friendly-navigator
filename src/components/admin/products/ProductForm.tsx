import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { X, Plus, LinkIcon } from 'lucide-react';
import { ImageUploader } from '../common/ImageUploader';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  price: number;
  description: string;
  features?: string[];
  compatibility?: string[];
  recommended?: boolean;
  recommendationReasons?: string[];
  brand?: string;
  affiliateUrl?: string;
  commissionRate?: number;
  affiliateId?: string;
  serviceProvider?: string;
  bundleProviders?: string[];
  bundleEligible?: boolean;
  bundleDiscountType?: 'percentage' | 'fixed';
  bundleDiscountValue?: number;
};

interface ProductFormProps {
  product: Partial<Product>;
  onProductChange: (updatedProduct: Partial<Product>) => void;
  onSubmit: () => void;
  submitLabel: string;
}

const categories = ['Security', 'Climate Control', 'Lighting', 'Smart Speakers', 'Entertainment', 'Home Automation'];
const brands = ['Ring', 'Nest', 'Philips Hue', 'Amazon', 'Google', 'Apple', 'Samsung', 'Ecobee', 'Lutron', 'Sonos'];
const compatibilityOptions = ['Amazon Alexa', 'Google Home', 'Apple HomeKit', 'Samsung SmartThings', 'IFTTT', 'Z-Wave', 'Zigbee'];

export const ProductForm = ({ 
  product, 
  onProductChange, 
  onSubmit, 
  submitLabel 
}: ProductFormProps) => {
  const [newFeature, setNewFeature] = useState('');
  const [newCompatibility, setNewCompatibility] = useState('');
  const [newRecommendationReason, setNewRecommendationReason] = useState('');
  const [activeTab, setActiveTab] = useState('basic');
  const [selectedProvider, setSelectedProvider] = useState('');
  
  const serviceProviders = [
    { id: 'telus', name: 'TELUS' },
    { id: 'bell', name: 'Bell' },
    { id: 'rogers', name: 'Rogers' },
    { id: 'shaw', name: 'Shaw' },
    { id: 'videotron', name: 'Videotron' }
  ];
  
  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    const updatedFeatures = [...(product.features || []), newFeature.trim()];
    onProductChange({...product, features: updatedFeatures});
    setNewFeature('');
  };
  
  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = [...(product.features || [])];
    updatedFeatures.splice(index, 1);
    onProductChange({...product, features: updatedFeatures});
  };
  
  const handleAddCompatibility = () => {
    if (!newCompatibility.trim()) return;
    const updatedCompatibility = [...(product.compatibility || []), newCompatibility.trim()];
    onProductChange({...product, compatibility: updatedCompatibility});
    setNewCompatibility('');
  };
  
  const handleRemoveCompatibility = (index: number) => {
    const updatedCompatibility = [...(product.compatibility || [])];
    updatedCompatibility.splice(index, 1);
    onProductChange({...product, compatibility: updatedCompatibility});
  };
  
  const handleAddRecommendationReason = () => {
    if (!newRecommendationReason.trim()) return;
    const updatedReasons = [...(product.recommendationReasons || []), newRecommendationReason.trim()];
    onProductChange({...product, recommendationReasons: updatedReasons});
    setNewRecommendationReason('');
  };
  
  const handleRemoveRecommendationReason = (index: number) => {
    const updatedReasons = [...(product.recommendationReasons || [])];
    updatedReasons.splice(index, 1);
    onProductChange({...product, recommendationReasons: updatedReasons});
  };
  
  const handleAddBundleProvider = () => {
    if (!selectedProvider || 
        (product.bundleProviders && product.bundleProviders.includes(selectedProvider))) {
      return;
    }
    
    const updatedProviders = [...(product.bundleProviders || []), selectedProvider];
    onProductChange({
      ...product, 
      bundleProviders: updatedProviders,
      bundleEligible: true
    });
    setSelectedProvider('');
  };
  
  const handleRemoveBundleProvider = (providerId: string) => {
    const updatedProviders = (product.bundleProviders || []).filter(id => id !== providerId);
    onProductChange({
      ...product, 
      bundleProviders: updatedProviders,
      bundleEligible: updatedProviders.length > 0
    });
  };
  
  return (
    <div className="space-y-4 py-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="affiliate">Affiliate</TabsTrigger>
          <TabsTrigger value="bundles">Bundles</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4">
          <ImageUploader 
            currentImage={product.image || '/placeholder.svg'} 
            onImageChange={(imageUrl) => onProductChange({...product, image: imageUrl})}
          />
          
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Name *</label>
            <Input 
              id="name" 
              value={product.name || ''} 
              onChange={(e) => onProductChange({...product, name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">Category *</label>
            <Select 
              value={product.category} 
              onValueChange={(value) => onProductChange({...product, category: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="brand" className="text-sm font-medium">Brand</label>
            <Select 
              value={product.brand} 
              onValueChange={(value) => onProductChange({...product, brand: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium">Price *</label>
            <Input 
              id="price" 
              type="number" 
              value={product.price || ''} 
              onChange={(e) => onProductChange({...product, price: parseFloat(e.target.value)})}
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
              value={product.rating || 5.0} 
              onChange={(e) => onProductChange({...product, rating: parseFloat(e.target.value)})}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <Textarea 
              id="description" 
              value={product.description || ''} 
              onChange={(e) => onProductChange({...product, description: e.target.value})}
              rows={3}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="details" className="space-y-6">
          <div className="flex items-center justify-between">
            <label htmlFor="recommended" className="text-sm font-medium">Mark as Recommended</label>
            <Switch 
              id="recommended" 
              checked={product.recommended || false} 
              onCheckedChange={(checked) => onProductChange({...product, recommended: checked})}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Key Features</label>
            <div className="flex gap-2">
              <Input 
                placeholder="Add a feature..." 
                value={newFeature} 
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
              />
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={handleAddFeature}
              >
                <Plus size={16} />
              </Button>
            </div>
            <div className="space-y-2 mt-2">
              {(product.features || []).map((feature, index) => (
                <div key={index} className="flex items-center justify-between bg-secondary/50 rounded-md px-3 py-2">
                  <span className="text-sm">{feature}</span>
                  <button 
                    type="button" 
                    onClick={() => handleRemoveFeature(index)} 
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Compatible With</label>
            <div className="flex gap-2">
              <Select
                onValueChange={(value) => {
                  if (value && !product.compatibility?.includes(value)) {
                    setNewCompatibility(value);
                    const updatedCompatibility = [...(product.compatibility || []), value];
                    onProductChange({...product, compatibility: updatedCompatibility});
                  }
                }}
                value=""
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select compatibility" />
                </SelectTrigger>
                <SelectContent>
                  {compatibilityOptions
                    .filter(option => !(product.compatibility || []).includes(option))
                    .map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Input 
                placeholder="Or type custom..." 
                value={newCompatibility} 
                onChange={(e) => setNewCompatibility(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCompatibility())}
                className="flex-1"
              />
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={handleAddCompatibility}
              >
                <Plus size={16} />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {(product.compatibility || []).map((item, index) => (
                <div key={index} className="inline-flex items-center bg-secondary/50 rounded-md px-2 py-1">
                  <span className="text-xs font-medium">{item}</span>
                  <button 
                    type="button" 
                    onClick={() => handleRemoveCompatibility(index)} 
                    className="ml-1 text-muted-foreground hover:text-destructive"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {product.recommended && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Recommendation Reasons (e.g., "Top Rated", "Easy Installation")</label>
              <div className="flex gap-2">
                <Input 
                  placeholder="Add a reason..." 
                  value={newRecommendationReason} 
                  onChange={(e) => setNewRecommendationReason(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddRecommendationReason())}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddRecommendationReason}
                >
                  <Plus size={16} />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {(product.recommendationReasons || []).map((reason, index) => (
                  <div key={index} className="inline-flex items-center bg-primary/10 text-primary rounded-md px-2 py-1">
                    <span className="text-xs font-medium">{reason}</span>
                    <button 
                      type="button" 
                      onClick={() => handleRemoveRecommendationReason(index)} 
                      className="ml-1 hover:text-destructive"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="affiliate" className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <LinkIcon size={16} className="text-primary" />
              <label htmlFor="affiliateUrl" className="text-sm font-medium">Affiliate URL</label>
            </div>
            <Input 
              id="affiliateUrl" 
              placeholder="https://example.com/affiliate/your-id"
              value={product.affiliateUrl || ''} 
              onChange={(e) => onProductChange({...product, affiliateUrl: e.target.value})}
            />
            <p className="text-xs text-muted-foreground">The affiliate link provided by your partner to track referrals.</p>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="affiliateId" className="text-sm font-medium">Affiliate ID/Tracking Code</label>
            <Input 
              id="affiliateId" 
              placeholder="YourID123"
              value={product.affiliateId || ''} 
              onChange={(e) => onProductChange({...product, affiliateId: e.target.value})}
            />
            <p className="text-xs text-muted-foreground">Your unique identifier for this affiliate partnership.</p>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="commissionRate" className="text-sm font-medium">Commission Rate (%)</label>
            <Input 
              id="commissionRate" 
              type="number" 
              min="0" 
              max="100" 
              step="0.1" 
              placeholder="5.0"
              value={product.commissionRate || ''} 
              onChange={(e) => onProductChange({...product, commissionRate: parseFloat(e.target.value)})}
            />
            <p className="text-xs text-muted-foreground">The percentage of sales you earn from each referral.</p>
          </div>
          
          <div className="space-y-2 pt-2">
            <label htmlFor="serviceProvider" className="text-sm font-medium">Service Provider</label>
            <Input 
              id="serviceProvider" 
              placeholder="Optional: If this is a service, enter provider name"
              value={product.serviceProvider || ''} 
              onChange={(e) => onProductChange({...product, serviceProvider: e.target.value})}
            />
            <p className="text-xs text-muted-foreground">If this is a service rather than a product, specify the provider.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="bundles" className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="bundleEligible" className="text-sm font-medium">Bundle Eligible</label>
              <Switch 
                id="bundleEligible" 
                checked={product.bundleEligible || false} 
                onCheckedChange={(checked) => onProductChange({...product, bundleEligible: checked})}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Enable this if the product is eligible for bundle discounts with service providers.
            </p>
          </div>
          
          {product.bundleEligible && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bundle Providers</label>
                <div className="flex gap-2">
                  <Select
                    value={selectedProvider}
                    onValueChange={setSelectedProvider}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select a provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceProviders
                        .filter(provider => !(product.bundleProviders || []).includes(provider.id))
                        .map((provider) => (
                          <SelectItem key={provider.id} value={provider.id}>{provider.name}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={handleAddBundleProvider}
                    disabled={!selectedProvider}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(product.bundleProviders || []).map((providerId) => {
                    const provider = serviceProviders.find(p => p.id === providerId);
                    return (
                      <div key={providerId} className="inline-flex items-center bg-secondary/50 rounded-md px-2 py-1">
                        <span className="text-xs font-medium">{provider?.name || providerId}</span>
                        <button 
                          type="button" 
                          onClick={() => handleRemoveBundleProvider(providerId)} 
                          className="ml-1 text-muted-foreground hover:text-destructive"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="bundleDiscountType" className="text-sm font-medium">Discount Type</label>
                  <Select 
                    value={product.bundleDiscountType || 'percentage'} 
                    onValueChange={(value: 'percentage' | 'fixed') => onProductChange({...product, bundleDiscountType: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select discount type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="bundleDiscountValue" className="text-sm font-medium">
                    Discount Value
                    {product.bundleDiscountType === 'percentage' ? ' (%)' : ' ($)'}
                  </label>
                  <Input 
                    id="bundleDiscountValue" 
                    type="number" 
                    min="0" 
                    step={product.bundleDiscountType === 'percentage' ? '1' : '0.01'}
                    value={product.bundleDiscountValue || ''} 
                    onChange={(e) => onProductChange({...product, bundleDiscountValue: parseFloat(e.target.value)})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground italic">
                  Note: Individual product bundle settings will be overridden by any matching Bundle Offers defined in the Bundle Offers Manager.
                </p>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
      
      <Button className="w-full mt-4" onClick={onSubmit}>{submitLabel}</Button>
    </div>
  );
};
