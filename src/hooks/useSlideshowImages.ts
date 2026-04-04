/**
 * useSlideshowImages – Fetches slideshow images from Supabase slideshow_images table.
 * Returns list ordered by sort_order. Authenticated users can add, remove, and reorder.
 */

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";

export interface SlideshowImage {
  id: string;
  src: string;
  alt: string;
  sort_order: number;
  created_at: string;
}

const FALLBACK_IMAGES: { src: string; alt: string }[] = [
  { src: "https://i.ibb.co/ymtSmfPc/Moose-and-Guest.png", alt: "The Moose on the slopes" },
  { src: "https://i.ibb.co/mVsW5mvC/IMG-4854.jpg", alt: "Moose Approved Red" },
  { src: "https://i.ibb.co/k6ggYp9R/IMG-4748.png", alt: "Moose Approved Red" },
  { src: "https://i.ibb.co/8L20yC3n/IMG-4348.jpg", alt: "Moose Approved Red" },
  { src: "https://i.ibb.co/ccBK7C4J/IMG-4216.jpg", alt: "Moose Approved Red" },
  { src: "https://i.ibb.co/9kkwQ1hK/IMG-0613.jpg", alt: "Moose Approved Red" },
  { src: "https://i.ibb.co/5hQWHCTr/IMG-7534.png", alt: "Moose Approved Red" },
  { src: "https://i.ibb.co/67Z5bB02/IMG-2859.jpg", alt: "Moose Approved Red" },
  { src: "https://i.ibb.co/hFkFykNj/IMG-1926.jpg", alt: "Moose Approved Red" },
  { src: "https://i.ibb.co/TxCNbrtn/IMG-1900.jpg", alt: "Moose Approved Red" },
  { src: "https://i.ibb.co/9H1KL1JS/IMG-4837-copy.jpg", alt: "Moose Approved Red" },
  { src: "https://i.ibb.co/p6BTRfqR/IMG-1797.jpg", alt: "Moose Approved Red" },
  { src: "https://i.ibb.co/Mx48s5LQ/IMG-1566.jpg", alt: "Moose Approved Red" },
  { src: "https://i.ibb.co/QjH7gddS/IMG-1334.jpg", alt: "Moose Approved Red" },
  { src: "https://i.ibb.co/mCtTKynP/IMG-1513.jpg", alt: "Moose Approved Red" },
  { src: "https://i.ibb.co/fdbFZLVH/IMG-0761.jpg", alt: "Moose Approved Red" },
  { src: "https://i.ibb.co/ZRtbvqyf/IMG-0064.jpg", alt: "Moose Approved Red" },
  { src: "https://i.ibb.co/6c20Lt2P/IMG-2849.jpg", alt: "Moose Approved Red" },
];

export function useSlideshowImages() {
  const [images, setImages] = useState<SlideshowImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [useFallback, setUseFallback] = useState(false);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: e } = await supabase
      .from("slideshow_images")
      .select("id, src, alt, sort_order, created_at")
      .order("sort_order", { ascending: true });
    setLoading(false);
    if (e) {
      setError(e);
      setUseFallback(true);
      return;
    }
    if (data && data.length > 0) {
      setImages(data as SlideshowImage[]);
      setUseFallback(false);
    } else {
      setUseFallback(true);
      setImages([]);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const addImage = useCallback(async (src: string, alt: string) => {
    const maxOrder = images.length === 0 ? 0 : Math.max(...images.map((i) => i.sort_order), 0);
    const { data, error: e } = await supabase
      .from("slideshow_images")
      .insert({ src, alt, sort_order: maxOrder + 1 })
      .select("id, src, alt, sort_order, created_at")
      .single();
    if (e) throw e;
    setImages((prev) => [...prev, data as SlideshowImage].sort((a, b) => a.sort_order - b.sort_order));
  }, [images.length]);

  const removeImage = useCallback(async (id: string) => {
    const { error: e } = await supabase.from("slideshow_images").delete().eq("id", id);
    if (e) throw e;
    setImages((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const reorder = useCallback(async (id: string, direction: "up" | "down") => {
    const idx = images.findIndex((i) => i.id === id);
    if (idx < 0) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= images.length) return;
    const a = images[idx];
    const b = images[swapIdx];
    await supabase.from("slideshow_images").update({ sort_order: b.sort_order }).eq("id", a.id);
    await supabase.from("slideshow_images").update({ sort_order: a.sort_order }).eq("id", b.id);
    setImages((prev) => {
      const next = [...prev];
      next[idx] = { ...a, sort_order: b.sort_order };
      next[swapIdx] = { ...b, sort_order: a.sort_order };
      return next.sort((x, y) => x.sort_order - y.sort_order);
    });
  }, [images]);

  const displayImages = useFallback
    ? FALLBACK_IMAGES.map((img) => ({ src: img.src, alt: img.alt }))
    : images.map((img) => ({ src: img.src, alt: img.alt }));

  return {
    images: displayImages,
    slideshowRows: images,
    loading,
    error,
    useFallback,
    refetch,
    addImage,
    removeImage,
    reorder,
  };
}
