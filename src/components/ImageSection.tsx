import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export function ImageSection() {
  return (
    <div className="py-12">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <LazyLoadImage
          src="https://i.ibb.co/MyMcKpJY/cid-61-D0-D0-A4-F5-A2-42-B4-A4-BB-2-E825-B88-DC7-C-1.png"
          alt="Professional skier demonstrating proper skiing technique"
          effect="blur"
          className="rounded-lg shadow-xl w-full h-auto object-cover"
        />
      </motion.div>
    </div>
  );
} 