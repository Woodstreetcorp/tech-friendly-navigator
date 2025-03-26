
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle size={16} />
          Add Provider
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Service Provider</DialogTitle>
        </DialogHeader>
        <ProviderForm
          provider={newProvider}
          onProviderChange={onProviderChange}
          onSubmit={onAddProvider}
          submitLabel="Add Provider"
          categories={categories}
        />
      </DialogContent>
    </Dialog>
  );
};
