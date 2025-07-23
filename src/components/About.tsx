import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Instructor Intro */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <LazyLoadImage
              src="https://i.ibb.co/Fkpn7L0G/moose2.png"
              alt="The Moose on the slopes"
              effect="blur"
              className="rounded-lg shadow-xl w-full"
            />
          </motion.div>
          <motion.div
            className="prose prose-invert lg:prose-xl max-w-none"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">Meet "The Moose"</h2>
            <p>
              Summer is midway and we're into the shorts and swim suits, but in
              a blink it's over and the snow will be falling. Get your
              calendars out and start planning your 2025/2026 ski trip in
              advance and add private ski lessons with me, "The Moose”!
            </p>
            <p>
              I am a local full-time ski instructor here at Park City, ready to
              make your ski vacation at Park City Mountainside and Canyons Fun,
              Safe, and the most Memorable Epic Ski Vacation ever.
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
          <div className="prose prose-invert lg:prose-xl max-w-3xl mx-auto text-left">
            <p>
              Welcome to a new experience here at the Park City Ski School. My
              goal is to build your self-confidence while unleashing your
              athletic ability to teach you to ski in the safest, most fun
              manner possible.
            </p>
            <p>
              Are you going to fall? Yes! That is primarily the biggest fear
              for most. We start by getting comfortable, then it’s on to the
              gradual slope where I teach you to stop and turn. Once mastered,
              it's on to learning how to get on and off the lift safely and on
              to a beginner slope. What I just explained all happens in about
              the first 30-60 min, changing the inner screams and fears into
              outer smiles and laughter. We have Fun!
            </p>
            <p className="text-center font-bold">
              "I survived The Moose" stickers included!
            </p>
            <div className="flex justify-center mt-6">
              <img
                src="https://i.ibb.co/bjmxh3TD/Screenshot-2024-02-04-at-10-01-45-AM.png"
                alt="I Survived The Moose Sticker"
                className="rounded-full shadow-xl w-64 h-64"
              />
            </div>
            <div className="flex justify-center mt-6">
              <img
                src="https://i.ibb.co/QskH2gs/moose1.png"
                alt="I Survived The Moose Sticker"
                className="shadow-xl"
              />
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
          <h3 className="text-3xl font-bold mb-4">
            For My Veteran "I Survived The Moose" Students
          </h3>
          <p className="prose prose-invert lg:prose-xl max-w-3xl mx-auto">
            Get those legs in shape with a little cardio and if you like, sign
            up for a level-up or refresher class with me to get you off to a
            safe "in control” season, having fun exploring our entire mountain
            again creating your best ski vacation ever.
          </p>
        </motion.div>
      </div>
    </section>
  );
}