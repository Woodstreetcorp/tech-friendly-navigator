
import { Zap } from 'lucide-react';
import ProductCard from '../ProductCard';
import { SmartHomeProduct } from '@/data/smartHomeProducts';

interface TopPicksProps {
  topRecommendations: {
    product: SmartHomeProduct;
    score: number;
    matchReasons: string[];
  }[];
}

const TopPicks = ({ topRecommendations }: TopPicksProps) => {
  if (!topRecommendations || topRecommendations.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <Zap size={20} className="text-primary" />
        <h2 className="text-xl font-semibold">Top Picks for You</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topRecommendations.slice(0, 3).map((item) => {
          // Check if this product is a budget pick
          const isBudgetPick = item.product.priceRange === 'budget' || 
                            (item.matchReasons && item.matchReasons.includes('Budget Pick'));
          
          // Add budget pick to match reasons if applicable
          const matchReasons = isBudgetPick && !item.matchReasons.includes('Budget Pick') 
            ? [...item.matchReasons, 'Budget Pick'] 
            : item.matchReasons;
          
          return (
            <ProductCard 
              key={item.product.id} 
              product={item.product} 
              matchReasons={matchReasons.slice(0, 2)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TopPicks;
