
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  price: number;
  description: string;
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
          <Input 
            id="description" 
            value={product.description || ''} 
            onChange={(e) => onProductChange({...product, description: e.target.value})}
          />
        </div>
      </div>
      <Button className="w-full" onClick={onSubmit}>{submitLabel}</Button>
    </div>
  );
};
