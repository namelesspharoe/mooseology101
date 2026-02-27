import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function About() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [typedKeys, setTypedKeys] = useState("");
  const [content, setContent] = useState({
    intro: "The leaves are turning and starting to fall while summer quickly fades, which means winter will soon be on our doorstep. In a matter of weeks Park City will soon transform into a winter wonderland creating new stories of skiing, snowboarding and a host of winter activities.",
    parkCity: "Park City Mountain Resort is a premier ski destination with easy convenient access being under an hour from the Salt Lake City airport complete with local lodging, great dinning, shopping and galleries all nestled in and around Park City for a great start to your epic ski vacation.",
    mooseIntro: "Hello I am Moose, I'm a local full time certified ski instructor here at Park City Ski School. Myself along with a host of others, are here to help you, make your ski vacation at Park City Mountainside, Canyons and Deervalley Fun, Safe and the most Memorable Epic Ski Vacation ever.",
    experience: "I create a fun one on one personalized learning experience thats tailored to your specific needs, abilities and or learning style. From first time never ever's to advanced, I make it fun while you learn at all levels.",
    callToAction: "So get your calendars out and start planning your 2025/2026 ski trip in advance and request a private ski lessons with me, \"The Moose\"! To get you started safely, in control and in the right direction, which is all downhill from here.",
    contact: "Call today to secure your ski school vacation dates that best work for you and request The Moose!",
    newStudentsIntro: "Welcome to a new experience here at the Park City Ski School. My goal is to build your self-confidence while unleashing your athletic ability to teach you to ski in the safest, most fun manner possible.",
    newStudentsProcess: "Are you going to fall? Yes! That is primarily the biggest fear for most. We start by getting comfortable, then it's on to the gradual slope where I teach you to stop and turn. Once mastered, it's on to learning how to get on and off the lift safely and on to a beginner slope. What I just explained all happens in about the first 30-60 min, changing the inner screams and fears into outer smiles and laughter. We have fun!",
    veteranStudents: "Get those legs in shape with a little cardio and if you like, sign up for a level-up or refresher class with me to get you off to a safe \"in control\" season, having fun exploring our entire mountain again creating your best ski vacation ever."
  });

  const password = "magicmoose";
  console.log(typedKeys)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isEditMode) return; // Don't track keys if already in edit mode
      
      setTypedKeys(prev => {
        const newKeys = prev + e.key.toLowerCase();
        if (newKeys.includes(password)) {
          setIsEditMode(true);
          setTypedKeys("");
          return "";
        }
        // Keep only the last 10 characters to prevent memory issues
        return newKeys.slice(-10);
      });
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isEditMode]);

  const handleContentChange = (key: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveChanges = () => {
    // Here you could save to localStorage or send to a backend
    localStorage.setItem('mooseContent', JSON.stringify(content));
    setIsEditMode(false);
  };

  const cancelEdit = () => {
    // Reset to original content
    setContent({
      intro: "The leaves are turning and starting to fall while summer quickly fades, which means winter will soon be on our doorstep. In a matter of weeks Park City will soon transform into a winter wonderland creating new stories of skiing, snowboarding and a host of winter activities.",
      parkCity: "Park City Mountain Resort is a premier ski destination with easy convenient access being under an hour from the Salt Lake City airport complete with local lodging, great dinning, shopping and galleries all nestled in and around Park City for a great start to your epic ski vacation.",
      mooseIntro: "Hello I am Moose, I'm a local full time certified ski instructor here at Park City Ski School. Myself along with a host of others, are here to help you, make your ski vacation at Park City Mountainside, Canyons and Deervalley Fun, Safe and the most Memorable Epic Ski Vacation ever.",
      experience: "I create a fun one on one personalized learning experience thats tailored to your specific needs, abilities and or learning style. From first time never ever's to advanced, I make it fun while you learn at all levels.",
      callToAction: "So get your calendars out and start planning your 2025/2026 ski trip in advance and request a private ski lessons with me, \"The Moose\"! To get you started safely, in control and in the right direction, which is all downhill from here.",
      contact: "Call today to secure your ski school vacation dates that best work for you and request The Moose!",
      newStudentsIntro: "Welcome to a new experience here at the Park City Ski School. My goal is to build your self-confidence while unleashing your athletic ability to teach you to ski in the safest, most fun manner possible.",
      newStudentsProcess: "Are you going to fall? Yes! That is primarily the biggest fear for most. We start by getting comfortable, then it's on to the gradual slope where I teach you to stop and turn. Once mastered, it's on to learning how to get on and off the lift safely and on to a beginner slope. What I just explained all happens in about the first 30-60 min, changing the inner screams and fears into outer smiles and laughter. We have fun!",
      veteranStudents: "Get those legs in shape with a little cardio and if you like, sign up for a level-up or refresher class with me to get you off to a safe \"in control\" season, having fun exploring our entire mountain again creating your best ski vacation ever."
    });
    setIsEditMode(false);
  };

  return (
    <section id="about" className="pt-20 px-4">
      {isEditMode && (
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
            {isEditMode ? (
              <textarea
                value={content.intro}
                onChange={(e) => handleContentChange('intro', e.target.value)}
                className="w-full p-2 mb-4 bg-gray-800 text-white border border-gray-600 rounded"
                rows={3}
              />
            ) : (
              <p>{content.intro}</p>
            )}
            
            {isEditMode ? (
              <textarea
                value={content.parkCity}
                onChange={(e) => handleContentChange('parkCity', e.target.value)}
                className="w-full p-2 mb-4 bg-gray-800 text-white border border-gray-600 rounded"
                rows={3}
              />
            ) : (
              <p>{content.parkCity}</p>
            )}
            
            {isEditMode ? (
              <textarea
                value={content.mooseIntro}
                onChange={(e) => handleContentChange('mooseIntro', e.target.value)}
                className="w-full p-2 mb-4 bg-gray-800 text-white border border-gray-600 rounded"
                rows={3}
              />
            ) : (
              <p>{content.mooseIntro}</p>
            )}
            
            {isEditMode ? (
              <textarea
                value={content.experience}
                onChange={(e) => handleContentChange('experience', e.target.value)}
                className="w-full p-2 mb-4 bg-gray-800 text-white border border-gray-600 rounded"
                rows={3}
              />
            ) : (
              <p>{content.experience}</p>
            )}
            
            {isEditMode ? (
              <textarea
                value={content.callToAction}
                onChange={(e) => handleContentChange('callToAction', e.target.value)}
                className="w-full p-2 mb-4 bg-gray-800 text-white border border-gray-600 rounded"
                rows={3}
              />
            ) : (
              <p>{content.callToAction}</p>
            )}
            
            {isEditMode ? (
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
            {isEditMode ? (
              <textarea
                value={content.newStudentsIntro}
                onChange={(e) => handleContentChange('newStudentsIntro', e.target.value)}
                className="w-full p-2 mb-4 bg-gray-800 text-white border border-gray-600 rounded"
                rows={3}
              />
            ) : (
              <p>{content.newStudentsIntro}</p>
            )}
            
            {isEditMode ? (
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
          {isEditMode ? (
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