
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ProductForm } from './ProductForm';

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

interface EditProductDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentProduct: Product | null;
  onProductChange: (product: Product) => void;
  onEditProduct: () => void;
}

export const EditProductDialog = ({
  isOpen,
  onOpenChange,
  currentProduct,
  onProductChange,
  onEditProduct
}: EditProductDialogProps) => {
  if (!currentProduct) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <ProductForm 
          product={currentProduct} 
          onProductChange={onProductChange} 
          onSubmit={onEditProduct} 
          submitLabel="Save Changes"
        />
      </DialogContent>
    </Dialog>
  );
};
