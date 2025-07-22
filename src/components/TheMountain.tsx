import { motion } from "framer-motion";

const stats = [
  { value: "7,300+", label: "Acres of Skiable Terrain" },
  { value: "330+", label: "Runs" },
  { value: "40", label: "Lifts" },
  { value: "355\"", label: "Average Annual Snowfall" },
];

export function TheMountain() {
  return (
    <section className="py-20 px-4 bg-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-white">
            The Greatest Snow On Earth®
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto mb-12">
            Our geographic location, combined with a base elevation of 6,800ft
            and low humidity, sets the stage for an EPIC on-slope experience at
            Park City Mountain Resort.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-gray-700/50 p-6 rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <p className="text-4xl md:text-5xl font-extrabold text-blue-300">
                {stat.value}
              </p>
              <p className="text-sm md:text-base text-white/80 mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 