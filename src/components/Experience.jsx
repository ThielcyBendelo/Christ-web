import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaNetworkWired, FaServer, FaShieldAlt, FaTerminal, FaProjectDiagram, FaChevronRight } from 'react-icons/fa';

export default function Experience() {
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'light');

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(document.documentElement.getAttribute('data-theme')));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  const experiences = [
    {
      company: "MUAMOKEL AGENCY",
      role: "Ingénieur Réseaux & Systèmes",
      period: "2023 - Présent",
      icon: <FaNetworkWired />,
      tasks: ["Déploiement d'infrastructures Cisco sécurisées", "Administration Windows Server & Linux", "Support technique N3"],
      tags: ["Cisco", "Active Directory", "VPN", "Virtualisation"]
    },
    {
      company: "Consultant IT / Freelance",
      role: "Spécialiste Support & Maintenance",
      period: "2021 - 2023",
      icon: <FaServer />,
      tasks: ["Audit de parcs informatiques", "Maintenance préventive des serveurs", "Optimisation des performances LAN"],
      tags: ["Audit", "Hardware", "Troubleshooting", "LAN/WAN"]
    },
    {
      company: "Formation & Certification",
      role: "Expert Réseaux Informatiques",
      period: "2021",
      icon: <FaShieldAlt />,
      tasks: ["Conception d'architectures réseau", "Sécurisation des flux de données", "Projets académiques complexes"],
      tags: ["CyberSecurity", "Protocols", "Routing", "OSI"]
    }
  ];

  return (
    <section id="experience" className="relative pt-32 pb-24 px-6 overflow-hidden transition-all duration-500"
      style={{ backgroundColor: isDark ? '#050505' : '#ffffff', marginTop: 0 }}>
      
      {/* Effet de Halo décoratif en fond */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 blur-[150px] opacity-20 pointer-events-none ${isDark ? 'bg-blue-600' : 'bg-blue-300'}`} />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-600 via-blue-400 to-emerald-500 text-transparent bg-clip-text uppercase tracking-tighter"
          >
            Expériences <span className="italic font-light">Pro</span>
          </motion.h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full shadow-[0_0_15px_rgba(37,99,235,0.6)]" />
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="relative">
          {/* Ligne verticale centrale stylisée */}
          <div className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 transform -translate-x-1/2 ${isDark ? 'bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent' : 'bg-gray-200'}`} />

          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`relative mb-20 md:flex items-center justify-between w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Le Badge icône sur la ligne */}
              <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] z-20">
                {exp.icon}
              </div>

              {/* Contenu de l'expérience */}
              <div className={`ml-12 md:ml-0 md:w-[45%] group`}>
                <div className={`p-8 rounded-[2rem] border transition-all duration-500 group-hover:scale-[1.02]
                  ${isDark ? 'bg-white/[0.03] border-white/10 hover:border-blue-500/40 hover:bg-white/[0.05]' : 'bg-white border-gray-100 shadow-xl shadow-gray-100 hover:border-blue-500'}`}>
                  
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-black text-blue-500 uppercase tracking-widest">{exp.period}</span>
                    <FaProjectDiagram className={`${isDark ? 'text-white/10' : 'text-gray-200'}`} />
                  </div>

                  <h3 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{exp.role}</h3>
                  <h4 className="text-blue-500 font-semibold mb-6 flex items-center gap-2">
                    <FaTerminal size={12} /> {exp.company}
                  </h4>

                  <ul className="space-y-3 mb-8">
                    {exp.tasks.map((task, i) => (
                      <li key={i} className={`flex items-start gap-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <FaChevronRight className="mt-1 text-blue-500 text-[10px] shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>

                  {/* Tags techniques */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {exp.tags.map((tag, i) => (
                      <span key={i} className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider
                        ${isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-gray-100 text-gray-500'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
