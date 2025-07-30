import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export function TripTips() {
  const tips = [
    "Get plenty of rest a week in advance.",
    "Stay hydrated and drink plenty of water.",
    "Limit alcohol consumption if possible.",
    "Try to arrive a day before you ski to acclimate.",
  ];

  return (
    <section className="pt-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-white">
            Tips for Your Trip
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto mb-12">
            A few things to remember when coming from lower elevations to our
            base of 6,800 feet. These tips come from personal experience!
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-12">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 backdrop-blur-md p-6 rounded-lg flex items-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <span className="text-3xl mr-4 text-blue-400">✓</span>
              <p className="text-lg text-white">{tip}</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <LazyLoadImage
            src="https://i.ibb.co/CDJGd8R/Teacher-Moose-With-Ski-Poles.png"
            alt="Teacher Moose with ski poles"
            effect="blur"
            className="rounded-lg shadow-xl w-full max-w-md"
          />
        </motion.div>
        
      </div>
    </section>
  );
} 