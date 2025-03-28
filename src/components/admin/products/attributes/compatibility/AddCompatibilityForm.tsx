
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AddCompatibilityFormProps {
  newOption: {
    name: string;
    description: string;
  };
  onNewOptionChange: (field: string, value: string) => void;
  onAddOption: () => void;
}

export const AddCompatibilityForm: React.FC<AddCompatibilityFormProps> = ({
  newOption,
  onNewOptionChange,
  onAddOption,
}) => {
  return (
    <div className="p-4 border rounded-md mb-4 bg-muted/30">
      <div className="grid gap-4 mb-4">
        <div>
          <label htmlFor="optionName" className="text-sm font-medium mb-1 block">Option Name*</label>
          <Input
            id="optionName"
            value={newOption.name}
            onChange={(e) => onNewOptionChange('name', e.target.value)}
            placeholder="e.g., Amazon Alexa"
          />
        </div>
        <div>
          <label htmlFor="optionDescription" className="text-sm font-medium mb-1 block">Description</label>
          <Input
            id="optionDescription"
            value={newOption.description}
            onChange={(e) => onNewOptionChange('description', e.target.value)}
            placeholder="Brief description of the compatibility"
          />
        </div>
      </div>
      <Button onClick={onAddOption} size="sm">Add Option</Button>
    </div>
  );
};
