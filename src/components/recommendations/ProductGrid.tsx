
import ProductCard from '../ProductCard';
import { SmartHomeProduct } from '@/data/smartHomeProducts';

interface ProductGridProps {
  products: {
    product: SmartHomeProduct;
    score: number;
    matchReasons: string[];
  }[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  // Check if products array exists and has valid items
  if (!products || !Array.isArray(products) || products.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        No products available. Try different filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((item, index) => {
        // Skip rendering if product data is invalid
        if (!item || !item.product) {
          console.log('Skipping invalid product item:', item);
          return null;
        }
        
        return (
          <ProductCard 
            key={item.product.id || `product-${index}`}
            product={item.product} 
            matchReasons={item.matchReasons?.slice(0, 2) || []}
          />
        );
      })}
    </div>
  );
};

export default ProductGrid;
