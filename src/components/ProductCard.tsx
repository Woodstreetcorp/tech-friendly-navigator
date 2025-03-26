
import { Check } from 'lucide-react';

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  featuredImage: string;
  brand: string;
  features: string[];
  compatibility: string[];
  rating: number;
  reviewCount: number;
  recommended?: boolean;
};

type ProductCardProps = {
  product: Product;
  compact?: boolean;
};

const ProductCard = ({ product, compact = false }: ProductCardProps) => {
  const { name, category, description, price, featuredImage, brand, features, compatibility, rating, reviewCount, recommended } = product;

  if (compact) {
    return (
      <div className="glass-card card-hover overflow-hidden">
        <div className="relative">
          <div className="aspect-video w-full overflow-hidden">
            <img 
              src={featuredImage} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          {recommended && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center py-1 px-3 rounded-full text-xs font-medium bg-primary text-white">
                Recommended
              </span>
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="mb-3">
            <span className="text-xs font-medium text-muted-foreground">{brand} • {category}</span>
            <h3 className="text-lg font-medium mt-1 line-clamp-1">{name}</h3>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="font-semibold">${price.toFixed(2)}</span>
            <div className="flex items-center">
              <span className="flex items-center mr-1">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${i < Math.floor(rating) ? 'text-amber-500' : 'text-gray-200'}`}
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                  </svg>
                ))}
              </span>
              <span className="text-xs text-muted-foreground">({reviewCount})</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden flex flex-col">
      <div className="relative">
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={featuredImage} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        {recommended && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center py-1 px-3 rounded-full text-xs font-medium bg-primary text-white">
              Recommended
            </span>
          </div>
        )}
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-muted-foreground">{brand} • {category}</span>
            <div className="flex items-center">
              <span className="flex items-center mr-1">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${i < Math.floor(rating) ? 'text-amber-500' : 'text-gray-200'}`}
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                  </svg>
                ))}
              </span>
              <span className="text-sm text-muted-foreground">({reviewCount})</span>
            </div>
          </div>
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-muted-foreground mt-2 text-sm line-clamp-2">{description}</p>
        </div>
        
        <div className="space-y-4 flex-grow">
          <ul className="space-y-2">
            {features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check size={16} className="mr-2 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-2">
            <span className="text-sm font-medium">Compatible with:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {compatibility.map((item, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center py-0.5 px-2 rounded-md text-xs font-medium bg-secondary text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-border">
          <span className="text-xl font-semibold">${price.toFixed(2)}</span>
          <button className="py-2 px-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors text-sm">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
