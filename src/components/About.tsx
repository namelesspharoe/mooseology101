/**
 * About – Instructor intro, Park City copy, and editable text blocks.
 * When user is logged in and edit mode is enabled (useAuth), textareas and Save/Cancel appear.
 * Content is loaded from Supabase site_content via useSiteContent; save upserts to DB.
 */
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { useSiteContent, DEFAULT_SITE_CONTENT, type SiteContentKey, type SiteContentMap } from "../hooks/useSiteContent";

export function About() {
  const { user, isEditMode, setEditMode } = useAuth();
  const { content: siteContent, loading: contentLoading, refetch, upsertContent } = useSiteContent();
  // Being authenticated means you *can* edit; edit mode controls whether UI is editable.
  const canEdit = !!user;
  // Local state for the form; synced from Supabase when content loads or after refetch/cancel.
  const [content, setContent] = useState(DEFAULT_SITE_CONTENT);

  // Sync local content from Supabase when the hook has finished loading or after refetch.
  useEffect(() => {
    if (!contentLoading && siteContent) {
      setContent(siteContent);
    }
  }, [contentLoading, siteContent]);

  const handleContentChange = (key: SiteContentKey, value: string) => {
    setContent((prev: SiteContentMap) => ({ ...prev, [key]: value }));
  };

  const saveChanges = async () => {
    const { error } = await upsertContent(content);
    if (error) {
      toast.error("Failed to save. Check console.");
      return;
    }
    await refetch();
    toast.success("Changes saved.");
    setEditMode(false);
  };

  const cancelEdit = () => {
    refetch();
    toast.success("Changes discarded.");
    setEditMode(false);
  };

  return (
    <section id="about" className="pt-20 px-4">
      {canEdit && isEditMode && (
        <div className="fixed top-4 right-4 z-50 bg-yellow-600 text-black px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">EDIT MODE</span>
            <button 
              onClick={saveChanges}
              className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700"
            >
              Save
            </button>
            <button 
              onClick={cancelEdit}
              className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Instructor Intro */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/concierge-95495.firebasestorage.app/o/moose2.PNG?alt=media&token=60ca6b54-9349-4349-9ce6-703f52d8f708"
              alt="The Moose on the slopes"
              className="rounded-lg shadow-xl w-full"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </motion.div>
          <motion.div
            className="prose prose-invert lg:prose-xl max-w-none text-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">Meet "The Moose"</h2>
            {canEdit && isEditMode ? (
              <textarea
                value={content.intro}
                onChange={(e) => handleContentChange('intro', e.target.value)}
                className="w-full p-2 mb-4 bg-gray-800 text-white border border-gray-600 rounded"
                rows={3}
              />
            ) : (
              <p>{content.intro}</p>
            )}
            
            {canEdit && isEditMode ? (
              <textarea
                value={content.parkCity}
                onChange={(e) => handleContentChange('parkCity', e.target.value)}
                className="w-full p-2 mb-4 bg-gray-800 text-white border border-gray-600 rounded"
                rows={3}
              />
            ) : (
              <p>{content.parkCity}</p>
            )}
            
            {canEdit && isEditMode ? (
              <textarea
                value={content.mooseIntro}
                onChange={(e) => handleContentChange('mooseIntro', e.target.value)}
                className="w-full p-2 mb-4 bg-gray-800 text-white border border-gray-600 rounded"
                rows={3}
              />
            ) : (
              <p>{content.mooseIntro}</p>
            )}
            
            {canEdit && isEditMode ? (
              <textarea
                value={content.experience}
                onChange={(e) => handleContentChange('experience', e.target.value)}
                className="w-full p-2 mb-4 bg-gray-800 text-white border border-gray-600 rounded"
                rows={3}
              />
            ) : (
              <p>{content.experience}</p>
            )}
            
            {canEdit && isEditMode ? (
              <textarea
                value={content.callToAction}
                onChange={(e) => handleContentChange('callToAction', e.target.value)}
                className="w-full p-2 mb-4 bg-gray-800 text-white border border-gray-600 rounded"
                rows={3}
              />
            ) : (
              <p>{content.callToAction}</p>
            )}
            
            {canEdit && isEditMode ? (
              <textarea
                value={content.contact}
                onChange={(e) => handleContentChange('contact', e.target.value)}
                className="w-full p-2 mb-4 bg-gray-800 text-white border border-gray-600 rounded"
                rows={2}
              />
            ) : (
              <p>{content.contact}</p>
            )}
            
            <p className="font-semibold">
              Ski you soon<br />
              Moose!
            </p>
           
          </motion.div>
        </div>

        {/* For New Students */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold mb-4">
            For New Students & "First Time Never-Evers"
          </h3>
          <div className="prose prose-invert lg:prose-xl max-w-3xl mx-auto text-center">
            {canEdit && isEditMode ? (
              <textarea
                value={content.newStudentsIntro}
                onChange={(e) => handleContentChange('newStudentsIntro', e.target.value)}
                className="w-full p-2 mb-4 bg-gray-800 text-white border border-gray-600 rounded"
                rows={3}
              />
            ) : (
              <p>{content.newStudentsIntro}</p>
            )}
            
            {canEdit && isEditMode ? (
              <textarea
                value={content.newStudentsProcess}
                onChange={(e) => handleContentChange('newStudentsProcess', e.target.value)}
                className="w-full p-2 mb-4 bg-gray-800 text-white border border-gray-600 rounded"
                rows={4}
              />
            ) : (
              <p>{content.newStudentsProcess}</p>
            )}
            
            <p className="text-center font-bold">
              "I survived The Moose" stickers included!
            </p>
            
            {/* Three pictures in a row */}
            <div className="flex justify-center items-center gap-4 mt-6 mb-8">
              <div className="flex-1 max-w-xs">
                <img
                  src="https://i.ibb.co/R5hfww9/mooseapprovedgreen.png"
                  alt="I Survived The Moose Sticker"
                  className="w-full object-cover rounded-full shadow-lg"
                />
              </div>
              <div className="flex-1 max-w-xs">
                <img
                  src="https://i.ibb.co/nNCZg2NK/mooseapprovedblue.png"
                  alt="The Moose on the slopes"
                  className="w-full object-cover rounded-full shadow-lg"
                />
              </div>
              <div className="flex-1 max-w-xs">
                <img
                  src="https://i.ibb.co/B21yJ0m6/mooseapprovedblack.png"
                  alt="Moose Approved Red"
                  className="w-full object-cover rounded-full shadow-lg"
                />
              </div>
            </div>
            
            {/* Second row of three pictures */}
            <div className="flex justify-center items-center gap-4 mt-6 mb-8">
              <div className="flex-1 max-w-xs">
                <img
                  src="https://i.ibb.co/fVkKKRz2/survivedmoosegreen.png"
                  alt="I Survived The Moose Sticker"
                  className="w-full object-cover rounded-full shadow-lg"
                />
              </div>
              <div className="flex-1 max-w-xs">
                <img
                  src="https://i.ibb.co/9H4CyYNq/survivedmooseblue.png"
                  alt="The Moose on the slopes"
                  className="w-full object-cover rounded-full shadow-lg"
                />
              </div>
              <div className="flex-1 max-w-xs">
                <img
                  src="https://i.ibb.co/HLsys6BK/survivedmooseblack.png"
                  alt="Moose Approved Red"
                  className="w-full object-cover rounded-full shadow-lg"
                />
              </div>
            </div>
            
            {/* Third row of three pictures */}
            <div className="flex justify-center items-center gap-4 mt-6 mb-8">
              <div className="flex-1 max-w-xs">
                <img
                  src="https://i.ibb.co/qYNpLj4J/Moose-Master-Prod-072225.jpg"
                  alt="I Survived The Moose Sticker"
                  className="w-full object-cover rounded-full shadow-lg"
                />
              </div>
              <div className="flex-1 max-w-xs">
                <img
                  src="https://i.ibb.co/23ktQ88J/Moose-Approved-Red.png"
                  alt="The Moose on the slopes"
                  className="w-full object-cover rounded-full shadow-lg"
                />
              </div>
              <div className="flex-1 max-w-xs">
                <img
                  src="https://i.ibb.co/qYNpLj4J/Moose-Master-Prod-072225.jpg"
                  alt="Moose Approved Red"
                  className="w-full object-cover rounded-full shadow-lg"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* For Veteran Students */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold mb-0 ">
            For My Veteran "I Survived The Moose" Students
          </h3>
          {canEdit && isEditMode ? (
            <textarea
              value={content.veteranStudents}
              onChange={(e) => handleContentChange('veteranStudents', e.target.value)}
              className="w-full p-2 mb-4 bg-gray-800 text-white border border-gray-600 rounded max-w-3xl mx-auto"
              rows={3}
            />
          ) : (
            <p className="prose prose-invert lg:prose-xl max-w-3xl mx-auto text-center">
              {content.veteranStudents}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}