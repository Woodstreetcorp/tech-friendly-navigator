
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface ProductBreadcrumbsProps {
  productName: string;
}

const ProductBreadcrumbs = ({ productName }: ProductBreadcrumbsProps) => {
  return (
    <div className="flex items-center mb-6 text-sm">
      <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
      <span className="mx-2">/</span>
      <Link to="/recommendations" className="text-muted-foreground hover:text-primary">Recommendations</Link>
      <span className="mx-2">/</span>
      <span className="text-foreground">{productName}</span>
    </div>
  );
};

export const ProductNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
      <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
      <Link to="/recommendations" className="btn-primary flex items-center">
        <ArrowLeft size={18} className="mr-2" />
        Browse Other Products
      </Link>
    </div>
  );
};

export default ProductBreadcrumbs;
