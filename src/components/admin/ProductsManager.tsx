
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductList } from './products/ProductList';
import { AddProductDialog } from './products/AddProductDialog';
import { EditProductDialog } from './products/EditProductDialog';
import { AttributeManager } from './products/attributes/AttributeManager';
import { SmartHomeProduct, ProductCategory, ProductSubCategory, allSmartHomeProducts } from '@/data/smartHomeProducts';

// Initial empty product template
const emptyProduct: Partial<SmartHomeProduct> = {
  name: '',
  brand: '',
  category: 'security',
  subCategory: 'alarm-systems',
  description: '',
  price: 0,
  priceRange: 'mid-range',
  featuredImage: '/placeholder.svg',
  installationType: 'DIY',
  contractRequired: false,
  monthlySubscriptionRequired: false,
  features: [],
  compatibility: [],
  rating: 4.5,
  reviewCount: 0
};

export const ProductsManager = () => {
  const [products, setProducts] = useState<SmartHomeProduct[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<SmartHomeProduct | null>(null);
  const [activeTab, setActiveTab] = useState('products');
  const [newProduct, setNewProduct] = useState<Partial<SmartHomeProduct>>(emptyProduct);
  const [showOnlyCustomProducts, setShowOnlyCustomProducts] = useState(false);

  // Load products from localStorage or initialize with empty array
  useEffect(() => {
    const storedProducts = localStorage.getItem('smart_home_products');
    if (storedProducts) {
      try {
        setProducts(JSON.parse(storedProducts));
      } catch (error) {
        console.error('Error parsing stored products:', error);
        initializeWithSampleProducts();
      }
    } else {
      initializeWithSampleProducts();
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('smart_home_products', JSON.stringify(products));
      
      // Important: Update the allSmartHomeProducts array with our custom products
      // This ensures products added in admin are visible on the frontend
      const defaultProducts = allSmartHomeProducts.filter(p => 
        !products.some(customProduct => customProduct.id === p.id)
      );
      
      // Merge default products with custom products
      const mergedProducts = [...defaultProducts, ...products];
      
      // Replace the content of allSmartHomeProducts with merged products
      // This is a hack to make sure new products show on frontend
      Object.assign(allSmartHomeProducts, []);
      allSmartHomeProducts.push(...mergedProducts);
      
      console.log(`Updated products store with ${products.length} products`);
      console.log(`Total products available: ${allSmartHomeProducts.length}`);
    }
  }, [products]);

  const initializeWithSampleProducts = () => {
    // Sample products for initial setup
    const sampleProducts: SmartHomeProduct[] = [
      {
        id: 'prod1',
        name: 'Ring Video Doorbell 4',
        brand: 'Ring',
        category: 'security',
        subCategory: 'video-doorbells',
        description: 'Advanced security with color video preview and improved motion detection.',
        price: 199.99,
        priceRange: 'mid-range',
        featuredImage: '/placeholder.svg',
        installationType: 'DIY',
        contractRequired: false,
        monthlySubscriptionRequired: false,
        features: [{ name: 'Color video preview' }, { name: 'Improved motion detection' }],
        compatibility: ['Alexa', 'Google Assistant'],
        rating: 4.7,
        reviewCount: 1200
      },
      {
        id: 'prod2',
        name: 'Nest Learning Thermostat',
        brand: 'Google Nest',
        category: 'climate',
        subCategory: 'thermostats',
        description: 'Smart thermostat that learns your schedule and programs itself.',
        price: 249.99,
        priceRange: 'premium',
        featuredImage: '/placeholder.svg',
        installationType: 'DIY',
        contractRequired: false,
        monthlySubscriptionRequired: false,
        features: [{ name: 'Auto-scheduling' }, { name: 'Energy history' }],
        compatibility: ['Google Assistant', 'Alexa'],
        rating: 4.9,
        reviewCount: 2500
      }
    ];
    
    setProducts(sampleProducts);
    localStorage.setItem('smart_home_products', JSON.stringify(sampleProducts));
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.subCategory) {
      toast.error('Please fill in all required fields');
      return;
    }

    const productToAdd = {
      ...newProduct,
      id: `prod${Date.now()}`,
      rating: Number(newProduct.rating) || 4.5,
      reviewCount: Number(newProduct.reviewCount) || 0,
      features: newProduct.features || [],
      compatibility: newProduct.compatibility || [],
    } as SmartHomeProduct;

    setProducts([...products, productToAdd]);
    setNewProduct(emptyProduct);
    setIsAddDialogOpen(false);
    
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
    
    toast.success('Product updated successfully');
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
      
      toast.success('Product deleted successfully');
    }
  };

  const toggleFilter = () => {
    setShowOnlyCustomProducts(!showOnlyCustomProducts);
  };

  // Get products to display based on filter
  const getDisplayProducts = () => {
    if (showOnlyCustomProducts) {
      return products;
    }
    
    // Return products from the allSmartHomeProducts array
    return allSmartHomeProducts;
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
            <div>
              <h2 className="text-2xl font-bold">Smart Home Products Management</h2>
              <div className="flex items-center mt-2">
                <label htmlFor="toggle-filter" className="mr-2 text-sm text-muted-foreground">
                  Show only custom products:
                </label>
                <input 
                  type="checkbox" 
                  id="toggle-filter" 
                  checked={showOnlyCustomProducts} 
                  onChange={toggleFilter}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
            </div>
            <AddProductDialog 
              isOpen={isAddDialogOpen}
              onOpenChange={setIsAddDialogOpen}
              newProduct={newProduct}
              onProductChange={setNewProduct}
              onAddProduct={handleAddProduct}
            />
          </div>

          <ProductList 
            products={getDisplayProducts()}
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
