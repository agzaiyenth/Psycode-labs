import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { testimonials } from '../constants';

const TestimonialCard = ({ name, role, content }) => (
  <div className="bg-opacity-40 backdrop-blur-md  rounded-lg p-6 shadow-lg min-w-[280px] lg:min-w-[480px] max-w-[280px] lg:max-w-[480px] mx-2 bg-gray-800">
    <div className="flex items-center mb-4">
      <div>
        <h3 className="text-white font-semibold text-lg">{name}</h3>
        <p className="text-gray-300 text-sm">{role}</p>
      </div>
    </div>
    <p className="text-gray-200 text-sm leading-relaxed">{content}</p>
  </div>
);

const Testimonials = () => {
  const carouselRef = useRef(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setCarouselWidth(carouselRef.current.scrollWidth / 2);
    }
  }, []);

  return (
    <div className="lg:px-16 px-2">
      <motion.div ref={carouselRef} className="overflow-hidden cursor-grab">
        <motion.div
          drag="x"
          dragConstraints={{ left: -carouselWidth, right: 0 }}
          className="flex"
        >
          {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
            <motion.div key={index} className="mr-4 last:mr-0 flex-shrink-0">
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Testimonials;
