import { motion } from "framer-motion";
import { Link } from "react-scroll";
import ReactPlayer from "react-player";

const videoUrl = "https://www.youtube.com/watch?v=bwUehKTHwn0"; 

export function Hero() {
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

  return (
    <section
      id="home"
      className="relative flex items-center justify-center h-screen text-center text-white"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <ReactPlayer
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
                quality: 'hd1080' 
              },
            },
          }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
      </div>

      <motion.div
        className="relative z-10 p-4"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4"
          variants={itemVariants}
        >
          Elevate Your Ski Experience
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8"
          variants={itemVariants}
        >
          Book a private lesson with "The Moose" and start planning your
          2025/2026 ski trip. Plan ahead to secure your dates!
        </motion.p>
        <motion.div variants={itemVariants}>
          <Link
            to="booking"
            smooth={true}
            duration={500}
            offset={-70}
            className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
          >
            Book Your Lesson
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}