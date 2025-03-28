
import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
}

const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <div className="container-custom mb-6">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={onClick}
          className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft size={18} className="mr-1" />
          <span>Back</span>
        </button>
      </div>
    </div>
  );
};

export default BackButton;
