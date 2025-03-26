
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
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
  features?: string[];
  compatibility?: string[];
  recommended?: boolean;
  recommendationReasons?: string[];
};

type Category = {
  id: string;
  name: string;
};

interface AddProviderDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newProvider: Partial<Provider>;
  onProviderChange: (provider: Partial<Provider>) => void;
  onAddProvider: () => void;
  categories?: Category[];
}

export const AddProviderDialog = ({
  isOpen,
  onOpenChange,
  newProvider,
  onProviderChange,
  onAddProvider,
  categories = []
}: AddProviderDialogProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle size={16} />
          Add Provider
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Add New Service Provider</SheetTitle>
        </SheetHeader>
        <ProviderForm
          provider={newProvider}
          onProviderChange={onProviderChange}
          onSubmit={onAddProvider}
          submitLabel="Add Provider"
          categories={categories}
        />
      </SheetContent>
    </Sheet>
  );
};
