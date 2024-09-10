import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Preloader = ({ onLoadingComplete }) => {
  const words = ['Beyond', 'Pixels', 'Beyond', 'Dreams'];

  useEffect(() => {
    const timer = setTimeout(() => onLoadingComplete(), 4000); 
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const screenVariants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0, transition: { staggerChildren: 0.5 } },
    exit: { opacity: 0, y: -20 }
  };

  const textItemVariants = {
    enter: { opacity: 0, y: 50 },
    center: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 12, stiffness: 100 }
    }
  };

  const TextScreen = () => (
    <motion.div 
      className="relative text-white text-4xl font-bold flex flex-wrap justify-center"
      variants={screenVariants}
      initial="enter"
      animate="center"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className={`mx-2 z-10 ${
            word === 'Beyond'
              ? 'font-extrabold'  // Bold for "Beyond"
              : 'font-extralight'  // Normal font for other words
          }`}
          variants={textItemVariants}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );

  const LogoScreen = () => {
    const controls = useAnimation();

    useEffect(() => {
      controls.start({
        pathLength: [0, 1],
        pathOffset: [0, 0],
        transition: { duration: 4, ease: "easeInOut" }
      });
    }, [controls]);

    return (
      <motion.svg
        className="absolute inset-0 m-auto w-[400px] h-[200px] z-0 opacity-5" // Positioned behind with low opacity
        viewBox="0 0 200 100"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.path
          d="M50,50 C50,25 75,25 100,50 C125,75 150,75 150,50 C150,25 125,25 100,50 C75,75 50,75 50,50 Z"
          fill="none"
          stroke="white"
          strokeWidth="8"
          initial={{ pathLength: 0, pathOffset: 0 }}
          animate={controls}
        />
      </motion.svg>
    );
  };

  return (
    <div className="relative h-screen bg-[#0e0c15] flex items-center justify-center">
      <LogoScreen /> {/* Infinite mark behind the text */}
      <TextScreen /> {/* Text in front of the infinite mark */}
    </div>
  );
};

export default Preloader;
