import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { logochristian } from '../assets/assets.js';

export default function ProfessionalSplashScreen({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const loadingSteps = useMemo(
    () => [
      { label: 'Initialisation des systèmes...', duration: 800 },
      { label: 'Chargement des protocoles réseaux...', duration: 1000 },
      { label: "Configuration de l'infrastructure...", duration: 600 },
      { label: 'Sécurisation des accès...', duration: 700 },
      { label: 'Finalisation du déploiement...', duration: 500 },
    ],
    []
  );

  useEffect(() => {
    let progressInterval;
    let stepTimeout;

    if (currentStep < loadingSteps.length) {
      const step = loadingSteps[currentStep];
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          const target = (currentStep + 1) * (100 / loadingSteps.length);
          if (prev >= target) {
            clearInterval(progressInterval);
            return target;
          }
          return prev + 1;
        });
      }, step.duration / 20);

      stepTimeout = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, step.duration);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => onComplete && onComplete(), 800);
      }, 500);
    }

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stepTimeout);
    };
  }, [currentStep, onComplete, loadingSteps]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ scale: 1.1, opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          {/* Background Image avec Overlay sombre pour la lisibilité */}
          <div 
            className="absolute inset-0 opacity-40 grayscale"
            style={{
              backgroundImage: `url(${logochristian})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />

          {/* Particules flottantes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-500 rounded-full"
                animate={{
                  y: [0, -100],
                  opacity: [0, 1, 0],
                  scale: [1, 1.5, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100 + 20}%`,
                }}
              />
            ))}
          </div>

          {/* Contenu Central */}
          <div className="relative z-10 w-full max-w-sm px-8 text-center">
            
            {/* Logo/Icon placeholder animé */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-12 flex justify-center"
            >
              <div className="relative">
                <div className="w-20 h-20 border-2 border-blue-500/30 rounded-full animate-ping absolute inset-0" />
                <img 
                  src={logochristian} 
                  alt="Logo" 
                  className="w-20 h-20 rounded-2xl object-contain border border-white/10 p-2 bg-black/50 backdrop-blur-md"
                />
              </div>
            </motion.div>

            {/* Steps & Progress */}
            <div className="space-y-6">
              <div className="h-6 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentStep}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="text-blue-400 font-mono text-xs uppercase tracking-[0.2em]"
                  >
                    {loadingSteps[currentStep]?.label || "Prêt"}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Barre de progression stylisée */}
              <div className="relative group">
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600"
                    style={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 50 }}
                  />
                </div>
                {/* Glow effect sous la barre */}
                <div 
                  className="absolute inset-0 blur-md bg-blue-500/20 rounded-full" 
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40">
                <span>Christian Ilunga</span>
                <span className="text-blue-500">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          {/* Footer discret */}
          <div className="absolute bottom-10 w-full text-center">
            <p className="text-[10px] text-white/20 uppercase tracking-[0.4em]">
              Ingénieur Réseaux & Systèmes
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
