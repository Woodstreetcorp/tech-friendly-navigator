
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
};

interface EditProviderDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentProvider: Provider | null;
  onProviderChange: (provider: Provider) => void;
  onEditProvider: () => void;
}

export const EditProviderDialog = ({
  isOpen,
  onOpenChange,
  currentProvider,
  onProviderChange,
  onEditProvider
}: EditProviderDialogProps) => {
  if (!currentProvider) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Service Provider</DialogTitle>
        </DialogHeader>
        <ProviderForm
          provider={currentProvider}
          onProviderChange={onProviderChange}
          onSubmit={onEditProvider}
          submitLabel="Save Changes"
        />
      </DialogContent>
    </Dialog>
  );
};
