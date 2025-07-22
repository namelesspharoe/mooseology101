import { motion } from 'framer-motion';

export function Lessons() {
  const lessons = [
    {
      title: "Half Day Private",
      level: "All Skill Levels",
      duration: "4 hours",
      price: "$1,250",
      includes: [
        "Personalized instruction",
        "Skill level assessment",
        "Technique refinement",
        "Real-time feedback"
      ],
      color: "#0000FF",
      icon: "⭐⭐"
    },
    {
      title: "Full Day Private",
      level: "All Skill Levels",
      duration: "7 hours",
      price: "$1,799",
      includes: [
        "Extended personalized instruction",
        "Comprehensive skill development",
        "Multiple terrain exploration",
        "Lunch break included"
      ],
      color: "#000000",
      icon: "⭐⭐⭐"
    }
  ];

  return (
    <section 
      id="lessons" 
      className="lessons-section py-20 relative"
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/3229916/pexels-photo-3229916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Private Lesson Packages</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Choose between half-day or full-day private instruction. All lessons are customized to your skill level and goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {lessons.map((lesson, index) => (
            <motion.div
              key={lesson.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="lesson-card relative overflow-hidden backdrop-blur-md bg-black/30"
              style={{ borderColor: lesson.color }}
            >
              <div className="absolute top-0 right-0 p-2 text-2xl">
                {lesson.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">{lesson.title}</h3>
              <div className="text-lg mb-2">{lesson.level}</div>
              <div className="text-3xl font-bold mb-4 text-blue-300">{lesson.price}</div>
              <div className="text-sm mb-4">{lesson.duration}</div>
              <ul className="text-left space-y-2">
                {lesson.includes.map((item, i) => (
                  <li key={i} className="flex items-center">
                    <span className="mr-2">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#booking"
                className="mt-6 inline-block w-full px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all transform hover:scale-105"
              >
                Book Now
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}