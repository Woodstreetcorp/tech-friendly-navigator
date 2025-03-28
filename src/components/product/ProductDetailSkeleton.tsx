
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

const ProductDetailSkeleton = () => {
  return (
    <div className="container-custom py-10">
      <div className="flex items-center mb-6 text-sm">
        <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/recommendations" className="text-muted-foreground hover:text-primary">Recommendations</Link>
        <span className="mx-2">/</span>
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <div className="glass-card p-6 flex items-center justify-center">
          <Skeleton className="h-80 w-full rounded-lg" />
        </div>
        <div className="space-y-6">
          <div>
            <Skeleton className="h-4 w-1/4 mb-2" />
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-20 w-full" />
          </div>
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-12 w-40" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
