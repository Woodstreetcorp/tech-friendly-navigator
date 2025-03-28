
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { AddProductDialog } from './products/AddProductDialog';
import { EditProductDialog } from './products/EditProductDialog';
import { ProductList } from './products/ProductList';
import { SmartHomeProduct } from '@/data/smartHomeProducts';
import TopPicksManager from './recommendations/TopPicksManager';
import BudgetPicksManager from './recommendations/BudgetPicksManager';

export function ProductsManager() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [currentProduct, setCurrentProduct] = useState<SmartHomeProduct | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<SmartHomeProduct>>({
    id: '',
    name: '',
    category: 'security',
    subCategory: 'alarm-systems',
    brand: '',
    description: '',
    price: 0,
    priceRange: 'mid-range',
    featuredImage: '/placeholder.svg',
    features: [{ name: '' }],
    compatibility: [],
    rating: 4.5,
    reviewCount: 0,
    installationType: 'DIY',
    contractRequired: false,
    monthlySubscriptionRequired: false
  });
  
  const [products, setProducts] = useState<SmartHomeProduct[]>([]);

  const handleAddProduct = () => {
    if (newProduct.id && newProduct.name) {
      // Add the product to the list
      setProducts(prev => [...prev, newProduct as SmartHomeProduct]);
      setIsAddDialogOpen(false);
      setNewProduct({
        id: '',
        name: '',
        category: 'security',
        subCategory: 'alarm-systems',
        brand: '',
        description: '',
        price: 0,
        priceRange: 'mid-range',
        featuredImage: '/placeholder.svg',
        features: [{ name: '' }],
        compatibility: [],
        rating: 4.5,
        reviewCount: 0,
        installationType: 'DIY',
        contractRequired: false,
        monthlySubscriptionRequired: false
      });
    }
  };

  const handleEditProduct = () => {
    if (currentProduct) {
      setProducts(prev => prev.map(product => 
        product.id === currentProduct.id ? currentProduct : product
      ));
      setCurrentProductId(null);
      setCurrentProduct(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleEditClick = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setCurrentProductId(productId);
      setCurrentProduct(product);
      setIsEditDialogOpen(true);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Products Management</h3>
        <p className="text-sm text-muted-foreground">
          Manage your smart home products inventory and recommendations
        </p>
      </div>
      <Separator />
      
      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="top-picks">Top Picks</TabsTrigger>
          <TabsTrigger value="budget-picks">Budget Picks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">All Products</h3>
            <AddProductDialog 
              isOpen={isAddDialogOpen}
              onOpenChange={setIsAddDialogOpen}
              newProduct={newProduct}
              onProductChange={setNewProduct as any}
              onAddProduct={handleAddProduct}
            />
          </div>
          
          <ProductList 
            products={products}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteProduct}
          />
          
          <EditProductDialog 
            isOpen={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            currentProduct={currentProduct}
            onProductChange={setCurrentProduct as any}
            onEditProduct={handleEditProduct}
          />
        </TabsContent>
        
        <TabsContent value="top-picks">
          <TopPicksManager />
        </TabsContent>
        
        <TabsContent value="budget-picks">
          <BudgetPicksManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProductsManager;
