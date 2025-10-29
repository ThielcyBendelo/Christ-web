import { useState, useEffect } from 'react';
import { contact } from '../assets/assets';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { init, send } from '@emailjs/browser';
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
} from 'react-icons/fa';

const contactIcons = {
  Email: FaEnvelope,
  LinkedIn: FaLinkedin,
  GitHub: FaGithub,
  Instagram: FaInstagram,
  Facebook: FaFacebook,
  WhatsApp: FaWhatsapp,
};

export default function Contact() {
  const [elementRef, isVisible] = useIntersectionObserver();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  // Read EmailJS credentials from Vite environment variables.
  // Create a .env file at the project root (see .env.example) to set these.
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

  useEffect(() => {
    // Initialize EmailJS with your public key if available
    try {
      if (EMAILJS_PUBLIC_KEY) init(EMAILJS_PUBLIC_KEY);
    } catch (err) {
      console.warn('EmailJS init failed', err);
    }
  }, [EMAILJS_PUBLIC_KEY]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Envoi en cours...' });

    // If EmailJS is not configured, fallback to mailto
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      const mailtoLink = `mailto:bendelothielcy@gmail.com?subject=Message de ${encodeURIComponent(
        formData.name
      )}&body=${encodeURIComponent(
        `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoLink;
      setStatus({
        type: 'success',
        message: 'Ouverture de votre client email...',
      });
      return;
    }

    // Send via EmailJS (client-side)
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'bendelothielcy@gmail.com',
      };

      await send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

      setStatus({
        type: 'success',
        message: 'Message envoyé avec succès ! Merci.',
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('EmailJS send error', err);
      // Fallback to mailto on error
      const mailtoLink = `mailto:bendelothielcy@gmail.com?subject=Message de ${encodeURIComponent(
        formData.name
      )}&body=${encodeURIComponent(
        `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoLink;
      setStatus({
        type: 'error',
        message:
          'Échec EmailJS. Ouverture de votre client email comme alternative...',
      });
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section ref={elementRef} id="contact" className="py-20 px-4 bg-dark-200">
      <div
        className={`max-w-4xl mx-auto transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="bg-linear-to-r from-purple to-pink text-transparent bg-clip-text">
            Contact
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {(!EMAILJS_SERVICE_ID ||
              !EMAILJS_TEMPLATE_ID ||
              !EMAILJS_PUBLIC_KEY) && (
              <div className="p-4 bg-yellow-900/30 border border-yellow-700 rounded-lg">
                <p className="text-yellow-300 text-sm">
                  ⚠️ EmailJS non configuré. Le formulaire utilisera votre client
                  email par défaut.
                </p>
              </div>
            )}

            <div>
              <label className="block text-gray-300 mb-2">Nom</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-dark-300 border border-dark-400 rounded-lg
                         text-white focus:outline-none focus:border-purple
                         transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-dark-300 border border-dark-400 rounded-lg
                         text-white focus:outline-none focus:border-purple
                         transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 bg-dark-300 border border-dark-400 rounded-lg
                         text-white focus:outline-none focus:border-purple
                         transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-3 bg-linear-to-r from-purple to-pink text-white 
                       rounded-lg transform transition-all hover:scale-105 
                       hover:shadow-lg disabled:opacity-50"
              disabled={status.type === 'loading'}
            >
              {status.type === 'loading' ? 'Envoi...' : 'Envoyer le message'}
            </button>

            {status.message && (
              <p
                className={`text-center ${
                  status.type === 'success' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {status.message}
              </p>
            )}
          </form>

          {/* Liens de contact */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-300 mb-4">
              Autres moyens de me contacter
            </h3>
            <div className="space-y-4">
              {contact.map((c, idx) => {
                const Icon = contactIcons[c.label];
                let href = c.link;
                if (c.label === 'Email' && !/^mailto:/i.test(href))
                  href = `mailto:${href}`;
                return (
                  <a
                    key={idx}
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={
                      href.startsWith('mailto:')
                        ? undefined
                        : 'noopener noreferrer'
                    }
                    className="flex items-center gap-3 p-4 bg-dark-300 text-gray-300 rounded-lg
                             transform transition-all hover:scale-[1.02] hover:bg-dark-400 
                             hover:text-white border border-dark-300 hover:border-purple"
                  >
                    {Icon && <Icon className="text-xl" />}
                    <span>{c.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
