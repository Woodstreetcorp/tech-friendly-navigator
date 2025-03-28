
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoResultsMessageProps {
  onResetFilters: () => void;
}

export const NoResultsMessage = ({ onResetFilters }: NoResultsMessageProps) => {
  const handleReset = () => {
    // Clear localStorage if there might be corrupted data
    if (window.confirm('Would you like to clear all recommendation data and start fresh? This can help if you\'re experiencing issues.')) {
      localStorage.removeItem('smartHomeRecommendations');
      window.location.reload();
    } else {
      // Just reset filters
      onResetFilters();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertTriangle size={48} className="text-yellow-500 mb-4" />
      <h3 className="text-xl font-semibold mb-2">No products match your filters</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        Try adjusting your filters to see more products or reset them to see all recommendations.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          variant="outline" 
          onClick={onResetFilters}
          className="flex items-center gap-2"
        >
          <RefreshCw size={16} />
          Reset Filters
        </Button>
        <Button 
          variant="default"
          onClick={handleReset}
        >
          Clear All Data & Start Fresh
        </Button>
      </div>
    </div>
  );
};
