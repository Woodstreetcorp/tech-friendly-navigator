
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductList } from './products/ProductList';
import { AddProductDialog } from './products/AddProductDialog';
import { EditProductDialog } from './products/EditProductDialog';
import { AttributeManager } from './products/attributes/AttributeManager';

// Sample products data (in a real app, this would come from your backend)
const sampleProducts = [
  {
    id: 'prod1',
    name: 'Ring Video Doorbell 4',
    category: 'Security',
    image: '/placeholder.svg',
    rating: 4.7,
    price: 199.99,
    description: 'Advanced security with color video preview and improved motion detection.'
  },
  {
    id: 'prod2',
    name: 'Nest Learning Thermostat',
    category: 'Climate Control',
    image: '/placeholder.svg',
    rating: 4.9,
    price: 249.99,
    description: 'Smart thermostat that learns your schedule and programs itself.'
  },
  {
    id: 'prod3',
    name: 'Philips Hue Starter Kit',
    category: 'Lighting',
    image: '/placeholder.svg',
    rating: 4.5,
    price: 179.99,
    description: 'Smart lighting system with voice control and custom scenes.'
  },
  {
    id: 'prod4',
    name: 'Amazon Echo Show 10',
    category: 'Smart Speakers',
    image: '/placeholder.svg',
    rating: 4.6,
    price: 249.99,
    description: 'Smart display with motion tracking and premium sound.'
  }
];

type Product = typeof sampleProducts[0];

export const ProductsManager = () => {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState('products');
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: '',
    price: 0,
    rating: 5.0,
    description: '',
    image: '/placeholder.svg'
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    const productToAdd = {
      ...newProduct,
      id: `prod${Date.now()}`,
      name: newProduct.name || '',
      category: newProduct.category || '',
      price: Number(newProduct.price) || 0,
      rating: Number(newProduct.rating) || 5.0,
      image: newProduct.image || '/placeholder.svg',
      description: newProduct.description || ''
    } as Product;

    setProducts([...products, productToAdd]);
    setNewProduct({
      name: '',
      category: '',
      price: 0,
      rating: 5.0,
      description: '',
      image: '/placeholder.svg'
    });
    setIsAddDialogOpen(false);
    
    // In a real app, you'd make an API call to save the product
    toast.success('Product added successfully');
  };

  const handleEditProduct = () => {
    if (!currentProduct || !currentProduct.name || !currentProduct.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    const updatedProducts = products.map(product => 
      product.id === currentProduct.id ? currentProduct : product
    );
    
    setProducts(updatedProducts);
    setIsEditDialogOpen(false);
    
    // In a real app, you'd make an API call to update the product
    toast.success('Product updated successfully');
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
      
      // In a real app, you'd make an API call to delete the product
      toast.success('Product deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="attributes">Attributes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Products Management</h2>
            <AddProductDialog 
              isOpen={isAddDialogOpen}
              onOpenChange={setIsAddDialogOpen}
              newProduct={newProduct}
              onProductChange={setNewProduct}
              onAddProduct={handleAddProduct}
            />
          </div>

          <ProductList 
            products={products}
            onEdit={(product) => {
              setCurrentProduct(product);
              setIsEditDialogOpen(true);
            }}
            onDelete={handleDeleteProduct}
          />

          <EditProductDialog 
            isOpen={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            currentProduct={currentProduct}
            onProductChange={setCurrentProduct}
            onEditProduct={handleEditProduct}
          />
        </TabsContent>
        
        <TabsContent value="attributes" className="pt-4">
          <AttributeManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};
