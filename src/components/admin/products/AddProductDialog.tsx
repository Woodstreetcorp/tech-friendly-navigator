
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { ProductForm } from './ProductForm';

type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  price: number;
  description: string;
};

interface AddProductDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newProduct: Partial<Product>;
  onProductChange: (product: Partial<Product>) => void;
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
          <SheetTitle>Add New Product</SheetTitle>
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
