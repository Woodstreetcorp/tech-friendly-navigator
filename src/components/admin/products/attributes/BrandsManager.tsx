
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Plus, Save, X } from 'lucide-react';
import { toast } from 'sonner';

// Sample brands (in a real app, these would come from your backend)
const sampleBrands = [
  { id: 'brand1', name: 'Ring', slug: 'ring', description: 'Amazon-owned home security company' },
  { id: 'brand2', name: 'Nest', slug: 'nest', description: 'Google-owned smart home devices' },
  { id: 'brand3', name: 'Philips Hue', slug: 'philips-hue', description: 'Smart lighting systems' },
  { id: 'brand4', name: 'Ecobee', slug: 'ecobee', description: 'Smart thermostats and sensors' }
];

export const BrandsManager = () => {
  const [brands, setBrands] = useState(sampleBrands);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newBrand, setNewBrand] = useState({ name: '', description: '' });
  const [editForm, setEditForm] = useState({ name: '', slug: '', description: '' });
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToggle = () => {
    setIsAdding(!isAdding);
    setNewBrand({ name: '', description: '' });
  };

  const handleAddBrand = () => {
    if (!newBrand.name.trim()) {
      toast.error('Brand name is required');
      return;
    }

    const slug = newBrand.name.toLowerCase().replace(/\s+/g, '-');
    const newBrandWithId = {
      id: `brand${Date.now()}`,
      name: newBrand.name.trim(),
      slug,
      description: newBrand.description.trim()
    };

    setBrands([...brands, newBrandWithId]);
    setIsAdding(false);
    setNewBrand({ name: '', description: '' });
    toast.success('Brand added successfully');
  };

  const handleEditStart = (brand) => {
    setEditingId(brand.id);
    setEditForm({
      name: brand.name,
      slug: brand.slug,
      description: brand.description
    });
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };

  const handleEditSave = (id) => {
    if (!editForm.name.trim()) {
      toast.error('Brand name is required');
      return;
    }

    const updatedBrands = brands.map(brand => 
      brand.id === id 
        ? { 
            ...brand, 
            name: editForm.name.trim(),
            slug: editForm.slug.trim() || editForm.name.toLowerCase().replace(/\s+/g, '-'),
            description: editForm.description.trim()
          } 
        : brand
    );
    
    setBrands(updatedBrands);
    setEditingId(null);
    toast.success('Brand updated successfully');
  };

  const handleDeleteBrand = (id) => {
    if (confirm('Are you sure you want to delete this brand?')) {
      const updatedBrands = brands.filter(brand => brand.id !== id);
      setBrands(updatedBrands);
      toast.success('Brand deleted successfully');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Product Brands</h3>
        <Button onClick={handleAddToggle} size="sm" className="flex items-center gap-1">
          {isAdding ? <X size={16} /> : <Plus size={16} />}
          {isAdding ? 'Cancel' : 'Add Brand'}
        </Button>
      </div>

      {isAdding && (
        <div className="p-4 border rounded-md mb-4 bg-muted/30">
          <div className="grid gap-4 mb-4">
            <div>
              <label htmlFor="brandName" className="text-sm font-medium mb-1 block">Brand Name*</label>
              <Input
                id="brandName"
                value={newBrand.name}
                onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                placeholder="e.g., Philips Hue"
              />
            </div>
            <div>
              <label htmlFor="brandDescription" className="text-sm font-medium mb-1 block">Description</label>
              <Input
                id="brandDescription"
                value={newBrand.description}
                onChange={(e) => setNewBrand({ ...newBrand, description: e.target.value })}
                placeholder="Brief description of the brand"
              />
            </div>
          </div>
          <Button onClick={handleAddBrand} size="sm">Add Brand</Button>
        </div>
      )}

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brands.map((brand) => (
              <TableRow key={brand.id}>
                <TableCell>
                  {editingId === brand.id ? (
                    <Input
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="max-w-[200px]"
                    />
                  ) : (
                    brand.name
                  )}
                </TableCell>
                <TableCell>
                  {editingId === brand.id ? (
                    <Input
                      value={editForm.slug}
                      onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                      className="max-w-[200px]"
                      placeholder="auto-generated if empty"
                    />
                  ) : (
                    brand.slug
                  )}
                </TableCell>
                <TableCell>
                  {editingId === brand.id ? (
                    <Input
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="max-w-[300px]"
                    />
                  ) : (
                    brand.description
                  )}
                </TableCell>
                <TableCell>
                  {editingId === brand.id ? (
                    <div className="flex space-x-2">
                      <Button size="icon" variant="ghost" onClick={() => handleEditSave(brand.id)}>
                        <Save size={16} />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={handleEditCancel}>
                        <X size={16} />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <Button size="icon" variant="ghost" onClick={() => handleEditStart(brand)}>
                        <Pencil size={16} />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDeleteBrand(brand.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {brands.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                  No brands found. Add your first brand above.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
