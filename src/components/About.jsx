import React, { useState, useEffect } from 'react';
import { about, profile7 as profileImg } from '../assets/assets.js';
import { motion } from 'framer-motion';
// 1. Import des icônes spécifiques à votre métier
import { FaNetworkWired, FaShieldAlt, FaHeadset, FaEnvelope } from 'react-icons/fa';
import LazyImage from './LazyImage';
import GoogleMapsSection from './GoogleMapsSection';

export default function About() {
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'light');

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute('data-theme'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  return (
    <>
      <motion.section
        id="about"
        className="relative pt-32 pb-24 px-6 overflow-hidden transition-colors duration-500"
        style={{ backgroundColor: isDark ? '#050505' : '#ffffff' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          
          {/* Image de Profil avec Halo */}
          <div className="relative mb-12">
            <div className={`absolute inset-0 rounded-full blur-3xl opacity-20 ${isDark ? 'bg-blue-500' : 'bg-blue-400'}`} />
            <LazyImage
              src={profileImg}
              alt="Profil"
              className={`w-48 h-48 md:w-60 md:h-60 rounded-full object-cover border-4 transition-all duration-500 relative z-10 
                ${isDark ? 'border-blue-500/30 shadow-2xl shadow-blue-500/20' : 'border-white shadow-xl shadow-gray-200'}`}
            />
          </div>

          {/* Titre */}
          <h2 className="text-3xl md:text-5xl font-black text-center mb-8">
            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 text-transparent bg-clip-text">
              À propos de moi
            </span>
          </h2>

          {/* Texte principal */}
          <div className={`text-lg text-center leading-relaxed max-w-3xl mb-12 font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {about}
          </div>

          {/* GRID D'EXPERTISE AVEC ICONES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16">
            {[
              { icon: <FaNetworkWired />, title: "Infrastructure", desc: "Conception réseaux LAN/WAN" },
              { icon: <FaShieldAlt />, title: "Sécurité", desc: "Protection des données & VPN" },
              { icon: <FaHeadset />, title: "IT Support", desc: "Maintenance & Assistance" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-2xl border text-center transition-all ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}
              >
                <div className="text-blue-500 text-3xl mb-4 flex justify-center">{item.icon}</div>
                <h4 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Citation */}
          <p className="text-xl md:text-2xl font-bold text-center italic bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 max-w-2xl mb-12">
            "Architecte de solutions connectées, spécialisé dans la conception, la sécurisation et l'optimisation des infrastructures réseau."
          </p>

          {/* Bouton de contact avec icone */}
          <a
            href="mailto:christiantshianyi22@gmail.com"
            className="group flex items-center gap-3 px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            <FaEnvelope className="group-hover:rotate-12 transition-transform" />
            Me contacter
          </a>
        </div>
      </motion.section>
      
      <GoogleMapsSection />
    </>
  );
}
