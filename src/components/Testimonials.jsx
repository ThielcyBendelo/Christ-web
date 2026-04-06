import React, { useState, useEffect } from 'react';
import dataService from '../services/dataService';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar, FaTimes, FaPlus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const initialTestimonials = [
  {
    name: 'Alice',
    role: 'Responsable IT',
    company: 'Tech Solutions',
    project: 'Audit Réseau',
    date: '2025',
    rating: 5,
    text: "Christian a transformé notre infrastructure. Son expertise en réseaux Cisco nous a permis de gagner en stabilité et en sécurité. Un vrai professionnel !",
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'light');
  const [form, setForm] = useState({ name: '', project: '', text: '', rating: 5 });

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(document.documentElement.getAttribute('data-theme')));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  const goToPrevious = () => setCurrentIndex((prev) => prev === 0 ? testimonials.length - 1 : prev - 1);
  const goToNext = () => setCurrentIndex((prev) => prev === testimonials.length - 1 ? 0 : prev + 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'rating' ? Number(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTestimonial = { ...form, date: new Date().getFullYear(), role: 'Client', company: 'Partenaire' };
    setTestimonials((prev) => [...prev, newTestimonial]);
    setCurrentIndex(testimonials.length);
    setShowModal(false);
    setForm({ name: '', project: '', text: '', rating: 5 });
  };

  return (
    <section 
      id="testimonials" 
      className="relative pt-32 pb-24 px-6 overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: isDark ? '#050505' : '#ffffff', marginTop: 0 }}
    >
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Titre Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-600 to-emerald-500 text-transparent bg-clip-text">
            Témoignages Clients
          </h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
          
          <button
            onClick={() => setShowModal(true)}
            className="group flex items-center gap-2 mx-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95"
          >
            <FaPlus size={14} /> Laisser un avis
          </button>
        </div>

        {/* Slider de Témoignages */}
        <div className="relative min-h-[400px] flex items-center">
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.4 }}
              className={`w-full p-8 md:p-12 rounded-[2.5rem] border shadow-2xl relative
                ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100'}`}
            >
              <FaQuoteLeft className="text-blue-500/20 text-6xl absolute top-8 left-8" />
              
              <div className="relative z-10">
                <div className="flex gap-1 mb-6 text-yellow-500">
                  {[...Array(testimonials[currentIndex]?.rating)].map((_, i) => <FaStar key={i} />)}
                </div>

                <blockquote className={`text-xl md:text-2xl leading-relaxed mb-8 font-medium italic ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  "{testimonials[currentIndex]?.text}"
                </blockquote>

                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 p-1">
                    <div className={`w-full h-full rounded-[14px] flex items-center justify-center font-black text-xl 
                      ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-blue-600'}`}>
                      {testimonials[currentIndex]?.name?.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{testimonials[currentIndex]?.name}</h4>
                    <p className="text-blue-500 font-bold text-sm uppercase tracking-wider">{testimonials[currentIndex]?.project}</p>
                    <p className="text-xs text-gray-500">{testimonials[currentIndex]?.role} • {testimonials[currentIndex]?.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
            <button onClick={goToPrevious} className={`p-4 rounded-full border transition-all ${isDark ? 'bg-white/5 border-white/10 text-white hover:bg-blue-600' : 'bg-white border-gray-200 text-gray-900 hover:bg-blue-600 hover:text-white'}`}>
              <FaChevronLeft />
            </button>
            <button onClick={goToNext} className={`p-4 rounded-full border transition-all ${isDark ? 'bg-white/5 border-white/10 text-white hover:bg-blue-600' : 'bg-white border-gray-200 text-gray-900 hover:bg-blue-600 hover:text-white'}`}>
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Formulaire */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className={`relative w-full max-w-lg p-8 rounded-[2rem] shadow-2xl border ${isDark ? 'bg-gray-900 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
            >
              <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-gray-500 hover:text-red-500 transition-colors"><FaTimes size={20} /></button>
              <h3 className="text-2xl font-black mb-6 text-center">Partagez votre expérience</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Votre nom complet" className={`w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`} required />
                <input type="text" name="project" value={form.project} onChange={handleChange} placeholder="Nom du projet" className={`w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`} required />
                <textarea name="text" value={form.text} onChange={handleChange} placeholder="Votre témoignage..." className={`w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`} rows={4} required />
                <select name="rating" value={form.rating} onChange={handleChange} className={`w-full p-4 rounded-xl border outline-none ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                  {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} ★ - Excellent</option>)}
                </select>
                <button type="submit" className="w-full py-4 bg-blue-600 text-white font-black rounded-xl shadow-xl uppercase tracking-widest text-sm">Publier mon avis</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
