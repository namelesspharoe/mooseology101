import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const subject = `Ski Lesson Inquiry from ${formData.name}`;
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
      window.location.href = `mailto:robertjon1@mac.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      toast.success("Redirecting to your email client!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to prepare message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Have questions or want to check availability? Send a message below.
          </p>
        </motion.div>

        <div className="bg-gray-800/50 backdrop-blur-md p-8 sm:p-12 rounded-lg shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md bg-gray-700/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-white"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md bg-gray-700/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2 text-white"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 rounded-md bg-gray-700/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Inquiry"}
            </button>
          </form>
        </div>

        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold mb-4">Booking Process</h3>
          <ol className="text-lg text-white/90 space-y-4 max-w-2xl mx-auto">
            <li>1. Confirm availability with Moose via the form above.</li>
            <li>
              2. Book at{" "}
              <a
                href="https://www.parkcitymountain.com/plan-your-trip/ski-and-ride-lessons/category/private.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:underline"
              >
                PCMR's website
              </a>
              , requesting Moose.
            </li>
            <li>3. Reach out one last time to confirm.</li>
          </ol>
        </div>
      </div>
    </section>
  );
}