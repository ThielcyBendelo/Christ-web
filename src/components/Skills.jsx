import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Import des icônes spécifiques à l'Infrastructure et aux Réseaux
// On privilégie 'fa' pour la stabilité
// 1. Utilisez FaLinux au lieu de SiLinux pour éviter les erreurs d'import
import { 
  FaNetworkWired, FaServer, FaShieldAlt, FaTerminal, 
  FaWindows, FaLinux, FaCloud, FaMicrochip 
} from 'react-icons/fa';
import { SiCisco, SiVmware, SiWireshark } from 'react-icons/si'; 
import { VscAzure } from "react-icons/vsc"; 

// 2. Mettez à jour la correspondance (Map)
const skillIcons = {
  'Cisco Networking': SiCisco,
  'Administration Windows Server': FaWindows,
  'Linux Administration': FaLinux, // Changé ici : FaLinux est plus fiable
  'Cybersécurité & VPN': FaShieldAlt,
  'Virtualisation (VMware)': SiVmware,
  'Infrastructure Cloud': VscAzure,
  'Audit Réseau (Wireshark)': SiWireshark,
  'Support IT N3': FaTerminal,
};

export default function Skills() {
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'light');

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(document.documentElement.getAttribute('data-theme')));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  // Liste de vos compétences réelles (à ajuster selon vos assets)
  const mySkills = [
    'Cisco Networking', 'Administration Windows Server', 'Linux Administration',
    'Cybersécurité & VPN', 'Virtualisation (VMware)', 'Infrastructure Cloud',
    'Audit Réseau (Wireshark)', 'Support IT N3'
  ];

  return (
    <motion.section
      id="skills"
      className="relative pt-32 pb-24 px-6 transition-colors duration-500 overflow-hidden"
      style={{ backgroundColor: isDark ? '#050505' : '#ffffff', marginTop: 0 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Halo décoratif */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none ${isDark ? 'bg-blue-600/20' : 'bg-blue-100/50'}`} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-600 via-blue-400 to-emerald-500 text-transparent bg-clip-text uppercase tracking-tighter">
            Expertise <span className="font-light italic text-blue-500/80">Technique</span>
          </h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mb-8 shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
          <p className={`text-lg max-w-2xl mx-auto font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Maîtrise des infrastructures critiques et des solutions réseaux pour garantir la performance et la sécurité des systèmes d'information.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mySkills.map((skill, idx) => {
            const Icon = skillIcons[skill];
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative p-8 rounded-[2rem] border transition-all duration-300 text-center
                  ${isDark ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-blue-500/50' 
                           : 'bg-white border-gray-100 shadow-xl shadow-gray-100 hover:border-blue-500'}`}
              >
                {/* Icon Container */}
                <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300
                  ${isDark ? 'bg-white/5 text-blue-400 group-hover:bg-blue-500 group-hover:text-white' 
                           : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white shadow-inner'}`}>
                  {Icon ? <Icon size={30} /> : <FaMicrochip size={30} />}
                </div>

                <h3 className={`text-sm md:text-base font-bold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {skill}
                </h3>

                {/* Petit indicateur de progression subtil */}
                <div className="mt-4 w-8 h-1 bg-blue-500 mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
