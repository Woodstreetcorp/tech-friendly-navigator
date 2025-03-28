
import { useState } from 'react';
import { toast } from 'sonner';
import { CompatibilityOption } from './types';
import { sampleCompatibility } from './compatibilityData';

export const useCompatibilityManager = () => {
  const [compatibilityOptions, setCompatibilityOptions] = useState<CompatibilityOption[]>(sampleCompatibility);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newOption, setNewOption] = useState({ name: '', description: '' });
  const [editForm, setEditForm] = useState({ name: '', value: '', description: '' });

  const handleAddToggle = () => {
    setIsAdding(!isAdding);
    setNewOption({ name: '', description: '' });
  };

  const handleNewOptionChange = (field: string, value: string) => {
    setNewOption(prev => ({ ...prev, [field]: value }));
  };

  const handleEditFormChange = (field: string, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
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

  const handleEditStart = (option: CompatibilityOption) => {
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

  const handleEditSave = (id: string) => {
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

  const handleDeleteOption = (id: string) => {
    const updatedOptions = compatibilityOptions.filter(option => option.id !== id);
    setCompatibilityOptions(updatedOptions);
    toast.success('Compatibility option deleted successfully');
  };

  return {
    compatibilityOptions,
    editingId,
    isAdding,
    newOption,
    editForm,
    handleAddToggle,
    handleNewOptionChange,
    handleEditFormChange,
    handleAddOption,
    handleEditStart,
    handleEditCancel,
    handleEditSave,
    handleDeleteOption
  };
};
