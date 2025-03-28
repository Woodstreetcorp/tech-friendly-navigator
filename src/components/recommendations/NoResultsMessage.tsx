
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoResultsMessageProps {
  onResetFilters: () => void;
}

export const NoResultsMessage = ({ onResetFilters }: NoResultsMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertTriangle size={48} className="text-yellow-500 mb-4" />
      <h3 className="text-xl font-semibold mb-2">No products match your filters</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        Try adjusting your filters to see more products or reset them to see all recommendations.
      </p>
      <Button 
        variant="outline" 
        onClick={onResetFilters}
      >
        Reset Filters
      </Button>
    </div>
  );
};
