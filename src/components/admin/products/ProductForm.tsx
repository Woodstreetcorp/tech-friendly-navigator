
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { X, Plus } from 'lucide-react';

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
};

interface ProductFormProps {
  product: Partial<Product>;
  onProductChange: (updatedProduct: Partial<Product>) => void;
  onSubmit: () => void;
  submitLabel: string;
}

export const ProductForm = ({ 
  product, 
  onProductChange, 
  onSubmit, 
  submitLabel 
}: ProductFormProps) => {
  const [newFeature, setNewFeature] = useState('');
  const [newCompatibility, setNewCompatibility] = useState('');
  const [newRecommendationReason, setNewRecommendationReason] = useState('');
  
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
  
  return (
    <div className="space-y-4 py-4">
      <div className="grid gap-4">
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
          <Input 
            id="category" 
            value={product.category || ''} 
            onChange={(e) => onProductChange({...product, category: e.target.value})}
          />
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
        
        {/* Recommended Switch */}
        <div className="flex items-center justify-between">
          <label htmlFor="recommended" className="text-sm font-medium">Mark as Recommended</label>
          <Switch 
            id="recommended" 
            checked={product.recommended || false} 
            onCheckedChange={(checked) => onProductChange({...product, recommended: checked})}
          />
        </div>
        
        {/* Features Section */}
        <div className="space-y-2 border-t pt-4 mt-2">
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
        
        {/* Compatibility Section */}
        <div className="space-y-2 border-t pt-4 mt-2">
          <label className="text-sm font-medium">Compatible With</label>
          <div className="flex gap-2">
            <Input 
              placeholder="Add compatibility..." 
              value={newCompatibility} 
              onChange={(e) => setNewCompatibility(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCompatibility())}
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
        
        {/* Recommendation Reasons Section (only shown if product is recommended) */}
        {product.recommended && (
          <div className="space-y-2 border-t pt-4 mt-2">
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
      </div>
      <Button className="w-full mt-4" onClick={onSubmit}>{submitLabel}</Button>
    </div>
  );
};
