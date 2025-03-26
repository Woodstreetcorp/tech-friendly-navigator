
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PencilIcon, Trash2 } from 'lucide-react';

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

interface ProviderListProps {
  providers: Provider[];
  onEdit: (provider: Provider) => void;
  onDelete: (id: string) => void;
}

export const ProviderList = ({ providers, onEdit, onDelete }: ProviderListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Website</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {providers.map((provider) => (
          <TableRow key={provider.id}>
            <TableCell>
              <img src={provider.image} alt={provider.name} className="h-12 w-12 object-contain" />
            </TableCell>
            <TableCell className="font-medium">{provider.name}</TableCell>
            <TableCell>{provider.category}</TableCell>
            <TableCell>{provider.rating}</TableCell>
            <TableCell>
              <a 
                href={provider.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {provider.website.replace(/^https?:\/\//, '')}
              </a>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => onEdit(provider)}
                >
                  <PencilIcon size={16} />
                </Button>
                <Button 
                  variant="destructive" 
                  size="icon"
                  onClick={() => onDelete(provider.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
