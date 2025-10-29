import React, { useState, useMemo } from 'react';
import { projets } from '../assets/assets';
import ProjetCard from './ProjetCard';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { FaReact, FaCloud, FaBrain } from 'react-icons/fa';
import {
  SiTailwindcss,
  SiJavascript,
  SiMongodb,
  SiPython,
  SiExpress,
} from 'react-icons/si';
import { FaNodeJs } from 'react-icons/fa';
import { GiCircuitry } from 'react-icons/gi';

const techIcons = {
  React: FaReact,
  Tailwind: SiTailwindcss,
  JavaScript: SiJavascript,
  'Node.js': FaNodeJs,
  MongoDB: SiMongodb,
  Cloud: FaCloud,
  AI: FaBrain,
  Python: SiPython,
  IoT: GiCircuitry,
  Express: SiExpress,
};

export default function Projet() {
  const [elementRef, isVisible] = useIntersectionObserver();
  const [activeFilter, setActiveFilter] = useState('tous');

  // Extraire toutes les technologies uniques des projets
  const technologies = useMemo(() => {
    const techSet = new Set();
    projets.forEach((projet) => {
      projet.technologies?.forEach((tech) => techSet.add(tech));
    });
    return ['tous', ...Array.from(techSet)];
  }, []);

  // Filtrer les projets
  const filteredProjets = useMemo(() => {
    if (activeFilter === 'tous') return projets;
    return projets.filter((projet) =>
      projet.technologies?.includes(activeFilter)
    );
  }, [activeFilter]);

  return (
    <section ref={elementRef} id="projects" className="py-20 px-4 bg-dark-200 relative overflow-hidden">
      {/* Illustration de fond décorative */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-blue rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Icône décorative au-dessus du titre */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple to-pink blur-xl opacity-50"></div>
            <div className="relative bg-dark-300 p-4 rounded-2xl ring-1 ring-white/10 shadow-elevated">
              <svg 
                className="w-12 h-12 text-transparent bg-gradient-to-r from-purple to-pink bg-clip-text"
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
          <span className="bg-linear-to-r from-purple to-pink text-transparent bg-clip-text">
            Projets
          </span>
        </h2>
        <p className="text-lg text-center text-gray-400 mb-10">Découvrez mes réalisations techniques</p>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {technologies.map((tech) => {
            const Icon = techIcons[tech];
            const isActive = activeFilter === tech;
            return (
              <button
                key={tech}
                onClick={() => setActiveFilter(tech)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all
                           ${
                             isActive
                               ? 'bg-linear-to-r from-purple to-pink text-white border-transparent shadow-elevated'
                               : 'bg-dark-300 text-gray-300 hover:bg-dark-400 border-dark-300/60 shadow-soft hover:shadow-elevated'
                           }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                <span>{tech}</span>
              </button>
            );
          })}
        </div>

        {/* Grille de projets avec animation */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {filteredProjets.map((projet, idx) => (
            <div
              key={idx}
              className="transition-all duration-500"
              style={{
                transitionDelay: `${idx * 100}ms`,
              }}
            >
              <ProjetCard projet={projet} />
            </div>
          ))}
        </div>

        {/* Message si aucun projet */}
        {filteredProjets.length === 0 && (
          <p className="text-center text-gray-400 mt-8">
            Aucun projet ne correspond à ce filtre.
          </p>
        )}
      </div>
    </section>
  );
}
