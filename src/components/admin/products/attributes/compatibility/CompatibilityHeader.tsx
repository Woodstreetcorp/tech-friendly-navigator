
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

interface CompatibilityHeaderProps {
  isAdding: boolean;
  onAddToggle: () => void;
}

export const CompatibilityHeader: React.FC<CompatibilityHeaderProps> = ({ isAdding, onAddToggle }) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-medium">Compatibility Options</h3>
      <Button onClick={onAddToggle} size="sm" className="flex items-center gap-1">
        {isAdding ? <X size={16} /> : <Plus size={16} />}
        {isAdding ? 'Cancel' : 'Add Option'}
      </Button>
    </div>
  );
};
