
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { ProductForm } from './ProductForm';
import { SmartHomeProduct } from '@/data/smartHomeProducts';

interface AddProductDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newProduct: Partial<SmartHomeProduct>;
  onProductChange: (product: Partial<SmartHomeProduct>) => void;
  onAddProduct: () => void;
}

export const AddProductDialog = ({ 
  isOpen, 
  onOpenChange, 
  newProduct, 
  onProductChange, 
  onAddProduct 
}: AddProductDialogProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle size={16} />
          Add Product
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Add New Smart Home Product</SheetTitle>
        </SheetHeader>
        <ProductForm 
          product={newProduct} 
          onProductChange={onProductChange} 
          onSubmit={onAddProduct} 
          submitLabel="Add Product"
        />
      </SheetContent>
    </Sheet>
  );
};
