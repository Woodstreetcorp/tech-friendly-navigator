
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PencilIcon, Trash2 } from 'lucide-react';
import { SmartHomeProduct } from '@/data/smartHomeProducts';

interface ProductListProps {
  products: SmartHomeProduct[];
  onEdit: (product: SmartHomeProduct) => void;
  onDelete: (id: string) => void;
}

export const ProductList = ({ products, onEdit, onDelete }: ProductListProps) => {
  return (
    <div className="rounded-md border mt-6 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                No products found. Add your first product to get started.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img src={product.featuredImage} alt={product.name} className="h-12 w-12 object-contain rounded" />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="capitalize">{product.category}</span>
                    <span className="text-xs text-muted-foreground capitalize">{product.subCategory.replace(/-/g, ' ')}</span>
                  </div>
                </TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="text-amber-500">★</span> {product.rating.toFixed(1)}
                    <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => onEdit(product)}
                    >
                      <PencilIcon size={16} />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="icon"
                      onClick={() => onDelete(product.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
