
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusCircle, PencilIcon, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Products Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
            <div className="space-y-4 py-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name *</label>
                  <Input 
                    id="name" 
                    value={newProduct.name || ''} 
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">Category *</label>
                  <Input 
                    id="category" 
                    value={newProduct.category || ''} 
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="price" className="text-sm font-medium">Price *</label>
                  <Input 
                    id="price" 
                    type="number" 
                    value={newProduct.price || ''} 
                    onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
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
                    value={newProduct.rating || 5.0} 
                    onChange={(e) => setNewProduct({...newProduct, rating: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">Description</label>
                  <Input 
                    id="description" 
                    value={newProduct.description || ''} 
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  />
                </div>
              </div>
              <Button className="w-full" onClick={handleAddProduct}>Add Product</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <img src={product.image} alt={product.name} className="h-12 w-12 object-contain" />
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.rating}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => {
                      setCurrentProduct(product);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <PencilIcon size={16} />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="icon"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {currentProduct && (
            <div className="space-y-4 py-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-name" className="text-sm font-medium">Name *</label>
                  <Input 
                    id="edit-name" 
                    value={currentProduct.name} 
                    onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-category" className="text-sm font-medium">Category *</label>
                  <Input 
                    id="edit-category" 
                    value={currentProduct.category} 
                    onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-price" className="text-sm font-medium">Price *</label>
                  <Input 
                    id="edit-price" 
                    type="number" 
                    value={currentProduct.price} 
                    onChange={(e) => setCurrentProduct({...currentProduct, price: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-rating" className="text-sm font-medium">Rating (1-5)</label>
                  <Input 
                    id="edit-rating" 
                    type="number" 
                    min="1" 
                    max="5" 
                    step="0.1" 
                    value={currentProduct.rating} 
                    onChange={(e) => setCurrentProduct({...currentProduct, rating: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-description" className="text-sm font-medium">Description</label>
                  <Input 
                    id="edit-description" 
                    value={currentProduct.description} 
                    onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
                  />
                </div>
              </div>
              <Button className="w-full" onClick={handleEditProduct}>Save Changes</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
