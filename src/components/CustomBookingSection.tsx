import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendlyAPI, CalendlyEventType, CalendlyTimeSlot, formatDateForCalendly } from '../lib/calendly';
import toast from 'react-hot-toast';

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export function CustomBookingSection() {
  const [selectedPackage, setSelectedPackage] = useState<'half-day' | 'full-day' | null>(null);
  const [eventTypes, setEventTypes] = useState<CalendlyEventType[]>([]);
  const [availableSlots, setAvailableSlots] = useState<CalendlyTimeSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Replace with your actual Calendly user URI and event type URIs
  const CALENDLY_USER_URI = import.meta.env.VITE_CALENDLY_USER_URI;
  const EVENT_TYPE_URIS = {
    'half-day': import.meta.env.VITE_CALENDLY_HALF_DAY_URI,
    'full-day': import.meta.env.VITE_CALENDLY_FULL_DAY_URI
  };

  const packages = [
    {
      id: 'half-day' as const,
      title: 'Half Day Private',
      duration: '3 hours',
      price: '$1,250',
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
      price: '$1,799',
      features: [
        'Extended personalized instruction',
        'Comprehensive skill development',
        'Multiple terrain exploration',
        'Lunch break included'
      ]
    }
  ];

  // Load event types on component mount
  useEffect(() => {
    if (CALENDLY_USER_URI) {
      loadEventTypes();
    }
  }, []);

  // Load available slots when package or date changes
  useEffect(() => {
    if (selectedPackage && selectedDate && EVENT_TYPE_URIS[selectedPackage]) {
      loadAvailableSlots();
    }
  }, [selectedPackage, selectedDate]);

  const loadEventTypes = async () => {
    try {
      setIsLoading(true);
      const types = await CalendlyAPI.getEventTypes(CALENDLY_USER_URI);
      setEventTypes(types);
    } catch (error) {
      console.error('Error loading event types:', error);
      toast.error('Failed to load booking options');
    } finally {
      setIsLoading(false);
    }
  };

  const loadAvailableSlots = async () => {
    if (!selectedPackage || !selectedDate || !EVENT_TYPE_URIS[selectedPackage]) return;

    try {
      setIsLoadingSlots(true);
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);

      const slots = await CalendlyAPI.getAvailableTimes(
        EVENT_TYPE_URIS[selectedPackage],
        formatDateForCalendly(startOfDay),
        formatDateForCalendly(endOfDay)
      );
      
      setAvailableSlots(slots);
    } catch (error) {
      console.error('Error loading available slots:', error);
      toast.error('Failed to load available times');
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBooking = async () => {
    if (!selectedPackage || !selectedDate || !selectedTime || !formData.name || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsLoading(true);
      
      // Create a scheduling link
      const schedulingLink = await CalendlyAPI.createSchedulingLink(
        EVENT_TYPE_URIS[selectedPackage]
      );

      // Open the scheduling link in a new window
      window.open(schedulingLink.booking_url, '_blank');
      
      toast.success('Redirecting to booking page...');
      
      // Reset form
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSelectedDate('');
      setSelectedTime('');
      
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Failed to create booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getNext30Days = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates;
  };

  const formatTimeSlot = (slot: CalendlyTimeSlot) => {
    const start = new Date(slot.start_time);
    const end = new Date(slot.end_time);
    
    return {
      start: start.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      end: end.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      value: slot.start_time
    };
  };

  return (
    <section id="booking" className="py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Fredoka One, cursive' }}>Book Your Lesson</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Select your preferred package and time slot. Once confirmed, Moose will reach out to finalize the details.
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
                  Select Date and Time
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
                onClick={() => {
                  setSelectedPackage(null);
                  setSelectedDate('');
                  setSelectedTime('');
                }}
                className="px-6 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
              >
                ← Back to Packages
              </button>
            </div>

            <div className="glass-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Date and Time Selection */}
                <div>
                  <h4 className="text-xl font-bold mb-4">Select Date & Time</h4>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-md bg-gray-700/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    >
                      <option value="">Select a date</option>
                      {getNext30Days().map(date => (
                        <option key={date} value={date}>
                          {new Date(date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedDate && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">Available Times</label>
                      {isLoadingSlots ? (
                        <div className="text-center py-4">Loading available times...</div>
                      ) : availableSlots.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                          {availableSlots.map((slot, index) => {
                            const timeSlot = formatTimeSlot(slot);
                            return (
                              <button
                                key={index}
                                onClick={() => setSelectedTime(timeSlot.value)}
                                className={`px-4 py-2 rounded-md text-sm transition-colors ${
                                  selectedTime === timeSlot.value
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-700/50 text-white hover:bg-gray-600/50'
                                }`}
                              >
                                {timeSlot.start}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-400">
                          No available times for this date
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Contact Form */}
                <div>
                  <h4 className="text-xl font-bold mb-4">Your Information</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 rounded-md bg-gray-700/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 rounded-md bg-gray-700/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 rounded-md bg-gray-700/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-md bg-gray-700/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        placeholder="Any special requests or questions..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={handleBooking}
                  disabled={isLoading || !selectedDate || !selectedTime || !formData.name || !formData.email}
                  className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : 'Book Your Lesson'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
} 