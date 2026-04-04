/**
 * SlideshowSection – Displays the image slideshow; when Moose is logged in, shows edit UI.
 * Images are loaded from Supabase slideshow_images (or fallback to hardcoded list if table empty).
 * Authenticated users can add (upload to Storage), remove, and reorder slides.
 */

import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { useSlideshowImages } from "../hooks/useSlideshowImages";
import { ImageSlideshow } from "./ImageSlideshow";
import { ImageUpload } from "./ImageUpload";

export function SlideshowSection() {
  const { user, isEditMode } = useAuth();
  const {
    images,
    slideshowRows,
    loading,
    useFallback,
    addImage,
    removeImage,
    reorder,
  } = useSlideshowImages();
  const [adding, setAdding] = useState(false);

  const handleUploadSuccess = async (url: string) => {
    try {
      await addImage(url, "Slideshow image");
      setAdding(false);
      toast.success("Image added to slideshow.");
    } catch (e) {
      console.error(e);
      toast.error("Failed to add image.");
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await removeImage(id);
      toast.success("Image removed.");
    } catch (e) {
      console.error(e);
      toast.error("Failed to remove image.");
    }
  };

  const handleReorder = async (id: string, direction: "up" | "down") => {
    try {
      await reorder(id, direction);
    } catch (e) {
      console.error(e);
      toast.error("Failed to reorder.");
    }
  };

  return (
    <div className="py-12">
      {/* When logged in and using DB (not fallback), show edit controls above the slideshow. */}
      {user && isEditMode && !useFallback && (
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-lg bg-gray-800/50 p-3 border border-gray-700">
          <span className="text-sm font-semibold text-white">Edit slideshow</span>
          {!adding ? (
            <button
              type="button"
              onClick={() => setAdding(true)}
              className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
            >
              Add image
            </button>
          ) : (
            <div className="flex-1 min-w-[200px]">
              <ImageUpload pathPrefix="slideshow" onUploadSuccess={handleUploadSuccess} />
              <button
                type="button"
                onClick={() => setAdding(false)}
                className="mt-2 text-sm text-gray-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}

      {/* Per-slide remove/reorder (only when logged in and using DB) */}
      {user && isEditMode && !useFallback && slideshowRows.length > 0 && (
        <ul className="mb-4 space-y-2 text-sm text-white/80">
          {slideshowRows.map((row, idx) => (
            <li key={row.id} className="flex items-center gap-2 flex-wrap">
              <span className="truncate max-w-[200px]" title={row.src}>
                Slide {idx + 1}: {row.alt || "—"}
              </span>
              <button
                type="button"
                onClick={() => handleReorder(row.id, "up")}
                disabled={idx === 0}
                className="px-2 py-0.5 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-40"
              >
                Up
              </button>
              <button
                type="button"
                onClick={() => handleReorder(row.id, "down")}
                disabled={idx === slideshowRows.length - 1}
                className="px-2 py-0.5 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-40"
              >
                Down
              </button>
              <button
                type="button"
                onClick={() => handleRemove(row.id)}
                className="px-2 py-0.5 rounded bg-red-800/80 hover:bg-red-700 text-white"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {loading ? (
        <div className="text-center text-gray-400 py-8">Loading slideshow…</div>
      ) : (
        <ImageSlideshow
          images={images}
          autoPlay={true}
          interval={8000}
          showDots={true}
          showArrows={false}
        />
      )}
    </div>
  );
}
