
import { Star, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SmartHomeProduct } from "@/data/smartHomeProducts";

interface ProductInfoProps {
  product: SmartHomeProduct;
  onCTAClick: () => void;
}

const ProductInfo = ({ product, onCTAClick }: ProductInfoProps) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">{product.brand}</span>
          <span className="mx-2">•</span>
          <span className="text-sm font-medium text-muted-foreground">{product.category}</span>
          {product.subCategory && (
            <>
              <span className="mx-2">•</span>
              <span className="text-sm font-medium text-muted-foreground">{product.subCategory}</span>
            </>
          )}
        </div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        
        <div className="flex items-center mb-4">
          <div className="flex items-center mr-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={18} 
                className={`${i < Math.floor(product.rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-300 fill-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="mx-1">•</span>
          <span className="text-sm text-muted-foreground">{product.reviewCount} reviews</span>
        </div>
        
        <p className="text-muted-foreground">{product.description}</p>
      </div>
      
      <div className="pt-4 border-t border-border">
        <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
      </div>
      
      {product.recommended && product.recommendationReasons && (
        <div className="flex flex-wrap gap-2">
          {product.recommendationReasons.map((reason, idx) => (
            <span 
              key={idx} 
              className="inline-flex items-center py-1 px-2 rounded-md text-xs font-medium bg-primary/10 text-primary"
            >
              <Check size={12} className="mr-1" />
              {reason}
            </span>
          ))}
        </div>
      )}
      
      <div className="pt-4">
        <Button 
          onClick={onCTAClick}
          className="w-full md:w-auto bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
        >
          <ExternalLink size={18} className="mr-2" />
          Get Best Deal
        </Button>
      </div>
      
      <div className="pt-4 border-t border-border">
        <h3 className="font-semibold mb-2">Compatible with</h3>
        <div className="flex flex-wrap gap-1">
          {product.compatibility.map((item, index) => (
            <span 
              key={index}
              className="inline-flex items-center py-1 px-2 rounded-md text-xs font-medium bg-secondary text-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
