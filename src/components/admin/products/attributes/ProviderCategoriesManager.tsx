
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Plus, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';

// Sample provider categories (in a real app, these would come from your backend)
const sampleProviderCategories = [
  { id: 'pcat1', name: 'Full Home Solution', slug: 'full-home-solution', description: 'Complete smart home installation and monitoring' },
  { id: 'pcat2', name: 'Security & Monitoring', slug: 'security-monitoring', description: 'Professional security monitoring services' },
  { id: 'pcat3', name: 'DIY Installation', slug: 'diy-installation', description: 'Self-installation smart home providers' },
  { id: 'pcat4', name: 'Home Automation', slug: 'home-automation', description: 'Specialized in home automation systems' }
];

export const ProviderCategoriesManager = () => {
  const [categories, setCategories] = useState(sampleProviderCategories);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editForm, setEditForm] = useState({ name: '', slug: '', description: '' });
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToggle = () => {
    setIsAdding(!isAdding);
    setNewCategory({ name: '', description: '' });
  };

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) {
      toast.error('Category name is required');
      return;
    }

    const slug = newCategory.name.toLowerCase().replace(/\s+/g, '-');
    const newCategoryWithId = {
      id: `pcat${Date.now()}`,
      name: newCategory.name.trim(),
      slug,
      description: newCategory.description.trim()
    };

    setCategories([...categories, newCategoryWithId]);
    setIsAdding(false);
    setNewCategory({ name: '', description: '' });
    toast.success('Provider category added successfully');
  };

  const handleEditStart = (category) => {
    setEditingId(category.id);
    setEditForm({
      name: category.name,
      slug: category.slug,
      description: category.description
    });
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };

  const handleEditSave = (id) => {
    if (!editForm.name.trim()) {
      toast.error('Category name is required');
      return;
    }

    const updatedCategories = categories.map(category => 
      category.id === id 
        ? { 
            ...category, 
            name: editForm.name.trim(),
            slug: editForm.slug.trim() || editForm.name.toLowerCase().replace(/\s+/g, '-'),
            description: editForm.description.trim()
          } 
        : category
    );
    
    setCategories(updatedCategories);
    setEditingId(null);
    toast.success('Provider category updated successfully');
  };

  const handleDeleteCategory = (id) => {
    if (confirm('Are you sure you want to delete this provider category?')) {
      const updatedCategories = categories.filter(category => category.id !== id);
      setCategories(updatedCategories);
      toast.success('Provider category deleted successfully');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Service Provider Categories</h3>
        <Button onClick={handleAddToggle} size="sm" className="flex items-center gap-1">
          {isAdding ? <X size={16} /> : <Plus size={16} />}
          {isAdding ? 'Cancel' : 'Add Category'}
        </Button>
      </div>

      {isAdding && (
        <div className="p-4 border rounded-md mb-4 bg-muted/30">
          <div className="grid gap-4 mb-4">
            <div>
              <label htmlFor="categoryName" className="text-sm font-medium mb-1 block">Category Name*</label>
              <Input
                id="categoryName"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder="e.g., Professional Installation"
              />
            </div>
            <div>
              <label htmlFor="categoryDescription" className="text-sm font-medium mb-1 block">Description</label>
              <Input
                id="categoryDescription"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                placeholder="Brief description of the provider category"
              />
            </div>
          </div>
          <Button onClick={handleAddCategory} size="sm">Add Provider Category</Button>
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
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  {editingId === category.id ? (
                    <Input
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="max-w-[200px]"
                    />
                  ) : (
                    category.name
                  )}
                </TableCell>
                <TableCell>
                  {editingId === category.id ? (
                    <Input
                      value={editForm.slug}
                      onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                      className="max-w-[200px]"
                      placeholder="auto-generated if empty"
                    />
                  ) : (
                    category.slug
                  )}
                </TableCell>
                <TableCell>
                  {editingId === category.id ? (
                    <Input
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="max-w-[300px]"
                    />
                  ) : (
                    category.description
                  )}
                </TableCell>
                <TableCell>
                  {editingId === category.id ? (
                    <div className="flex space-x-2">
                      <Button size="icon" variant="ghost" onClick={() => handleEditSave(category.id)}>
                        <Save size={16} />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={handleEditCancel}>
                        <X size={16} />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <Button size="icon" variant="ghost" onClick={() => handleEditStart(category)}>
                        <Pencil size={16} />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDeleteCategory(category.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {categories.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                  No provider categories found. Add your first category above.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
