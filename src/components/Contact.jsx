import { useState, useEffect } from 'react';
import { contact } from '../assets/assets.js';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { init, send } from '@emailjs/browser';
import { FaEnvelope, FaLinkedin, FaInstagram, FaFacebook, FaWhatsapp, FaPaperPlane, FaHeadset } from 'react-icons/fa';
import notificationService from '../services/notificationService';
import analyticsService from '../services/analyticsService';
import messagingService from '../dashboard/services/messagingService';

const contactIcons = {
  Email: FaEnvelope,
  LinkedIn: FaLinkedin,
  Instagram: FaInstagram,
  Facebook: FaFacebook,
  WhatsApp: FaWhatsapp,
};

export default function Contact() {
  const [elementRef, isVisible] = useIntersectionObserver();
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'light');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // EmailJS Credentials
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

  useEffect(() => {
    try { if (EMAILJS_PUBLIC_KEY) init(EMAILJS_PUBLIC_KEY); } catch (err) { console.warn(err); }
    
    const observer = new MutationObserver(() => setTheme(document.documentElement.getAttribute('data-theme')));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, [EMAILJS_PUBLIC_KEY]);

  const isDark = theme === 'dark';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = notificationService.loading('Envoi de votre message...');

    // Fallback mailto si non configuré
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      window.location.href = `mailto:christiantshianyi22@://gmail.com{formData.message}`;
      notificationService.dismiss(loadingToast);
      notificationService.success('Client email ouvert !');
      return;
    }

    try {
      await send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message,
        to_email: 'christiantshianyi22@gmail.com',
      });
      
      notificationService.dismiss(loadingToast);
      notificationService.success('Message envoyé avec succès !');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      notificationService.dismiss(loadingToast);
      notificationService.error("Erreur lors de l'envoi.");
    }
  };

  return (
    <section 
      ref={elementRef} 
      id="contact" 
      className="relative pt-32 pb-24 px-6 transition-colors duration-500 overflow-hidden"
      style={{ backgroundColor: isDark ? '#050505' : '#ffffff', marginTop: 0 }}
    >
      <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-600 via-blue-400 to-emerald-500 text-transparent bg-clip-text uppercase tracking-tighter">
            Me <span className="font-light italic text-blue-500/80">Contacter</span>
          </h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mb-8 shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Texte de gauche & Infos */}
          <div className="space-y-8">
            <div className={`p-8 rounded-[2rem] border transition-all ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100 shadow-xl shadow-gray-200'}`}>
              <FaHeadset className="text-blue-500 text-4xl mb-6" />
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Parlons de votre projet</h3>
              <p className={`mb-8 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Besoin d'un audit réseau, d'une installation serveur ou d'un support IT ? Je suis disponible pour transformer vos besoins techniques en solutions réelles.
              </p>
              
              <div className="flex gap-4">
                {contact.map((item) => {
                  const Icon = contactIcons[item.label];
                  if (!Icon) return null;
                  return (
                    <a key={item.label} href={item.link} target="_blank" rel="noreferrer"
                       className={`p-4 rounded-xl border transition-all hover:-translate-y-1 ${isDark ? 'bg-white/5 border-white/10 text-gray-400 hover:text-blue-400' : 'bg-white border-gray-200 text-gray-600 hover:text-blue-600'}`}>
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Formulaire stylisé */}
          <form onSubmit={handleSubmit} className={`p-8 md:p-10 rounded-[2.5rem] border transition-all ${isDark ? 'bg-white/[0.03] border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-2xl shadow-gray-200'}`}>
            <div className="space-y-5">
              <div>
                <label className={`block text-xs font-black uppercase tracking-widest mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Votre Nom</label>
                <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required placeholder="Ex: Jean Dupont"
                       className={`w-full px-5 py-4 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500 transition-all ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`} />
              </div>

              <div>
                <label className={`block text-xs font-black uppercase tracking-widest mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Email Professionnel</label>
                <input type="email" name="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required placeholder="nom@entreprise.com"
                       className={`w-full px-5 py-4 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500 transition-all ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`} />
              </div>

              <div>
                <label className={`block text-xs font-black uppercase tracking-widest mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Message</label>
                <textarea name="message" rows="4" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required placeholder="Décrivez votre besoin..."
                          className={`w-full px-5 py-4 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500 transition-all ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`} />
              </div>

              <button type="submit" className="w-full flex items-center justify-center gap-3 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black shadow-xl shadow-blue-900/20 uppercase tracking-widest text-sm transition-all active:scale-95">
                <FaPaperPlane /> Envoyer le message
              </button>
            </div>
          </form>

        </div>
      </div>

      {/* Décoration d'arrière-plan */}
      <div className={`absolute -top-24 -right-24 w-96 h-96 blur-[150px] rounded-full pointer-events-none ${isDark ? 'bg-blue-600/10' : 'bg-blue-100/30'}`} />
    </section>
  );
}
