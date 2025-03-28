
import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Image, Upload } from 'lucide-react';
import { toast } from "sonner";

interface ImageUploaderProps {
  currentImage: string;
  onImageChange: (imageUrl: string) => void;
  label?: string;
}

export const ImageUploader = ({ currentImage, onImageChange, label = "Image" }: ImageUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>(currentImage);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (JPEG, PNG, GIF, or WebP)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    setIsUploading(true);

    // Create a preview URL for the selected file
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // In a real application, we would upload the file to a server
    // For now, simulate a short delay and use the objectUrl
    setTimeout(() => {
      setIsUploading(false);
      onImageChange(objectUrl);
      toast.success("Image uploaded successfully!");
    }, 1000);
  }, [onImageChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Handle drag and drop functionality
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div 
          className={`relative h-24 w-24 overflow-hidden rounded-md border-2 ${isDragging ? 'border-primary border-dashed' : 'border-border'} bg-background cursor-pointer`}
          onClick={triggerFileInput}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
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
          
          {isDragging && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <p className="text-xs font-medium text-primary">Drop image here</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Button 
            type="button" 
            variant="outline" 
            onClick={triggerFileInput}
            className="w-full"
            disabled={isUploading}
          >
            {isUploading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </span>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </>
            )}
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
          <p className="text-xs text-muted-foreground">
            Drag and drop an image or click to browse
          </p>
        </div>
      </div>
    </div>
  );
};
