import React, { useState, useEffect } from 'react';
import { works } from '../assets/assets.js';
import { FaBriefcase, FaHandshake, FaBuilding, FaNetworkWired, FaTools } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Sélection d'icônes intelligente selon le type de travail
const pickWorkIcon = (label = '') => {
  const lower = label.toLowerCase();
  if (lower.includes('agence') || lower.includes('agency')) return FaBuilding;
  if (lower.includes('freelance') || lower.includes('consulting')) return FaHandshake;
  if (lower.includes('réseau') || lower.includes('network')) return FaNetworkWired;
  return FaTools;
};

export default function Work() {
  // Détection du thème pour l'affichage adaptatif
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'light');

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(document.documentElement.getAttribute('data-theme')));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  return (
    <section 
      id="work" 
      className="relative pt-32 pb-24 px-6 transition-colors duration-500 overflow-hidden"
      style={{ backgroundColor: isDark ? '#050505' : '#ffffff', marginTop: 0 }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* En-tête */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-600 via-blue-400 to-emerald-500 text-transparent bg-clip-text uppercase tracking-tighter"
          >
            Mon <span className="font-light italic text-blue-500/80">Travail</span>
          </motion.h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mb-8 shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
          <p className={`text-lg max-w-2xl mx-auto font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Découvrez mes réalisations en infrastructures IT, collaborations stratégiques et projets techniques menés avec rigueur.
          </p>
        </div>

        {/* Grille des travaux */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {works.map((work, idx) => {
            const Icon = pickWorkIcon(work);
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                className={`group relative p-8 rounded-[2rem] border transition-all duration-300
                  ${isDark ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-blue-500/50' 
                           : 'bg-white border-gray-100 shadow-xl shadow-gray-200/50 hover:border-blue-500'}`}
              >
                <div className="flex items-start gap-6">
                  {/* Icon Container */}
                  <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl transition-all duration-300
                    ${isDark ? 'bg-white/5 text-blue-400 group-hover:bg-blue-500 group-hover:text-white' 
                             : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'}`}>
                    <Icon size={28} />
                  </div>

                  <div>
                    <h3 className={`text-xl font-bold mb-2 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {work}
                    </h3>
                    <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Mise en œuvre de solutions réseaux complexes, sécurisation des infrastructures et support technique de haut niveau.
                    </p>
                    
                    {/* Badge de statut ou label */}
                    <span className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border
                      ${isDark ? 'border-white/10 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
                      ● Projet Professionnel
                    </span>
                  </div>
                </div>

                {/* Décoration subtile au survol */}
                <div className="absolute top-4 right-8 text-4xl font-black opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                  0{idx + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Décoration d'arrière-plan */}
      <div className={`absolute top-0 right-0 w-80 h-80 blur-[150px] rounded-full pointer-events-none ${isDark ? 'bg-blue-600/10' : 'bg-blue-100/40'}`} />
    </section>
  );
}
