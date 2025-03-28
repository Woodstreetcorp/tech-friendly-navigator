
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, Info, Shield, ExternalLink, Star as StarIcon, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';
import { SmartHomeProduct } from '@/data/smartHomeProducts';
import UserInfoForm from '@/components/UserInfoForm';

export type Product = SmartHomeProduct;

interface ProductCardProps {
  product: Product;
  showReasons?: boolean;
  showActions?: boolean;
  size?: 'small' | 'medium' | 'large';
  matchReasons?: string[];
}

const ProductCard = ({ 
  product, 
  showReasons = true, 
  showActions = true, 
  size = 'medium',
  matchReasons = []
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showUserInfoForm, setShowUserInfoForm] = useState(false);
  const { trackEvent } = useUser();
  
  const handleTrackClick = () => {
    if (!product) return;
    
    trackEvent({
      eventType: 'product_click',
      productId: product.id,
      productName: product.name,
      source: 'product_card',
      url: product.affiliateUrl || '',
    });
    
    // Show the user info form instead of direct navigation
    setShowUserInfoForm(true);
  };
  
  const handleUserFormComplete = () => {
    setShowUserInfoForm(false);
    
    toast.success(`Thanks for your interest in ${product.name}!`);
    
    // Open affiliate URL in new tab after form completion
    if (product.affiliateUrl) {
      window.open(product.affiliateUrl, '_blank');
    }
  };
  
  const sizeClasses = {
    small: 'max-w-[240px]',
    medium: 'max-w-sm',
    large: 'max-w-md'
  };
  
  if (!product) return null;
  
  return (
    <div 
      className={`glass-card group rounded-lg overflow-hidden transition duration-300 ${sizeClasses[size]} ${isHovered ? 'shadow-lg transform -translate-y-1' : 'shadow'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.featuredImage} 
            alt={product.name}
            className="w-full h-48 object-contain bg-secondary/30 p-4 transition duration-300 transform group-hover:scale-105"
          />
        </Link>
        
        {product.recommended && (
          <div className="absolute top-2 right-2 bg-primary/90 text-white px-2 py-1 rounded text-xs font-medium">
            Recommended
          </div>
        )}
        
        {product.priceRange === 'budget' && (
          <div className="absolute top-2 left-2 bg-emerald-500/90 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
            <Zap size={12} className="mr-1" /> Budget Pick
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-muted-foreground">
              {product.brand} • {product.category}
            </span>
            <div className="flex items-center">
              <StarIcon size={14} className="text-amber-500 fill-amber-500 mr-1" />
              <span className="text-xs font-medium">{product.rating}</span>
            </div>
          </div>
          
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-semibold text-lg mb-1 transition-colors group-hover:text-primary">{product.name}</h3>
          </Link>
          
          <div className="flex items-baseline mb-3">
            <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
            {product.monthlySubscription && (
              <span className="ml-2 text-xs text-muted-foreground">
                + ${product.monthlySubscription.toFixed(2)}/mo
                {product.monthlySubscriptionRequired ? ' (required)' : ' (optional)'}
              </span>
            )}
          </div>
        </div>
        
        {(matchReasons.length > 0 || (showReasons && product.recommendationReasons?.length)) && (
          <div className="mb-3">
            {matchReasons.length > 0 ? (
              <div className="flex flex-wrap gap-1 mb-2">
                {matchReasons.slice(0, 2).map((reason, idx) => (
                  <div key={idx} className="flex items-center bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    <Check size={10} className="mr-1" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            ) : showReasons && product.recommendationReasons ? (
              <div className="flex flex-wrap gap-1 mb-2">
                {product.recommendationReasons.slice(0, 2).map((reason, idx) => (
                  <div key={idx} className="flex items-center bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    <Check size={10} className="mr-1" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}
        
        {size !== 'small' && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {product.description}
          </p>
        )}
        
        {size !== 'small' && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {product.compatibility.slice(0, 3).map((comp, index) => (
                <Badge 
                  key={index}
                  variant="outline" 
                  className="text-xs bg-secondary/50"
                >
                  {comp}
                </Badge>
              ))}
              {product.compatibility.length > 3 && (
                <Badge 
                  variant="outline" 
                  className="text-xs bg-secondary/50"
                >
                  +{product.compatibility.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}
        
        {showActions && (
          <div className="flex gap-2 mt-auto">
            <Link to={`/product/${product.id}`} className="flex-1">
              <Button 
                variant="outline" 
                className="w-full"
              >
                <Info size={16} className="mr-2" />
                Details
              </Button>
            </Link>
            
            <Button 
              className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white"
              onClick={handleTrackClick}
            >
              <ExternalLink size={16} className="mr-2" />
              Get Best Deal
            </Button>
          </div>
        )}
      </div>
      
      {showUserInfoForm && (
        <UserInfoForm
          onClose={() => setShowUserInfoForm(false)}
          onComplete={handleUserFormComplete}
          productName={product.name}
          affiliateUrl={product.affiliateUrl}
        />
      )}
    </div>
  );
};

export default ProductCard;
