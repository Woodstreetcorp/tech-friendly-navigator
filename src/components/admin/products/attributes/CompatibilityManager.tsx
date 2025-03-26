
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Plus, Save, X } from 'lucide-react';
import { toast } from 'sonner';

// Sample compatibility options (in a real app, these would come from your backend)
const sampleCompatibility = [
  { id: 'comp1', name: 'Amazon Alexa', value: 'alexa', description: 'Works with Amazon Alexa devices' },
  { id: 'comp2', name: 'Google Home', value: 'google-home', description: 'Compatible with Google Home ecosystem' },
  { id: 'comp3', name: 'Apple HomeKit', value: 'homekit', description: 'Works with Apple HomeKit' },
  { id: 'comp4', name: 'Samsung SmartThings', value: 'smartthings', description: 'Compatible with Samsung SmartThings' }
];

export const CompatibilityManager = () => {
  const [compatibilityOptions, setCompatibilityOptions] = useState(sampleCompatibility);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newOption, setNewOption] = useState({ name: '', description: '' });
  const [editForm, setEditForm] = useState({ name: '', value: '', description: '' });
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToggle = () => {
    setIsAdding(!isAdding);
    setNewOption({ name: '', description: '' });
  };

  const handleAddOption = () => {
    if (!newOption.name.trim()) {
      toast.error('Compatibility option name is required');
      return;
    }

    const value = newOption.name.toLowerCase().replace(/\s+/g, '-');
    const newOptionWithId = {
      id: `comp${Date.now()}`,
      name: newOption.name.trim(),
      value,
      description: newOption.description.trim()
    };

    setCompatibilityOptions([...compatibilityOptions, newOptionWithId]);
    setIsAdding(false);
    setNewOption({ name: '', description: '' });
    toast.success('Compatibility option added successfully');
  };

  const handleEditStart = (option) => {
    setEditingId(option.id);
    setEditForm({
      name: option.name,
      value: option.value,
      description: option.description
    });
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };

  const handleEditSave = (id) => {
    if (!editForm.name.trim()) {
      toast.error('Compatibility option name is required');
      return;
    }

    const updatedOptions = compatibilityOptions.map(option => 
      option.id === id 
        ? { 
            ...option, 
            name: editForm.name.trim(),
            value: editForm.value.trim() || editForm.name.toLowerCase().replace(/\s+/g, '-'),
            description: editForm.description.trim()
          } 
        : option
    );
    
    setCompatibilityOptions(updatedOptions);
    setEditingId(null);
    toast.success('Compatibility option updated successfully');
  };

  const handleDeleteOption = (id) => {
    if (confirm('Are you sure you want to delete this compatibility option?')) {
      const updatedOptions = compatibilityOptions.filter(option => option.id !== id);
      setCompatibilityOptions(updatedOptions);
      toast.success('Compatibility option deleted successfully');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Compatibility Options</h3>
        <Button onClick={handleAddToggle} size="sm" className="flex items-center gap-1">
          {isAdding ? <X size={16} /> : <Plus size={16} />}
          {isAdding ? 'Cancel' : 'Add Option'}
        </Button>
      </div>

      {isAdding && (
        <div className="p-4 border rounded-md mb-4 bg-muted/30">
          <div className="grid gap-4 mb-4">
            <div>
              <label htmlFor="optionName" className="text-sm font-medium mb-1 block">Option Name*</label>
              <Input
                id="optionName"
                value={newOption.name}
                onChange={(e) => setNewOption({ ...newOption, name: e.target.value })}
                placeholder="e.g., Amazon Alexa"
              />
            </div>
            <div>
              <label htmlFor="optionDescription" className="text-sm font-medium mb-1 block">Description</label>
              <Input
                id="optionDescription"
                value={newOption.description}
                onChange={(e) => setNewOption({ ...newOption, description: e.target.value })}
                placeholder="Brief description of the compatibility"
              />
            </div>
          </div>
          <Button onClick={handleAddOption} size="sm">Add Option</Button>
        </div>
      )}

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {compatibilityOptions.map((option) => (
              <TableRow key={option.id}>
                <TableCell>
                  {editingId === option.id ? (
                    <Input
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="max-w-[200px]"
                    />
                  ) : (
                    option.name
                  )}
                </TableCell>
                <TableCell>
                  {editingId === option.id ? (
                    <Input
                      value={editForm.value}
                      onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
                      className="max-w-[200px]"
                      placeholder="auto-generated if empty"
                    />
                  ) : (
                    option.value
                  )}
                </TableCell>
                <TableCell>
                  {editingId === option.id ? (
                    <Input
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="max-w-[300px]"
                    />
                  ) : (
                    option.description
                  )}
                </TableCell>
                <TableCell>
                  {editingId === option.id ? (
                    <div className="flex space-x-2">
                      <Button size="icon" variant="ghost" onClick={() => handleEditSave(option.id)}>
                        <Save size={16} />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={handleEditCancel}>
                        <X size={16} />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <Button size="icon" variant="ghost" onClick={() => handleEditStart(option)}>
                        <Pencil size={16} />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDeleteOption(option.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {compatibilityOptions.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                  No compatibility options found. Add your first option above.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
