
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Plus, LinkIcon, DollarSign } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  SmartHomeProduct,
  ProductCategory,
  ProductSubCategory,
  ProductCompatibility,
  ProductFeature
} from '@/data/smartHomeProducts';

interface ProductFormProps {
  product: Partial<SmartHomeProduct> | SmartHomeProduct;
  onProductChange: (updatedProduct: any) => void;
  onSubmit: () => void;
  submitLabel: string;
}

export const ProductForm = ({ 
  product, 
  onProductChange, 
  onSubmit, 
  submitLabel 
}: ProductFormProps) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [newFeature, setNewFeature] = useState('');
  const [selectedCompatibility, setSelectedCompatibility] = useState<ProductCompatibility | ''>('');
  
  // Define available categories and subcategories
  const categories: { value: ProductCategory; label: string }[] = [
    { value: 'security', label: 'Security' },
    { value: 'locks', label: 'Locks & Access Control' },
    { value: 'lighting', label: 'Lighting' },
    { value: 'climate', label: 'Climate Control' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'appliances', label: 'Appliances' },
    { value: 'energy', label: 'Energy & Water Management' },
    { value: 'hubs', label: 'Hubs & Controllers' },
    { value: 'automation', label: 'Automation & Monitoring' },
    { value: 'outdoor', label: 'Outdoor & Garden' }
  ];
  
  // Define subcategories keyed by parent category
  const subcategories: Record<ProductCategory, { value: ProductSubCategory; label: string }[]> = {
    security: [
      { value: 'alarm-systems', label: 'Alarm Systems' },
      { value: 'video-doorbells', label: 'Video Doorbells' },
      { value: 'security-cameras', label: 'Security Cameras' },
      { value: 'motion-sensors', label: 'Motion Sensors' },
      { value: 'glass-break', label: 'Glass Break Sensors' },
      { value: 'door-window', label: 'Door & Window Sensors' },
      { value: 'smoke-co', label: 'Smoke & CO Detectors' }
    ],
    locks: [
      { value: 'door-locks', label: 'Smart Door Locks' },
      { value: 'garage-openers', label: 'Smart Garage Door Openers' },
      { value: 'keyless-entry', label: 'Keyless Entry Systems' }
    ],
    lighting: [
      { value: 'light-bulbs', label: 'Smart Light Bulbs' },
      { value: 'light-switches', label: 'Smart Light Switches' },
      { value: 'smart-plugs', label: 'Smart Plugs & Outlets' }
    ],
    climate: [
      { value: 'thermostats', label: 'Smart Thermostats' },
      { value: 'ac-fans', label: 'Smart AC & Fans' },
      { value: 'humidifiers', label: 'Smart Humidifiers & Dehumidifiers' },
      { value: 'air-purifiers', label: 'Smart Air Purifiers' }
    ],
    entertainment: [
      { value: 'smart-tvs', label: 'Smart TVs' },
      { value: 'streaming-devices', label: 'Smart Streaming Devices' },
      { value: 'smart-speakers', label: 'Smart Speakers & Voice Assistants' },
      { value: 'soundbars', label: 'Smart Soundbars & Home Audio' }
    ],
    appliances: [
      { value: 'vacuum-cleaners', label: 'Smart Vacuum Cleaners' },
      { value: 'dishwashers', label: 'Smart Dishwashers' },
      { value: 'washing-machines', label: 'Smart Washing Machines & Dryers' },
      { value: 'ovens-microwaves', label: 'Smart Ovens & Microwaves' },
      { value: 'refrigerators', label: 'Smart Refrigerators' }
    ],
    energy: [
      { value: 'leak-detectors', label: 'Smart Water Leak Detectors' },
      { value: 'sprinkler-systems', label: 'Smart Sprinkler Systems' },
      { value: 'power-strips', label: 'Smart Power Strips & Surge Protectors' }
    ],
    hubs: [
      { value: 'home-hubs', label: 'Smart Home Hubs' },
      { value: 'remote-controls', label: 'Universal Smart Remote Controls' }
    ],
    automation: [
      { value: 'automation-platforms', label: 'Smart Home Automation Platforms' },
      { value: 'smart-sensors', label: 'Smart Sensors & Automation Devices' }
    ],
    outdoor: [
      { value: 'outdoor-cameras', label: 'Smart Outdoor Cameras' },
      { value: 'outdoor-lights', label: 'Smart Outdoor Lights' },
      { value: 'lawn-mowers', label: 'Smart Lawn Mowers' }
    ]
  };
  
  // Define compatibility options
  const compatibilityOptions: ProductCompatibility[] = [
    'Alexa',
    'Google Assistant',
    'Apple HomeKit',
    'Samsung SmartThings',
    'Z-Wave',
    'Zigbee',
    'IFTTT',
    'Thread'
  ];
  
  // Define installation types
  const installationTypes = [
    { value: 'DIY', label: 'DIY (Self-Installation)' },
    { value: 'Professional', label: 'Professional Installation' },
    { value: 'Both', label: 'Both DIY and Professional' }
  ];
  
  // Define price ranges
  const priceRanges = [
    { value: 'budget', label: 'Budget (Under $100)' },
    { value: 'mid-range', label: 'Mid-Range ($100-$199)' },
    { value: 'premium', label: 'Premium ($200+)' }
  ];
  
  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    
    const feature: ProductFeature = { name: newFeature.trim() };
    const updatedFeatures = [...(product.features || []), feature];
    onProductChange({ ...product, features: updatedFeatures });
    setNewFeature('');
  };
  
  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = [...(product.features || [])];
    updatedFeatures.splice(index, 1);
    onProductChange({ ...product, features: updatedFeatures });
  };
  
  const handleAddCompatibility = () => {
    if (!selectedCompatibility) return;
    
    if (product.compatibility?.includes(selectedCompatibility)) {
      setSelectedCompatibility('');
      return;
    }
    
    const updatedCompatibility = [...(product.compatibility || []), selectedCompatibility];
    onProductChange({ ...product, compatibility: updatedCompatibility });
    setSelectedCompatibility('');
  };
  
  const handleRemoveCompatibility = (compatibility: ProductCompatibility) => {
    const updatedCompatibility = (product.compatibility || []).filter(c => c !== compatibility);
    onProductChange({ ...product, compatibility: updatedCompatibility });
  };
  
  // Get available subcategories based on selected category
  const getAvailableSubcategories = () => {
    if (!product.category) return [];
    return subcategories[product.category as ProductCategory] || [];
  };
  
  // Handle category change
  const handleCategoryChange = (category: ProductCategory) => {
    // When category changes, we should also update the subcategory to match
    const availableSubs = subcategories[category];
    const firstSubcategory = availableSubs && availableSubs.length > 0 ? availableSubs[0].value : undefined;
    
    onProductChange({
      ...product,
      category,
      subCategory: firstSubcategory
    });
  };
  
  return (
    <div className="space-y-4 py-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="details">Details & Features</TabsTrigger>
          <TabsTrigger value="affiliate">Affiliate & Revenue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Product Name *</label>
            <Input 
              id="name" 
              value={product.name || ''} 
              onChange={(e) => onProductChange({...product, name: e.target.value})}
              placeholder="e.g., Ring Video Doorbell 4"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="brand" className="text-sm font-medium">Brand *</label>
            <Input 
              id="brand" 
              value={product.brand || ''} 
              onChange={(e) => onProductChange({...product, brand: e.target.value})}
              placeholder="e.g., Ring, Google Nest, Philips Hue"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">Category *</label>
            <Select 
              value={product.category as string} 
              onValueChange={(value) => handleCategoryChange(value as ProductCategory)}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="subCategory" className="text-sm font-medium">Subcategory *</label>
            <Select 
              value={product.subCategory as string} 
              onValueChange={(value) => onProductChange({...product, subCategory: value as ProductSubCategory})}
              disabled={!product.category}
            >
              <SelectTrigger id="subCategory">
                <SelectValue placeholder={product.category ? "Select a subcategory" : "Select a category first"} />
              </SelectTrigger>
              <SelectContent>
                {getAvailableSubcategories().map((subcategory) => (
                  <SelectItem key={subcategory.value} value={subcategory.value}>{subcategory.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium">Price *</label>
            <Input 
              id="price" 
              type="number" 
              min="0"
              step="0.01"
              value={product.price || ''} 
              onChange={(e) => onProductChange({...product, price: parseFloat(e.target.value)})}
              placeholder="e.g., 199.99"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="priceRange" className="text-sm font-medium">Price Range *</label>
            <Select 
              value={product.priceRange as string} 
              onValueChange={(value) => onProductChange({...product, priceRange: value as 'budget' | 'mid-range' | 'premium'})}
            >
              <SelectTrigger id="priceRange">
                <SelectValue placeholder="Select a price range" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>{range.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="featuredImage" className="text-sm font-medium">Featured Image URL</label>
            <Input 
              id="featuredImage" 
              value={product.featuredImage || '/placeholder.svg'} 
              onChange={(e) => onProductChange({...product, featuredImage: e.target.value})}
              placeholder="URL to product image"
            />
            {product.featuredImage && (
              <div className="mt-2">
                <p className="text-xs text-muted-foreground mb-1">Image Preview:</p>
                <img 
                  src={product.featuredImage} 
                  alt="Product preview" 
                  className="h-20 w-20 object-contain border rounded"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description *</label>
            <Textarea 
              id="description" 
              value={product.description || ''} 
              onChange={(e) => onProductChange({...product, description: e.target.value})}
              placeholder="Detailed product description"
              rows={3}
              required
            />
          </div>
        </TabsContent>
        
        <TabsContent value="details" className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="installationType" className="text-sm font-medium">Installation Type</label>
            <Select 
              value={product.installationType || 'DIY'} 
              onValueChange={(value) => onProductChange({...product, installationType: value as 'DIY' | 'Professional' | 'Both'})}
            >
              <SelectTrigger id="installationType">
                <SelectValue placeholder="Select installation type" />
              </SelectTrigger>
              <SelectContent>
                {installationTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="contractRequired" className="text-sm font-medium">Contract Required</Label>
            <Switch 
              id="contractRequired" 
              checked={product.contractRequired || false} 
              onCheckedChange={(checked) => onProductChange({...product, contractRequired: checked})}
            />
          </div>
          
          {product.contractRequired && (
            <div className="space-y-2">
              <label htmlFor="contractLength" className="text-sm font-medium">Contract Length (months)</label>
              <Input 
                id="contractLength" 
                type="number" 
                min="1"
                value={product.contractLength || ''} 
                onChange={(e) => onProductChange({...product, contractLength: parseInt(e.target.value)})}
                placeholder="e.g., 12, 24, 36"
              />
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <Label htmlFor="monthlySubscriptionRequired" className="text-sm font-medium">Monthly Subscription Required</Label>
            <Switch 
              id="monthlySubscriptionRequired" 
              checked={product.monthlySubscriptionRequired || false} 
              onCheckedChange={(checked) => onProductChange({...product, monthlySubscriptionRequired: checked})}
            />
          </div>
          
          {(product.monthlySubscriptionRequired || product.monthlySubscription) && (
            <div className="space-y-2">
              <label htmlFor="monthlySubscription" className="text-sm font-medium">Monthly Subscription ($)</label>
              <Input 
                id="monthlySubscription" 
                type="number" 
                min="0"
                step="0.01"
                value={product.monthlySubscription || ''} 
                onChange={(e) => onProductChange({...product, monthlySubscription: parseFloat(e.target.value)})}
                placeholder="e.g., 9.99"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="rating" className="text-sm font-medium">Rating (1-5)</label>
            <Input 
              id="rating" 
              type="number" 
              min="1" 
              max="5" 
              step="0.1" 
              value={product.rating || 4.5} 
              onChange={(e) => onProductChange({...product, rating: parseFloat(e.target.value)})}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="reviewCount" className="text-sm font-medium">Review Count</label>
            <Input 
              id="reviewCount" 
              type="number" 
              min="0"
              value={product.reviewCount || 0} 
              onChange={(e) => onProductChange({...product, reviewCount: parseInt(e.target.value)})}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Features</label>
            <div className="flex gap-2">
              <Input 
                placeholder="Add a feature..." 
                value={newFeature} 
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
              />
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={handleAddFeature}
                className="shrink-0"
              >
                <Plus size={16} />
              </Button>
            </div>
            <div className="space-y-2 mt-2">
              {(product.features || []).map((feature, index) => (
                <div key={index} className="flex items-center justify-between bg-secondary/50 rounded-md px-3 py-2">
                  <span className="text-sm">{feature.name}</span>
                  <button 
                    type="button" 
                    onClick={() => handleRemoveFeature(index)} 
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              {(product.features || []).length === 0 && (
                <p className="text-sm text-muted-foreground">No features added yet. Add features to highlight product capabilities.</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Compatibility</label>
            <div className="flex gap-2">
              <Select
                value={selectedCompatibility}
                onValueChange={(value) => setSelectedCompatibility(value as ProductCompatibility)}
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
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={handleAddCompatibility}
                disabled={!selectedCompatibility}
                className="shrink-0"
              >
                <Plus size={16} />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {(product.compatibility || []).map((compatibility, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {compatibility}
                  <button 
                    type="button" 
                    onClick={() => handleRemoveCompatibility(compatibility)} 
                    className="ml-1 hover:text-destructive rounded-full"
                  >
                    <X size={14} />
                  </button>
                </Badge>
              ))}
              {(product.compatibility || []).length === 0 && (
                <p className="text-sm text-muted-foreground">No compatibility options added yet.</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="recommended" className="text-sm font-medium">Mark as Recommended</Label>
            <Switch 
              id="recommended" 
              checked={product.recommended || false} 
              onCheckedChange={(checked) => onProductChange({...product, recommended: checked})}
            />
          </div>
          
          {product.recommended && (
            <div className="space-y-2">
              <label htmlFor="recommendationReasons" className="text-sm font-medium">Recommendation Reasons</label>
              <div className="flex gap-2">
                <Input 
                  id="recommendationReason"
                  placeholder="e.g., Best value, Most reliable"
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.target as HTMLInputElement;
                      const reason = input.value.trim();
                      
                      if (reason) {
                        const updatedReasons = [...(product.recommendationReasons || []), reason];
                        onProductChange({...product, recommendationReasons: updatedReasons});
                        input.value = '';
                      }
                    }
                  }}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  className="shrink-0"
                  onClick={() => {
                    const input = document.getElementById('recommendationReason') as HTMLInputElement;
                    const reason = input.value.trim();
                    
                    if (reason) {
                      const updatedReasons = [...(product.recommendationReasons || []), reason];
                      onProductChange({...product, recommendationReasons: updatedReasons});
                      input.value = '';
                    }
                  }}
                >
                  <Plus size={16} />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {(product.recommendationReasons || []).map((reason, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {reason}
                    <button 
                      type="button" 
                      onClick={() => {
                        const updatedReasons = [...(product.recommendationReasons || [])];
                        updatedReasons.splice(index, 1);
                        onProductChange({...product, recommendationReasons: updatedReasons});
                      }} 
                      className="ml-1 hover:text-destructive rounded-full"
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
                {(product.recommendationReasons || []).length === 0 && product.recommended && (
                  <p className="text-sm text-muted-foreground">Add reasons why this product is recommended.</p>
                )}
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
            <p className="text-xs text-muted-foreground">The affiliate link provided for tracking referrals.</p>
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
              placeholder="e.g., 5.0"
              value={product.commissionRate || ''} 
              onChange={(e) => onProductChange({...product, commissionRate: parseFloat(e.target.value)})}
            />
            <p className="text-xs text-muted-foreground">The percentage you earn from each referral.</p>
          </div>
          
          <div className="space-y-2 pt-2">
            <label htmlFor="serviceProvider" className="text-sm font-medium">Service Provider</label>
            <Input 
              id="serviceProvider" 
              placeholder="e.g., Ring, ADT, Vivint"
              value={product.serviceProvider || ''} 
              onChange={(e) => onProductChange({...product, serviceProvider: e.target.value})}
            />
            <p className="text-xs text-muted-foreground">If this product is associated with a service provider.</p>
          </div>
        </TabsContent>
      </Tabs>
      
      <Button className="w-full mt-4" onClick={onSubmit}>{submitLabel}</Button>
    </div>
  );
};
