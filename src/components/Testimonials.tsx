import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useState } from "react";

const testimonials = [
  {
    name: "Brooke Archacki",
    quote:
      "Moose from Ski School was the best instructor ever! He went above and beyond!",
  },
  {
    name: "Lara August",
    quote:
      "My sister and I were able to ski the more advanced runs while my husband and kids got expert instruction in ski school and with a private instructor. Moose is the best! Moose was the greatest instructor. We brought a large family with three generations of skiers at all levels ranging in age from 7-79. Moose taught a 49 yr old and 14 yr old beginner on the first afternoon, the 7 year old on the second, and the three together on the third. It allows our advanced skiers to veer off on blacks and blues and our beginners were able to significantly advance their abilities and grow in confidence. Most importantly, he made it a blast and captured photos and videos that we will cherish forever! We are grateful for him and this very special family trip.",
  },
  {
    name: "Ron Smith",
    quote:
      "Private ski instructor 'Moose' was amazing at getting my wife and daughter up to speed with feeling comfortable in all aspects of beginner skiing- both were able to handle simple blue runs after the full day lesson. This was critical for my hopes to make this trip an annual event. We are already planning our '25 trip.",
  },
  {
    name: "Marya Nasser",
    quote:
      "I had an amazing private ski instructor, Moose. Overall it was amazing and I'm already planning to come back soon! A big thanks to Moose who made this trip unforgettable for my family.",
  },
  {
    name: "Gillian Couture",
    quote:
      "Moose was an amazing ski instructor. He gave his learners confidence to ski and taught safety and skill. He made my ski experience and experience in Park City better than I ever could have imagined. A truly wonderful member of the Park City Staff!",
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
          <h2 className="text-4xl font-bold mb-4">Student Success Stories</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Hear from skiers who have transformed their skills with Moose's
            guidance
          </p>
        </motion.div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((testimonial) => {
              const [isExpanded, setIsExpanded] = useState(false);
              const isLongQuote = testimonial.quote.length > 200;
              const displayQuote = isLongQuote && !isExpanded 
                ? testimonial.quote.substring(0, 200) + "..."
                : testimonial.quote;

              return (
                <div
                  key={testimonial.name}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] p-4"
                >
                  <div className="h-full bg-gray-800/50 backdrop-blur-md p-8 rounded-lg text-center">
                    <p className="text-lg mb-6 italic text-gray-300">
                      "{displayQuote}"
                    </p>
                    {isLongQuote && (
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-blue-400 hover:text-blue-300 text-sm mb-4 transition-colors"
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                      </button>
                    )}
                    <h3 className="font-bold text-xl text-white">
                      {testimonial.name}
                    </h3>
                  </div>
                </div>
              );
            })}
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