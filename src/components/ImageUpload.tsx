import { useState } from 'react';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  onUploadSuccess?: (url: string) => void;
}

export function ImageUpload({ onUploadSuccess }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be less than 2MB');
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading('Uploading image...');

    try {
      // Create form data
      const formData = new FormData();
      formData.append('image', file);
      
      // Get your API key from https://api.imgbb.com/
      formData.append('key', 'YOUR_IMGBB_API_KEY');

      // Upload to imgbb
      const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Image uploaded successfully!', { id: toastId });
        onUploadSuccess?.(data.data.url);
      } else {
        throw new Error(data.error?.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image', { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="glass-card">
      <h3 className="text-xl font-bold mb-4">Upload Image</h3>
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={isUploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <div className="text-4xl mb-2">📸</div>
          <p className="text-lg mb-2">Click or drag image here</p>
          <p className="text-sm text-white/70">Maximum size: 2MB</p>
        </div>
      </div>
    </div>
  );
}