
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle size={16} />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <ProductForm 
          product={newProduct} 
          onProductChange={onProductChange} 
          onSubmit={onAddProduct} 
          submitLabel="Add Product"
        />
      </DialogContent>
    </Dialog>
  );
};
