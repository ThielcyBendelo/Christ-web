import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';

const faqData = [
  {
    question: "Quels types de réseaux installez-vous ?",
    answer: "Conception et déploiement de réseaux LAN/WAN, configurations Cisco, VPN sécurisés et infrastructures Wi-Fi haute densité."
  },
  {
    question: "Proposez-vous un support technique à distance ?",
    answer: "Oui, j'interviens à distance pour la maintenance logicielle, la sécurité réseau et le dépannage des serveurs."
  },
  {
    question: "Comment se déroule un projet de consulting ?",
    answer: "Nous commençons par un audit de votre infrastructure, suivi d'une proposition de solutions optimisées et de l'implémentation sécurisée."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="faq" className="py-20 bg-dark-100 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Titre de Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Questions <span className="text-blue-500">Fréquentes</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Liste des Questions */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-white/5"
              >
                <span className="flex items-center gap-3 font-semibold text-gray-200">
                  <FaQuestionCircle className="text-blue-500 shrink-0" />
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  className="text-gray-500"
                >
                  <FaChevronDown />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2 pt-4">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
