import useParallax from '../hooks/useParallax';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import LazyImage from './LazyImage';
import { useEffect, useState } from 'react';
import notificationService from '../services/notificationService';
import { profile7 } from '../assets/assets.js';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { useNavigate } from 'react-router-dom';
import { 
  FaServer, FaNetworkWired, FaShieldAlt, FaCloud, FaMicrochip,
  FaSearch, FaBezierCurve, FaTools, FaCheckCircle, FaWindows 
} from 'react-icons/fa';
import { SiCisco, SiLinux } from 'react-icons/si'; 

export default function Hero() {
  const navigate = useNavigate();
  const scrollY = useParallax();
  const [elementRef] = useIntersectionObserver();
  
  // Détection du thème pour l'adaptation des couleurs
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const theme = isDark ? 'dark' : 'light';

  // --- REINTEGRATION DES BACKGROUNDS ---
  const backgrounds = 
  ['/background8.jpeg',   
  '/background9.jpeg', 
  '/background10.jpeg'];
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [backgrounds.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      notificationService.welcome();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* SECTION ACCUEIL AVEC SLIDER DE BACKGROUNDS */}
      <section
        ref={elementRef}
        id="home"
        className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${backgrounds[bgIndex]})`, // Utilisation de votre slider
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.25)',
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10" />

        {/* Particules flottantes */}
        <div className="absolute inset-0 z-15 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-[1px]"
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0, 0.8, 0],
                scale: [0, 1.2, 0],
              }}
              transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 2 }}
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            />
          ))}
        </div>

        <div className="relative z-20 container mx-auto px-6 py-20 flex flex-col items-center">
          <AnimatedSection variant="scaleIn" delay={0.2}>
            <div className="mb-8 flex justify-center">
              <motion.div whileHover={{ scale: 1.05, rotate: 2 }} className="relative p-1">
                <LazyImage
                  src={profile7}
                  alt="Ir Christ Ilunga"
                  className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover border-4 border-white/20 shadow-[0_0_30px_rgba(139,92,246,0.5)] relative z-10"
                />
                <motion.div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-400/40" animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} />
              </motion.div>
            </div>
          </AnimatedSection>

          <div className="max-w-4xl text-center">
            <AnimatedSection variant="slideUp" delay={0.4}>
              <motion.h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-blue-500 to-emerald-400 text-transparent bg-clip-text" style={{ backgroundSize: '200% 200%' }}>
                Christian Ilunga Entrepreneur
              </motion.h2>
              <motion.p className="text-lg md:text-2xl text-gray-200 mb-6 font-light tracking-wide">
                Ingénieur en Réseaux Informatiques & Systèmes <br className="hidden md:block" />
                <span className="text-blue-400 font-medium">Spécialisé en IT Support & Infrastructure chez MUAMOKEL AGENCY</span>
              </motion.p>
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-2xl border border-white/5 mb-10">
                <p className="text-base md:text-xl italic text-gray-300 leading-relaxed">
                  "Architecte de solutions connectées, spécialisé dans la conception, la sécurisation et l'optimisation des infrastructures réseau."
                </p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection variant="slideIn" delay={1.0}>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center w-full sm:w-auto">
              <button onClick={() => navigate('/contact')} className="relative px-10 py-4 bg-blue-600 text-white rounded-full font-bold overflow-hidden shadow-lg group">
                <span className="relative z-10">Me contacter</span>
              </button>
              <button onClick={() => navigate('/projects')} className="px-10 py-4 bg-transparent border-2 border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-all backdrop-blur-md">
                Mes Projets
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* SECTION TECHNOLOGIES ADAPTATIVE */}
      <section className="py-16 transition-colors duration-300 border-y"
               style={{
                 backgroundColor: theme === 'dark' ? '#0a0a0a' : '#f8fafc',
                 borderColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#e2e8f0'
               }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <AnimatedSection variant="slideUp">
            <h3 className={`text-sm font-bold uppercase tracking-[0.3em] mb-10 ${theme === 'dark' ? 'text-blue-500' : 'text-blue-600'}`}>
              Expertises Techniques
            </h3>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {[
                { name: 'Cisco', icon: <SiCisco size={32} /> },
                { name: 'Infrastructure', icon: <FaServer size={28} /> },
                { name: 'Linux', icon: <SiLinux size={28} /> },
                { name: 'Windows', icon: <FaWindows size={28} /> },
                { name: 'Sécurité', icon: <FaShieldAlt size={28} /> },
                { name: 'Cloud IT', icon: <FaCloud size={28} /> }
              ].map((tech) => (
                <div key={tech.name} className="group flex flex-col items-center gap-3">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-300 
                    ${theme === 'dark' 
                      ? 'bg-white/5 border-white/10 text-gray-400 group-hover:text-blue-400 group-hover:border-blue-500/50' 
                      : 'bg-white border-gray-200 text-gray-500 group-hover:text-blue-600 group-hover:border-blue-500 shadow-sm'}`}>
                    {tech.icon}
                  </div>
                  <span className={`text-[10px] uppercase tracking-widest font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* SECTION PROCESSUS ADAPTATIVE */}
      <section className="py-24 transition-colors duration-300"
               style={{ backgroundColor: theme === 'dark' ? '#050505' : '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection variant="slideUp">
            <div className="text-center mb-16">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Mon <span className={theme === 'dark' ? 'text-blue-500' : 'text-blue-600'}>Processus</span>
              </h2>
              <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", icon: <FaSearch />, title: "Audit", desc: "Analyse complète de l'infrastructure existante." },
              { step: "02", icon: <FaBezierCurve />, title: "Design", desc: "Conception d'une architecture réseau sécurisée." },
              { step: "03", icon: <FaTools />, title: "Installation", desc: "Déploiement et configuration des équipements." },
              { step: "04", icon: <FaCheckCircle />, title: "Optimisation", desc: "Suivi des performances et maintenance proactive." }
            ].map((proc, index) => (
              <AnimatedSection key={index} variant="slideUp" delay={0.1 * index}>
                <div className={`group relative p-8 rounded-3xl border transition-all duration-300
                  ${theme === 'dark' 
                    ? 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]' 
                    : 'bg-gray-50 border-gray-200 hover:bg-white shadow-sm'}`}>
                  <div className={`text-2xl mb-4 group-hover:scale-110 transition-transform ${theme === 'dark' ? 'text-blue-500' : 'text-blue-600'}`}>
                    {proc.icon}
                  </div>
                  <span className={`absolute top-6 right-8 text-4xl font-black transition-colors ${theme === 'dark' ? 'text-white/5' : 'text-gray-200'}`}>
                    {proc.step}
                  </span>
                  <h4 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{proc.title}</h4>
                  <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{proc.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
