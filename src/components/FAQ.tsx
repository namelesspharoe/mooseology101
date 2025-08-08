import { useState } from 'react';
import { motion } from 'framer-motion';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What should I bring to my first lesson?",
      answer: "For your first lesson, bring warm, waterproof clothing, goggles, and sunscreen. If you don't have ski equipment, we can assist with rentals at the resort."
    },
    {
      question: "How long are the lessons?",
      answer: "Lessons range from 3-6 hours depending on the package you choose. We can also customize the duration to meet your specific needs."
    },
    {
      question: "Do I need prior experience?",
      answer: "No prior experience is needed! We welcome complete beginners and will teach you everything you need to know to get started safely."
    },
    {
      question: "What's your cancellation policy?",
      answer: "Lessons can be rescheduled or cancelled up to 24 hours in advance for a full refund. Please contact us as soon as possible if you need to make changes."
    },
    {
      question: "Where do lessons take place?",
      answer: "All lessons take place at Park City Mountainside, Canyons, or Deer Valley. We'll confirm the exact meeting location when you book your lesson."
    }
  ];

  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-white/90">
            Everything you need to know about skiing lessons with Moose
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="glass-card cursor-pointer"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <span className="text-2xl transition-transform duration-200" style={{
                  transform: openIndex === index ? 'rotate(45deg)' : 'none'
                }}>+</span>
              </div>
              {openIndex === index && (
                <p className="mt-4 text-white/90">{faq.answer}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}