
import React from 'react';
import { Pencil, Trash2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { CompatibilityOption } from './types';

interface CompatibilityTableProps {
  compatibilityOptions: CompatibilityOption[];
  editingId: string | null;
  editForm: {
    name: string;
    value: string;
    description: string;
  };
  onEditStart: (option: CompatibilityOption) => void;
  onEditCancel: () => void;
  onEditSave: (id: string) => void;
  onDeleteOption: (id: string) => void;
  onEditFormChange: (field: string, value: string) => void;
}

export const CompatibilityTable: React.FC<CompatibilityTableProps> = ({
  compatibilityOptions,
  editingId,
  editForm,
  onEditStart,
  onEditCancel,
  onEditSave,
  onDeleteOption,
  onEditFormChange,
}) => {
  const handleEditSave = (id: string) => {
    if (!editForm.name.trim()) {
      toast.error('Compatibility option name is required');
      return;
    }
    onEditSave(id);
  };

  const handleDeleteOption = (id: string) => {
    if (confirm('Are you sure you want to delete this compatibility option?')) {
      onDeleteOption(id);
    }
  };

  return (
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
                    onChange={(e) => onEditFormChange('name', e.target.value)}
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
                    onChange={(e) => onEditFormChange('value', e.target.value)}
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
                    onChange={(e) => onEditFormChange('description', e.target.value)}
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
                    <Button size="icon" variant="ghost" onClick={onEditCancel}>
                      <X size={16} />
                    </Button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <Button size="icon" variant="ghost" onClick={() => onEditStart(option)}>
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
  );
};
