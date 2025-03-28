
import React from 'react';
import { CompatibilityHeader } from './compatibility/CompatibilityHeader';
import { AddCompatibilityForm } from './compatibility/AddCompatibilityForm';
import { CompatibilityTable } from './compatibility/CompatibilityTable';
import { useCompatibilityManager } from './compatibility/useCompatibilityManager';

export const CompatibilityManager = () => {
  const {
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
  } = useCompatibilityManager();

  return (
    <div className="space-y-4">
      <CompatibilityHeader 
        isAdding={isAdding} 
        onAddToggle={handleAddToggle} 
      />

      {isAdding && (
        <AddCompatibilityForm
          newOption={newOption}
          onNewOptionChange={handleNewOptionChange}
          onAddOption={handleAddOption}
        />
      )}

      <CompatibilityTable
        compatibilityOptions={compatibilityOptions}
        editingId={editingId}
        editForm={editForm}
        onEditStart={handleEditStart}
        onEditCancel={handleEditCancel}
        onEditSave={handleEditSave}
        onDeleteOption={handleDeleteOption}
        onEditFormChange={handleEditFormChange}
      />
    </div>
  );
};
