
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
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
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Edit Service Provider</SheetTitle>
        </SheetHeader>
        <ProviderForm
          provider={currentProvider}
          onProviderChange={(updatedProvider) => onProviderChange({...currentProvider, ...updatedProvider})}
          onSubmit={onEditProvider}
          submitLabel="Save Changes"
          categories={categories}
        />
      </SheetContent>
    </Sheet>
  );
};
