/**
 * ImageUpload – Uploads images to Supabase Storage (bucket: site-assets).
 * Returns the public URL on success via onUploadSuccess. Used for slideshow and About images.
 * Requires the user to be authenticated (Storage RLS allows only authenticated uploads).
 */

import { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../lib/supabase";

const STORAGE_BUCKET = "site-assets";
const MAX_FILE_SIZE_MB = 20;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

interface ImageUploadProps {
  /** Called with the public URL of the uploaded image. */
  onUploadSuccess?: (url: string) => void;
  /** Optional path prefix inside the bucket (e.g. "slideshow", "about"). */
  pathPrefix?: string;
}

export function ImageUpload({ onUploadSuccess, pathPrefix = "uploads" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error(`Image must be less than ${MAX_FILE_SIZE_MB}MB`);
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Uploading image...");

    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${pathPrefix}/${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(path, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data: urlData } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
      const publicUrl = urlData.publicUrl;

      toast.success("Image uploaded successfully!", { id: toastId });
      onUploadSuccess?.(publicUrl);
    } catch (error) {
      console.error("Upload error:", error);
      let message = "Failed to upload image";
      if (error && typeof error === "object" && "message" in error) {
        message = `Failed to upload image: ${(error as { message?: string }).message || ""}`.trim();
      }
      toast.error(message, { id: toastId });
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
      <h3 className="text-lg font-bold mb-3 text-white">Upload image</h3>
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={isUploading}
          className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
          aria-label="Choose image to upload"
        />
        <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-blue-400 transition-colors text-white/90 pointer-events-none">
          <div className="text-3xl mb-2">📸</div>
          <p className="text-sm mb-1">Click or drag image here</p>
          <p className="text-xs text-white/70">Max {MAX_FILE_SIZE_MB}MB, images only</p>
        </div>
      </div>
    </div>
  );
}
