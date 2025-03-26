
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Image, Upload } from 'lucide-react';

interface ImageUploaderProps {
  currentImage: string;
  onImageChange: (imageUrl: string) => void;
  label?: string;
}

export const ImageUploader = ({ currentImage, onImageChange, label = "Image" }: ImageUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>(currentImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a preview URL for the selected file
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // In a real application, you would upload the file to a server or cloud storage
    // For now, we'll just use the object URL as if it were a real upload
    onImageChange(objectUrl);

    // In a production app, you'd do something like:
    // const formData = new FormData();
    // formData.append('file', file);
    // const response = await fetch('/api/upload', { method: 'POST', body: formData });
    // const data = await response.json();
    // onImageChange(data.imageUrl);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div 
          className="relative h-24 w-24 overflow-hidden rounded-md border bg-background"
          onClick={triggerFileInput}
        >
          {previewUrl ? (
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <Image className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={triggerFileInput}
            className="w-full"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Image
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <p className="text-xs text-muted-foreground">
            Recommended: Square image, 300x300px or larger
          </p>
        </div>
      </div>
    </div>
  );
};
