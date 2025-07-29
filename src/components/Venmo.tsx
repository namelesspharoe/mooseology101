import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export function Venmo() {
  return (
    <section id="venmo" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Support Your Instructor</h2>
          <p className="text-lg text-white/90">
            Enjoyed your lesson? Tips are greatly appreciated!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-800/50 backdrop-blur-md p-8 sm:p-12 rounded-lg text-center shadow-xl"
        >
          <h3 className="text-3xl font-bold mb-6 text-white">
            Scan to Pay with Venmo
          </h3>
          <div className="flex justify-center mb-6">
            <LazyLoadImage
              src="https://i.ibb.co/1tHkN0ZP/Rendered-Image.jpg"
              alt="Moose's Venmo QR Code"
              effect="blur"
              className="w-56 h-56 rounded-lg shadow-lg"
            />
          </div>
          <p className="text-xl text-white">
            Venmo: <span className="font-bold text-blue-300">@Moose-Ski</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}