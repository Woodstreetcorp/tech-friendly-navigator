
import ProductCard from '../ProductCard';

interface ProductGridProps {
  products: {
    product: any;
    score: number;
    matchReasons: string[];
  }[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((item) => (
        <ProductCard 
          key={item.product.id} 
          product={item.product} 
          matchReasons={item.matchReasons.slice(0, 2)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
