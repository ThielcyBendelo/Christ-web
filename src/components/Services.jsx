import React, { useState } from "react";
import QuoteModal from "./QuoteModal";

const services = [
  {
    title: "IT Support",
    description:
      "Assistance utilisateurs (niveau 1 & 2). dépannage matériel et logiciel. installation et configuration de systèmes informatiques. maintenance préventive et corrective. gestion des incidents et des demandes de service. support à distance et sur site.",
    template:
      "Contrat annuel, intervention à la demande, monitoring serveur, gestion des sauvegardes, optimisation réseau.",
    price: "À partir de $",
    duration: " à  semaines",
    benefits: ["Support 24/7", "Monitoring proactif", "Reporting mensuel", "Interventions illimitées  "],
    action: "Demander un devis",
  },
  {
    title: "Réseaux informatiques",
    description:
      "Conception et administration de réseaux LAN/WAN. Configuration routeurs, switches et point d'accès. Calable réseaux (cuivre & fibre optique).",
    template:
      "Audit réseau, configuration équipements, optimisation performance, sécurité réseau, monitoring proactif.",
    price: "À partir de $",
    duration: " à  semaines",
    benefits: ["Réseau performant", "Sécurité renforcée", "Support dédié", "Documentation complète"],
    action: "Demander un devis",
  },
  {
    title: "Vidéosurveillance",
    description:
      "Installation de caméras IP et analogiques. Configuration NVR/DVR. Accès à distance et surveillance en temps réel. Maintenance et optimisation des systmes et sécurité.",
    template:
      "Étude de site, installation caméras, configuration enregistrement, accès à distance, maintenance régulière.",
    price: "À partir de $",
    duration: " à  semaines",
    benefits: ["Surveillance 24/7", "Accès à distance", "Maintenance régulière", "Système évolutif"],
    action: "Demander un devis",
  },
];

function Services() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleQuoteClick = (serviceKey) => {
    setSelectedService(serviceKey);
    setModalOpen(true);
  };

  return (
    <section className="py-10 px-4 bg-gradient-to-b from-black-400 via-bleu-400 to-gray-50" id="services">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4 text-center">
          <h2 className="text-4xl md:font-bold mb-4 bg-gradient-to-r from-blue-600 via-blue-500 to-green-500 text-transparent bg-clip-text mb-2 mt-16 ">Mes Services</h2>
          <p className="text-lg text-gray-400 font-medium max-w-2xl mx-auto mb-6">Découvrez l'ensemble de mes préstations</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-balck-400 via-bleu-400 to-black-400 rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center border border-blue-100 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 hover:bg-black-400 group"
              style={{ animation: `fadeInUp 0.7s cubic-bezier(.39,.575,.565,1) ${idx * 0.15}s both` }}
            >
              <div className="text-6xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">{service.icon}</div>
              <h3 className="text-2xl md:font-bold mb-4 bg-gradient-to-r from-blue-600 via-blue-500 to-green-500 text-transparent bg-clip-text">{service.title}</h3>
              <p className="text-gray-400 mb-2 font-medium">{service.description}</p>
              <div className="mb-2 text-sm text-indigo-700 font-semibold">Template : {service.template}</div>
              <div className="mb-2 text-sm text-blue-700"><span className="inline-block bg-blue-100 text-blue-800 rounded px-2 py-1 mr-1">Durée estimée :</span> {service.duration}</div>
              <div className="mb-2 flex flex-wrap justify-center gap-2">
                {service.benefits && service.benefits.map((b, i) => (
                  <span key={i} className="inline-block bg-green-100 text-green-800 rounded-full px-3 py-1 text-xs font-semibold shadow">{b}</span>
                ))}
              </div>
              <div className="mb-2 text-sm">
                <a
                  href={service.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-blue-600 underline hover:text-blue-800 font-semibold transition"
                >
                  Voir un exemple
                </a>
              </div>
              <div className="mb-4 text-lg font-bold text-green-700">Tarif : {service.price}</div>
              <button
                className="mt-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition-transform duration-300 transform hover:scale-105 focus:scale-100 active:scale-95"
                onClick={() => handleQuoteClick(getServiceKey(service.title))}
              >
                {service.action}
              </button>
            </div>
          ))}
        </div>
        <QuoteModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          defaultService={selectedService}
        />
        <style>{`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(40px) scale(0.96); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
      </div>
    </section>
  );
  // Helper pour convertir le titre en clé EmailJS
  function getServiceKey(title) {
    switch (title) {
      case "IT Support": return "support";
      case "Réseaux informatiques": return "reseaux";
      case "Vidéosurveillance": return "videosurveillance";
      default: return "autre";
    }
  }
}

export default Services;