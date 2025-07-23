import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

const testimonials = [
  {
    name: "Sarah Johnson",
    quote:
      "Moose's patient teaching style helped me overcome my fear of skiing. I went from never skiing to confidently cruising down green runs in just two lessons!",
  },
  {
    name: "Michael Chen",
    quote:
      "The personalized attention and technical expertise Moose provides is outstanding. He helped me perfect my form and tackle more challenging terrain with confidence.",
  },
  {
    name: "Emily Rodriguez",
    quote:
      "Even as an experienced skier, Moose helped me discover new techniques and approaches that took my skiing to the next level. His knowledge is incredible!",
  },
];

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section
      id="testimonials"
      className="py-20 px-4 relative bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/140234/pexels-photo-140234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <LazyLoadImage
              src="https://i.ibb.co/23ktQ88J/Moose-Approved-Red.png"
              alt="Moose Approved Red"
              effect="blur"
              className="rounded-lg shadow-xl w-64 h-64"
            />
          </div>
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Fredoka One, cursive' }}>Student Success Stories</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Hear from skiers who have transformed their skills with Moose's
            guidance
          </p>
        </motion.div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] p-4"
              >
                <div className="h-full bg-gray-800/50 backdrop-blur-md p-8 rounded-lg text-center">
                  <p className="text-lg mb-6 italic text-gray-300">
                    "{testimonial.quote}"
                  </p>
                  <h3 className="font-bold text-xl text-white">
                    {testimonial.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={scrollPrev}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            Prev
          </button>
          <button
            onClick={scrollNext}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}