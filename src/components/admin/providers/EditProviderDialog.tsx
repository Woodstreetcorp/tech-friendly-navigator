
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ProviderForm } from './ProviderForm';

type Provider = {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  description: string;
  website: string;
  contactEmail: string;
  features: string[];
  compatibility: string[];
  recommended: boolean;
  recommendationReasons: string[];
};

type Category = {
  id: string;
  name: string;
};

interface EditProviderDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentProvider: Provider | null;
  onProviderChange: (provider: Provider | null) => void;
  onEditProvider: () => void;
  categories?: Category[];
}

export const EditProviderDialog = ({
  isOpen,
  onOpenChange,
  currentProvider,
  onProviderChange,
  onEditProvider,
  categories = []
}: EditProviderDialogProps) => {
  if (!currentProvider) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Service Provider</DialogTitle>
        </DialogHeader>
        <ProviderForm
          provider={currentProvider}
          onProviderChange={(updatedProvider) => onProviderChange({...currentProvider, ...updatedProvider})}
          onSubmit={onEditProvider}
          submitLabel="Save Changes"
          categories={categories}
        />
      </DialogContent>
    </Dialog>
  );
};
