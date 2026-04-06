import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaBars, FaTimes, FaChevronDown, FaHome, FaUser, 
  FaCogs, FaBriefcase, FaCode, FaAward, FaComments 
} from 'react-icons/fa';
import { MdOutlineLightMode, MdOutlineDarkMode, MdVolumeUp, MdVolumeOff } from 'react-icons/md';
import notificationService from '../services/notificationService';
import audioService from '../services/audioService';
import analyticsService from '../services/analyticsService';
import authService from '../services/authService';

export default function NavbarSecured() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(audioService.isEnabled());
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Synchronisation Auth
  useEffect(() => {
    authService.initialize();
    const interval = setInterval(() => authService.isLoggedIn(), 1000);
    return () => clearInterval(interval);
  }, []);

  // Synchronisation Thème
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    audioService.playClick();
    notificationService.info(`Mode ${newTheme === 'dark' ? 'sombre' : 'clair'} activé`);
  };

  const handleNavClick = (section, e) => {
    e.preventDefault();
    setIsOpen(false);
    audioService.playNavigate();
    navigate(section);
  };

  // NavGroups avec Icônes ajoutées
  const navGroups = [
    { items: [{ href: '/', label: 'Accueil', icon: <FaHome /> }] },
    { items: [{ href: '/about', label: 'À propos', icon: <FaUser /> }] },
    { items: [{ href: '/services', label: 'Services', icon: <FaCogs /> }] },
    {
      label: 'Professionnel',
      icon: <FaAward />,
      items: [
        { href: '/experience', label: 'Expérience', icon: <FaBriefcase /> },
        { href: '/work', label: 'Travail', icon: <FaCode /> },
        { href: '/skills', label: 'Compétences', icon: <FaAward /> },
      ],
    },
    { items: [{ href: '/testimonials', label: 'Témoignages', icon: <FaComments /> }] },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
              <span className="text-xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                MON PORTFOLIO
              </span>
            </div>

            {/* Desktop Menu (Inchangé mais stylisé) */}
            <div className="hidden md:flex items-center gap-6">
              {navGroups.map((group, idx) => (
                <div key={idx} className="relative group/item">
                  {group.label ? (
                    <button className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">
                      {group.label} <FaChevronDown className="text-[10px] group-hover/item:rotate-180 transition-transform" />
                    </button>
                  ) : (
                    <button onClick={(e) => handleNavClick(group.items[0].href, e)} className="px-3 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">
                      {group.items[0].label}
                    </button>
                  )}
                  {group.label && (
                    <div className="absolute left-0 mt-0 w-52 pt-2 opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 translate-y-2 group-hover/item:translate-y-0">
                      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden p-2">
                        {group.items.map((item) => (
                          <button key={item.href} onClick={(e) => handleNavClick(item.href, e)} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 rounded-xl transition-colors">
                            {item.icon} {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Barre d'outils (Thème, Audio, Burger) */}
            <div className="flex items-center gap-1 sm:gap-3">
              <button onClick={toggleTheme} className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:scale-110 transition-all">
                {theme === 'dark' ? <MdOutlineLightMode size={20} /> : <MdOutlineDarkMode size={20} />}
              </button>
              <button onClick={() => { audioService.toggle(); setAudioEnabled(!audioEnabled); }} className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:scale-110 transition-all">
                {audioEnabled ? <MdVolumeUp size={20} /> : <MdVolumeOff size={20} />}
              </button>
              <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2.5 text-blue-600 dark:text-blue-400">
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* MENU MOBILE AMÉLIORÉ (Slide-down Moderne) */}
        <div className={`md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-2xl transition-all duration-300 ease-in-out ${isOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-10 opacity-0 invisible'}`}>
          <div className="p-4 max-h-[80vh] overflow-y-auto">
            {navGroups.map((group, idx) => (
              <div key={idx} className="mb-4">
                {group.label ? (
                  <div className="space-y-1">
                    <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-2">{group.label}</p>
                    <div className="grid grid-cols-1 gap-1">
                      {group.items.map((item) => (
                        <button key={item.href} onClick={(e) => handleNavClick(item.href, e)} className="flex items-center gap-4 px-4 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-200 font-bold active:scale-95 transition-all">
                          <span className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-lg">{item.icon}</span>
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button onClick={(e) => handleNavClick(group.items[0].href, e)} className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-200 font-bold active:scale-95 transition-all">
                    <span className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-lg">{group.items[0].icon}</span>
                    {group.items[0].label}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
