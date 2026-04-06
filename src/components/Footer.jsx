import React, { useState, useEffect } from 'react';
import {
  FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaFacebook, FaWhatsapp,
} from 'react-icons/fa';
import { contact } from '../assets/assets.js';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // 1. État pour suivre le thème en temps réel
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'light');

  // 2. Synchronisation automatique avec la Navbar
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute('data-theme'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  const socialIcons = {
    Email: FaEnvelope, LinkedIn: FaLinkedin, GitHub: FaGithub,
    Instagram: FaInstagram, Facebook: FaFacebook, WhatsApp: FaWhatsapp,
  };

  return (
    <footer 
      className="py-12 border-t transition-all duration-500"
      style={{ 
        backgroundColor: isDark ? '#050505' : '#ffffff',
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0',
        color: isDark ? '#9ca3af' : '#4b5563'
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          
          {/* Logo et Description */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-2xl font-bold tracking-tight">
              <span className={`bg-gradient-to-r ${isDark ? 'from-blue-400 to-emerald-400' : 'from-blue-600 to-blue-400'} text-transparent bg-clip-text font-black`}>
                Christian Ilunga
              </span>
            </h3>
            <p className="text-sm leading-relaxed text-center md:text-left max-w-xs font-medium">
              Architecte de solutions connectées chez <span className="text-blue-500">MUAMOKEL AGENCY</span>.
            </p>
          </div>

          {/* Navigation Rapide */}
          <div className="flex flex-col items-center justify-center">
            <h4 className={`text-xs font-black uppercase tracking-[0.3em] mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-center">
              {['/about', '/skills', '/projects', '/contact'].map((path) => (
                <li key={path}>
                  <Link to={path} className="text-sm hover:text-blue-500 transition-colors font-semibold capitalize">
                    {path.replace('/', '')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Réseaux Sociaux */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className={`text-xs font-black uppercase tracking-[0.3em] mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Me Suivre
            </h4>
            <div className="flex flex-wrap justify-center md:justify-end gap-3">
              {contact.map((item) => {
                const Icon = socialIcons[item.label];
                if (!Icon) return null;
                return (
                  <a
                    key={item.label}
                    href={item.label === 'Email' ? `mailto:${item.link}` : item.link}
                    target="_blank" rel="noopener noreferrer"
                    className={`p-3 rounded-2xl border transition-all duration-300 hover:-translate-y-2 shadow-sm
                      ${isDark ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-blue-600 hover:text-white' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white'}`}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className={`mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em]
          ${isDark ? 'border-white/10 text-gray-600' : 'border-gray-200 text-gray-400'}`}>
          <p>© {currentYear} Christian Ilunga | Business</p>
          <div className="flex gap-6">
            <span className="hover:text-blue-500 cursor-pointer transition-colors">MUAMOKEL AGENCY</span>
            <span>Tous droits réservés</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
