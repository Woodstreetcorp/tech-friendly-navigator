
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ProductForm } from './ProductForm';
import { SmartHomeProduct } from '@/data/smartHomeProducts';

interface EditProductDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentProduct: SmartHomeProduct | null;
  onProductChange: (product: SmartHomeProduct) => void;
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
          <SheetTitle>Edit Smart Home Product</SheetTitle>
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
