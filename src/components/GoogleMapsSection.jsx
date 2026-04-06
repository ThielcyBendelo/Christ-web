import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

function GoogleMapsSection() {
  // Détection du thème en temps réel
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
    <section 
      className="py-20 px-6 transition-colors duration-500" 
      id="localisation"
      style={{ backgroundColor: isDark ? '#0a0a0a' : '#f8fafc' }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Titre avec dégradé */}
        <h2 className="text-3xl md:text-4xl font-black mb-6 bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 text-transparent bg-clip-text">
          Localisation professionnelle
        </h2>
        
        <p className={`text-lg mb-10 max-w-2xl mx-auto font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Retrouvez-nous à notre siège principal. Nous sommes disponibles pour tous vos projets et consultations.
        </p>

        {/* Container de la Map avec effet de bordure */}
        <div className={`rounded-3xl overflow-hidden shadow-2xl border-4 transition-all duration-500 
          ${isDark ? 'border-white/5 shadow-blue-500/5' : 'border-white shadow-gray-200'}`}>
          <iframe
            title="Google Maps localisation"
            src="https://www.google.com/maps?q=Avenue+Kimwenza+A%2FA25,+Kinshasa,+DR+Congo&output=embed"
            width="100%"
            height="400"
            style={{ border: 0, filter: isDark ? 'grayscale(0.8) invert(0.9) contrast(0.9)' : 'none' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Cartes d'informations de contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { icon: <FaMapMarkerAlt />, label: "Adresse", value: "Avenue Kimwenza A/A25, Kinshasa, DRC" },
            { icon: <FaPhoneAlt />, label: "Téléphone", value: "+243 820 000 000" }, // Complétez votre numéro ici
            { icon: <FaEnvelope />, label: "Email", value: "christiantshianyi22@gmail.com" }
          ].map((item, idx) => (
            <div 
              key={idx}
              className={`p-6 rounded-2xl border transition-all hover:-translate-y-1
                ${isDark ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-white border-gray-100 text-gray-700 shadow-sm'}`}
            >
              <div className="text-blue-500 text-xl mb-3 flex justify-center">{item.icon}</div>
              <h4 className={`text-xs font-black uppercase tracking-widest mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {item.label}
              </h4>
              <p className="text-sm font-medium break-words">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GoogleMapsSection;
