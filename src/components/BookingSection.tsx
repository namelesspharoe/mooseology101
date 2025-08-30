import { motion } from 'framer-motion';

export function BookingSection() {
  const parkCityBookingUrl = 'https://www.parkcitymountain.com/plan-your-trip/ski-and-ride-lessons/category/private.aspx';

  const packages = [
    {
      id: 'half-day' as const,
      title: 'Half Day Private',
      duration: '3 hours',
      features: [
        'Morning or Afternoon Session',
        'Skill level assessment',
        'Technique refinement',
        'Real-time feedback'
      ]
    },
    {
      id: 'full-day' as const,
      title: 'Full Day Private',
      duration: '7 hours',
      features: [
        'Extended personalized instruction',
        'Comprehensive skill development',
        'Multiple terrain exploration',
        'Lunch break included'
      ]
    }
  ];

  const handleBookingClick = () => {
    window.open(parkCityBookingUrl, '_blank', 'noopener,noreferrer');
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="booking" className="pb-20">
       {/* Disclaimer */}
       <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-16 max-w-4xl mx-auto"
      >
        <div className=" mb-20 bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-6">
          <h4 className="text-base font-bold text-yellow-300 mb-3">Please Note:</h4>
          <p className="text-sm text-white/90 leading-relaxed">
            All ski lessons are booked through Park City Ski School to ensure a safe, legal and quality experience. 
            Freelance or independent ski lessons conducted on Park City / Canyons and Deer Valley resort properties 
            are not permitted and considered "Theft Of Services" potentially leading to life time bans at any Vail 
            property to facing possible legal actions for trespassing and breach of agreement.
          </p>
          <p className="text-xs text-white/90 mt-3 font-semibold">
            Thank you,<br />
            Moose
          </p>
        </div>
      </motion.div>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Book Your Lesson Today</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Book your private ski lesson today through Park City Mountain Resort's official booking system.
          </p>
        </motion.div>

        {/* Booking Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">How to Book with Moose</h3>
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                <p className="text-white/90">Click the "Book Lesson Today" button below to open Park City Mountain Resort's booking system</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                <p className="text-white/90">Select "Private Lessons" and choose your preferred lesson type (Half Day or Full Day)</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                <p className="text-white/90">During the booking process, <strong>be sure to request Moose as your instructor</strong> in the special requests or notes section</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                <p className="text-white/90">Complete your booking and you'll receive confirmation from Park City Mountain Resort</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">5</span>
                <p className="text-white/90">
                  Once confirmed, <button onClick={scrollToContact} className="text-blue-400 hover:text-blue-300 underline">contact Moose</button> to discuss lesson details and meet up location
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Package Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="glass-card"
            >
              <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
              <div className="text-sm mb-4">{pkg.duration}</div>
              <ul className="text-left space-y-2 mb-6">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleBookingClick}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
              >
                Book Lesson Today
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      
     
    </section>
  );
}