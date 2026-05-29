/**
 * Hero – Full-screen background video with headline, subcopy, and CTA.
 * Editable via site edit mode (useAuth + useSiteContent), same pattern as About.
 */
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import ReactPlayer from "react-player";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import {
  useSiteContent,
  DEFAULT_SITE_CONTENT,
  HERO_CONTENT_KEYS,
  type SiteContentKey,
  type SiteContentMap,
} from "../hooks/useSiteContent";

export function Hero() {
  const { user, isEditMode, setEditMode } = useAuth();
  const { content: siteContent, loading: contentLoading, refetch, upsertContent } = useSiteContent();
  const canEdit = !!user;
  const [content, setContent] = useState(DEFAULT_SITE_CONTENT);

  useEffect(() => {
    if (!contentLoading && siteContent) {
      setContent(siteContent);
    }
  }, [contentLoading, siteContent]);

  const handleContentChange = (key: SiteContentKey, value: string) => {
    setContent((prev: SiteContentMap) => ({ ...prev, [key]: value }));
  };

  const saveChanges = async () => {
    const updates = Object.fromEntries(
      HERO_CONTENT_KEYS.map((key) => [key, content[key]])
    ) as Partial<SiteContentMap>;
    const { error } = await upsertContent(updates);
    if (error) {
      toast.error("Failed to save. Check console.");
      return;
    }
    await refetch();
    toast.success("Hero changes saved.");
    setEditMode(false);
  };

  const cancelEdit = () => {
    refetch();
    toast.success("Changes discarded.");
    setEditMode(false);
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const videoUrl = content.heroVideoUrl || DEFAULT_SITE_CONTENT.heroVideoUrl;

  return (
    <section
      id="home"
      className="relative flex items-center justify-center h-screen text-center text-white"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <ReactPlayer
          key={videoUrl}
          url={videoUrl}
          playing
          loop
          muted
          width="100%"
          height="100%"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          config={{
            youtube: {
              playerVars: {
                showinfo: 0,
                controls: 0,
                modestbranding: 1,
                quality: "hd1080",
              },
            },
          }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
      </div>

      <motion.div
        className="relative z-10 p-4 w-full max-w-5xl"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        {canEdit && isEditMode && (
          <motion.div variants={itemVariants} className="mb-6 text-left">
            <label className="block text-sm font-semibold mb-1 text-yellow-300">
              Background video URL (YouTube)
            </label>
            <input
              type="url"
              value={content.heroVideoUrl}
              onChange={(e) => handleContentChange("heroVideoUrl", e.target.value)}
              className="w-full p-2 bg-gray-800/90 text-white border border-gray-600 rounded text-sm"
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </motion.div>
        )}

        <motion.div variants={itemVariants}>
          {canEdit && isEditMode ? (
            <textarea
              value={content.heroTitle}
              onChange={(e) => handleContentChange("heroTitle", e.target.value)}
              className="w-full p-2 mb-4 bg-gray-800/90 text-white border border-gray-600 rounded text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-center"
              rows={2}
            />
          ) : (
            <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4">
              {content.heroTitle}
            </h1>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          {canEdit && isEditMode ? (
            <textarea
              value={content.heroSubtitle}
              onChange={(e) => handleContentChange("heroSubtitle", e.target.value)}
              className="w-full p-2 mb-8 bg-gray-800/90 text-white border border-gray-600 rounded text-sm sm:text-lg md:text-xl lg:text-2xl text-center"
              rows={3}
            />
          ) : (
            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8">
              {content.heroSubtitle}
            </p>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          {canEdit && isEditMode ? (
            <div className="space-y-4">
              <input
                type="text"
                value={content.heroCtaText}
                onChange={(e) => handleContentChange("heroCtaText", e.target.value)}
                className="w-full max-w-md mx-auto block p-2 bg-gray-800/90 text-white border border-gray-600 rounded text-base sm:text-xl text-center"
                placeholder="Button text"
              />
              <div className="flex justify-center gap-2">
                <button
                  onClick={saveChanges}
                  className="bg-green-600 text-white px-4 py-2 rounded font-semibold text-sm hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-red-600 text-white px-4 py-2 rounded font-semibold text-sm hover:bg-red-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="booking"
              smooth={true}
              duration={500}
              offset={-70}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-full font-semibold text-base sm:text-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer inline-block"
            >
              {content.heroCtaText}
            </Link>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
