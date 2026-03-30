import { about } from '../assets/assets.js';
import {
  profile1Image as profileImg,
} from '../assets/assets.js';
// eslint-disable-next-line no-unused-vars
import { color, motion } from 'framer-motion';
import LazyImage from './LazyImage';
import GoogleMapsSection from './GoogleMapsSection';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <>
      <motion.section
        id="about"
        className="relative py-20 px-4 bg-black-400 text-white-400 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundcolor: 'rgba(0, 0, 0, 0.5)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.15)',
            opacity: 0.6,
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            variants={imageVariants}
            whileHover={{
              scale: 1.08,
              rotate: [0, -3, 3, 0],
              transition: { duration: 0.3 },
            }}
          >
            <LazyImage
              src={profileImg}
              alt="Profil"
              className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover mb-10 shadow-lg border-4 border-purple hover:scale-105 transition-transform duration-300"
              placeholder={
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-purple/20 to-pink/20 animate-pulse border-4 border-purple mb-10 shadow-lg" />
              }
            />
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-6"
            variants={textVariants}
          >
            <span className="bg-gradient-to-r from-purple to-pink md:font-bold mb-4 bg-gradient-to-r from-blue-600 via-blue-500 to-green-500 text-transparent bg-clip-text">
              À propos de moi
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 text-center leading-relaxed max-w-2xl mb-6"
            variants={textVariants}
          >
            {about}
          </motion.p>
          <motion.p
            className="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            "Architecte de solutions connectées, spécialisé dans la conception, la sécurisation et l'optimisation des infrastructures réseau pour garantir une haute disponibilité de vos services."
          </motion.p>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mt-4"
            variants={textVariants}
          />
          <div className="mt-10 text-gray-400 text-sm italic">Disponible pour des projets professionnels et collaborations.</div>
          <div className="mt-6">
            <a
              href="mailto:christiantshianyi22@gmail.com"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple to-pink text-white rounded-lg hover:scale-105 transition-transform duration-300"
            >
              Me contacter
            </a>
          </div>
          {/* <div className="mt-12">
            <LazyImage
              src={about}
              alt="Illustration à propos"
              className="w-full max-w-2xl rounded-lg shadow-lg border-4 border-purple hover:scale-105 transition-transform duration-300"
              placeholder={
                <div className="w-full max-w-2xl h-48 rounded-lg bg-gradient-to-br from-purple/20 to-pink/20 animate-pulse border-4 border-purple" />
              }
            /> */}
          // Animation de fond subtil
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple/10 to-pink/10 animate-pulse"
            variants={textVariants}
          />
        </div>
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple/20 to-pink/20 animate-pulse"
          variants={textVariants}
        />  
  
      </motion.section>
      <GoogleMapsSection />
    </>
  );
}
