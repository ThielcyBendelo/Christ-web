import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaNetworkWired, FaServer, FaShieldAlt, FaTools, FaCloud, FaMicrochip, FaTimes, FaCheckCircle } from 'react-icons/fa';

export default function Services() {
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'light');
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(document.documentElement.getAttribute('data-theme')));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  // RÉINTÉGRATION DES 6 SERVICES AVEC TOUS LES DÉTAILS
  const services = [
    {
      title: "Infrastructures Réseaux",
      desc: "Conception et installation de réseaux LAN/WAN haute performance.",
      details: ["Audit réseau complet", "Câblage structuré", "Configuration Cisco/Juniper", "Solutions Wi-Fi 6"],
      icon: <FaNetworkWired />
    },
    {
      title: "Administration Systèmes",
      desc: "Gestion de serveurs et virtualisation pour une disponibilité 24/7.",
      details: ["Active Directory/DNS", "VMware & Hyper-V", "Windows/Linux Server", "Stockage SAN/NAS"],
      icon: <FaServer />
    },
    {
      title: "Cybersécurité",
      desc: "Protection avancée de vos données et de vos infrastructures.",
      details: ["Firewalling (Fortinet)", "VPN IPsec/SSL", "Audit de vulnérabilité", "Protection Endpoint"],
      icon: <FaShieldAlt />
    },
    {
      title: "Support & Maintenance",
      desc: "Assistance technique réactive et suivi de votre parc IT.",
      details: ["Support N1/N2/N3", "Maintenance préventive", "Helpdesk à distance", "Gestion d'inventaire"],
      icon: <FaTools />
    },
    {
      title: "Cloud & Virtualisation",
      desc: "Migration et optimisation de vos ressources dans le cloud.",
      details: ["Office 365 / Azure", "Migration Cloud", "Backup hors site", "Hébergement Web"],
      icon: <FaCloud />
    },
    {
      title: "Audit & Conseil IT",
      desc: "Expertise technique pour moderniser votre vision technologique.",
      details: ["Schéma directeur IT", "Audit de conformité", "Conseil stratégique", "Optimisation des coûts"],
      icon: <FaMicrochip />
    }
  ];

  return (
    <section id="services" className="relative pt-32 pb-24 px-6 overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: isDark ? '#050505' : '#ffffff', marginTop: 0 }}>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-600 to-emerald-500 text-transparent bg-clip-text">
            Mes Services Experts
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Solutions informatiques professionnelles par Christian Ilunga chez MUAMOKEL AGENCY.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className={`p-8 rounded-3xl border transition-all flex flex-col h-full
                ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100 shadow-sm'}`}
            >
              <div className="text-blue-500 text-4xl mb-6">{service.icon}</div>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{service.title}</h3>
              <p className={`text-sm mb-6 flex-grow ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{service.desc}</p>
              
              <ul className="mb-8 space-y-3">
                {service.details.map((detail, i) => (
                  <li key={i} className={`text-xs flex items-center gap-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <FaCheckCircle className="text-blue-500 shrink-0" /> {detail}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => setSelectedService(service)}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
              >
                Demander un devis
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL DE DEVIS COMPLET AVEC TOUS LES DÉTAILS */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md" 
            />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className={`relative w-full max-w-2xl p-8 md:p-10 rounded-[2rem] shadow-2xl border max-h-[90vh] overflow-y-auto
                ${isDark ? 'bg-gray-900 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
            >
              <button onClick={() => setSelectedService(null)} className="absolute top-6 right-6 text-gray-500 hover:text-red-500 transition-colors">
                <FaTimes size={24} />
              </button>
              
              <div className="mb-8">
                <span className="text-blue-500 font-bold uppercase tracking-widest text-xs">Formulaire de demande</span>
                <h3 className="text-3xl font-black mt-2">Devis : {selectedService.title}</h3>
              </div>
              
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <input type="text" placeholder="Nom complet" className={`w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`} required />
                  <input type="email" placeholder="Email professionnel" className={`w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`} required />
                  <input type="tel" placeholder="Téléphone (+243...)" className={`w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`} />
                </div>
                <div className="space-y-4">
                  <input type="text" placeholder="Nom de l'entreprise" className={`w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`} />
                  <select className={`w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-gray-50 border-gray-200'}`}>
                    <option>Budget estimé</option>
                    <option>Moins de 1000$</option>
                    <option>1000$ - 5000$</option>
                    <option>Plus de 5000$</option>
                  </select>
                  <textarea rows="1" placeholder="Délai souhaité" className={`w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`} />
                </div>
                <div className="md:col-span-2">
                  <textarea rows="4" placeholder="Décrivez votre projet en quelques mots..." className={`w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`} required />
                </div>
                <button type="submit" className="md:col-span-2 py-5 bg-blue-600 text-white rounded-2xl font-black shadow-xl hover:bg-blue-700 transition-all uppercase tracking-widest text-sm">
                  Envoyer ma demande de devis
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
