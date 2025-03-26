
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
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
  brand?: string;
  affiliateUrl?: string;
  commissionRate?: number;
  affiliateId?: string;
  serviceProvider?: string;
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
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Edit Product</SheetTitle>
        </SheetHeader>
        <ProductForm 
          product={currentProduct} 
          onProductChange={onProductChange} 
          onSubmit={onEditProduct} 
          submitLabel="Save Changes"
        />
      </SheetContent>
    </Sheet>
  );
};
