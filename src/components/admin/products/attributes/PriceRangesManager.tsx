
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Plus, Save, X } from 'lucide-react';
import { toast } from 'sonner';

// Sample price ranges (in a real app, these would come from your backend)
const samplePriceRanges = [
  { id: 'price1', name: 'Under $100', min: 0, max: 100, displayName: 'Budget Friendly' },
  { id: 'price2', name: '$100 - $200', min: 100, max: 200, displayName: 'Mid-Range' },
  { id: 'price3', name: '$200 - $500', min: 200, max: 500, displayName: 'Premium' },
  { id: 'price4', name: 'Over $500', min: 500, max: 10000, displayName: 'Luxury' }
];

export const PriceRangesManager = () => {
  const [priceRanges, setPriceRanges] = useState(samplePriceRanges);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newPriceRange, setNewPriceRange] = useState({ name: '', min: 0, max: 100, displayName: '' });
  const [editForm, setEditForm] = useState({ name: '', min: 0, max: 0, displayName: '' });
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToggle = () => {
    setIsAdding(!isAdding);
    setNewPriceRange({ name: '', min: 0, max: 100, displayName: '' });
  };

  const handleAddPriceRange = () => {
    if (!newPriceRange.name.trim()) {
      toast.error('Price range name is required');
      return;
    }

    if (newPriceRange.min >= newPriceRange.max) {
      toast.error('Maximum price must be greater than minimum price');
      return;
    }

    const newPriceRangeWithId = {
      id: `price${Date.now()}`,
      name: newPriceRange.name.trim(),
      min: Number(newPriceRange.min),
      max: Number(newPriceRange.max),
      displayName: newPriceRange.displayName.trim() || newPriceRange.name.trim()
    };

    setPriceRanges([...priceRanges, newPriceRangeWithId]);
    setIsAdding(false);
    setNewPriceRange({ name: '', min: 0, max: 100, displayName: '' });
    toast.success('Price range added successfully');
  };

  const handleEditStart = (priceRange) => {
    setEditingId(priceRange.id);
    setEditForm({
      name: priceRange.name,
      min: priceRange.min,
      max: priceRange.max,
      displayName: priceRange.displayName
    });
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };

  const handleEditSave = (id) => {
    if (!editForm.name.trim()) {
      toast.error('Price range name is required');
      return;
    }

    if (editForm.min >= editForm.max) {
      toast.error('Maximum price must be greater than minimum price');
      return;
    }

    const updatedPriceRanges = priceRanges.map(priceRange => 
      priceRange.id === id 
        ? { 
            ...priceRange, 
            name: editForm.name.trim(),
            min: Number(editForm.min),
            max: Number(editForm.max),
            displayName: editForm.displayName.trim() || editForm.name.trim()
          } 
        : priceRange
    );
    
    setPriceRanges(updatedPriceRanges);
    setEditingId(null);
    toast.success('Price range updated successfully');
  };

  const handleDeletePriceRange = (id) => {
    if (confirm('Are you sure you want to delete this price range?')) {
      const updatedPriceRanges = priceRanges.filter(priceRange => priceRange.id !== id);
      setPriceRanges(updatedPriceRanges);
      toast.success('Price range deleted successfully');
    }
  };

  // Format price for display
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Price Ranges</h3>
        <Button onClick={handleAddToggle} size="sm" className="flex items-center gap-1">
          {isAdding ? <X size={16} /> : <Plus size={16} />}
          {isAdding ? 'Cancel' : 'Add Price Range'}
        </Button>
      </div>

      {isAdding && (
        <div className="p-4 border rounded-md mb-4 bg-muted/30">
          <div className="grid gap-4 mb-4">
            <div>
              <label htmlFor="rangeName" className="text-sm font-medium mb-1 block">Range Name*</label>
              <Input
                id="rangeName"
                value={newPriceRange.name}
                onChange={(e) => setNewPriceRange({ ...newPriceRange, name: e.target.value })}
                placeholder="e.g., $100 - $200"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="minPrice" className="text-sm font-medium mb-1 block">Minimum Price ($)</label>
                <Input
                  id="minPrice"
                  type="number"
                  value={newPriceRange.min}
                  onChange={(e) => setNewPriceRange({ ...newPriceRange, min: Number(e.target.value) })}
                  min="0"
                />
              </div>
              <div>
                <label htmlFor="maxPrice" className="text-sm font-medium mb-1 block">Maximum Price ($)</label>
                <Input
                  id="maxPrice"
                  type="number"
                  value={newPriceRange.max}
                  onChange={(e) => setNewPriceRange({ ...newPriceRange, max: Number(e.target.value) })}
                  min={newPriceRange.min + 1}
                />
              </div>
            </div>
            <div>
              <label htmlFor="displayName" className="text-sm font-medium mb-1 block">Display Name (optional)</label>
              <Input
                id="displayName"
                value={newPriceRange.displayName}
                onChange={(e) => setNewPriceRange({ ...newPriceRange, displayName: e.target.value })}
                placeholder="e.g., Budget Friendly"
              />
            </div>
          </div>
          <Button onClick={handleAddPriceRange} size="sm">Add Price Range</Button>
        </div>
      )}

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Min</TableHead>
              <TableHead>Max</TableHead>
              <TableHead>Display Name</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {priceRanges.map((priceRange) => (
              <TableRow key={priceRange.id}>
                <TableCell>
                  {editingId === priceRange.id ? (
                    <Input
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="max-w-[200px]"
                    />
                  ) : (
                    priceRange.name
                  )}
                </TableCell>
                <TableCell>
                  {editingId === priceRange.id ? (
                    <Input
                      type="number"
                      value={editForm.min}
                      onChange={(e) => setEditForm({ ...editForm, min: Number(e.target.value) })}
                      className="max-w-[100px]"
                      min="0"
                    />
                  ) : (
                    formatPrice(priceRange.min)
                  )}
                </TableCell>
                <TableCell>
                  {editingId === priceRange.id ? (
                    <Input
                      type="number"
                      value={editForm.max}
                      onChange={(e) => setEditForm({ ...editForm, max: Number(e.target.value) })}
                      className="max-w-[100px]"
                      min={editForm.min + 1}
                    />
                  ) : (
                    formatPrice(priceRange.max)
                  )}
                </TableCell>
                <TableCell>
                  {editingId === priceRange.id ? (
                    <Input
                      value={editForm.displayName}
                      onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                      className="max-w-[200px]"
                      placeholder="Optional display name"
                    />
                  ) : (
                    priceRange.displayName
                  )}
                </TableCell>
                <TableCell>
                  {editingId === priceRange.id ? (
                    <div className="flex space-x-2">
                      <Button size="icon" variant="ghost" onClick={() => handleEditSave(priceRange.id)}>
                        <Save size={16} />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={handleEditCancel}>
                        <X size={16} />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <Button size="icon" variant="ghost" onClick={() => handleEditStart(priceRange)}>
                        <Pencil size={16} />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDeletePriceRange(priceRange.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {priceRanges.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                  No price ranges found. Add your first price range above.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
