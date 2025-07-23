import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendlyWidget } from './CalendlyWidget';

export function BookingSection() {
  const [selectedPackage, setSelectedPackage] = useState<'half-day' | 'full-day' | null>(null);
  
  // Update these with your actual Calendly URLs
  const calendlyUrls = {
    'half-day': 'https://calendly.com/namelesspharoe/half-day-private-lesson-4-hours-1-250',
    'full-day': 'https://calendly.com/namelesspharoe/full-day-private'
  };

  const packages = [
    {
      id: 'half-day' as const,
      title: 'Half Day Private',
      duration: '4 hours',
      price: '$1,250',
      features: [
        'Personalized instruction',
        'Skill level assessment',
        'Technique refinement',
        'Real-time feedback'
      ]
    },
    {
      id: 'full-day' as const,
      title: 'Full Day Private',
      duration: '7 hours',
      price: '$1,799',
      features: [
        'Extended personalized instruction',
        'Comprehensive skill development',
        'Multiple terrain exploration',
        'Lunch break included'
      ]
    }
  ];

  return (
    <section id="booking" className="py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Book Your Lesson</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Choose your package and select your preferred time slot
          </p>
        </motion.div>

        {!selectedPackage ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="glass-card cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setSelectedPackage(pkg.id)}
              >
                <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                <div className="text-3xl font-bold mb-4 text-blue-300">{pkg.price}</div>
                <div className="text-sm mb-4">{pkg.duration}</div>
                <ul className="text-left space-y-2 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                  Select Package
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">
                {packages.find(p => p.id === selectedPackage)?.title}
              </h3>
              <p className="text-lg text-white/90 mb-4">
                Select your preferred date and time
              </p>
              <button
                onClick={() => setSelectedPackage(null)}
                className="px-6 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
              >
                ← Back to Packages
              </button>
            </div>
            
            <CalendlyWidget
              url={calendlyUrls[selectedPackage]}
              prefill={{
                name: '',
                email: ''
              }}
              utm={{
                utmSource: 'mooseology101',
                utmMedium: 'website',
                utmCampaign: 'ski-lessons'
              }}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}