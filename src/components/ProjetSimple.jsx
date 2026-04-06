import React, { useState, useEffect } from 'react';
import { projets } from '../assets/assets.js';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa';

export default function ProjetSimple() {
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'light');

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(document.documentElement.getAttribute('data-theme')));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  return (
    <section 
      id="projects" 
      className="relative pt-32 pb-24 px-6 overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: isDark ? '#050505' : '#ffffff', marginTop: 0 }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 text-transparent bg-clip-text"
          >
            Mes Réalisations
          </motion.h2>
          <div className="w-20 h-1.5 bg-blue-500 mx-auto rounded-full mb-6 shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
          <p className={`text-lg max-w-2xl mx-auto font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Audit, déploiement et sécurisation : explorez mes interventions techniques sur des infrastructures critiques.
          </p>
        </div>

        {/* Grille des Projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projets.map((projet, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`group rounded-[2rem] overflow-hidden border transition-all duration-300
                ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 shadow-2xl shadow-black' 
                         : 'bg-white border-gray-100 shadow-xl shadow-gray-200 hover:border-blue-500'}`}
            >
              {/* Image avec Overlay */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={projet.image}
                  alt={projet.titre}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <FaCode className="text-white text-4xl" />
                </div>
              </div>

              {/* Contenu textuel */}
              <div className="p-8">
                <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {projet.titre}
                </h3>
                <p className={`text-sm mb-6 leading-relaxed line-clamp-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {projet.description}
                </p>

                {/* Technologies / Tags */}
                {projet.technologies && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {projet.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg
                          ${isDark ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                                   : 'bg-blue-50 text-blue-600 border border-blue-100'}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Boutons d'action */}
                <div className="flex gap-4">
                  {projet.lienDemo && (
                    <a
                      href={projet.lienDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20"
                    >
                      <FaExternalLinkAlt size={12} /> Démo
                    </a>
                  )}
                  {projet.lienGithub && (
                    <a
                      href={projet.lienGithub}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold rounded-xl border transition-all
                        ${isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' 
                                 : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'}`}
                    >
                      <FaGithub size={14} /> Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Décoration de fond */}
      <div className={`absolute -bottom-24 -left-24 w-96 h-96 blur-[150px] rounded-full pointer-events-none ${isDark ? 'bg-emerald-600/10' : 'bg-emerald-100/30'}`} />
    </section>
  );
}
