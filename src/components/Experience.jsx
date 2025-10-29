import { experiences } from '../assets/assets';
import {
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaHome,
  FaHandshake,
  FaGraduationCap,
} from 'react-icons/fa';

const roleIcon = (type) => {
  switch ((type || '').toLowerCase()) {
    case 'internship':
    case 'stage':
      return FaGraduationCap;
    case 'contract':
    case 'freelance':
      return FaHandshake;
    case 'remote':
      return FaHome;
    case 'full-time':
    default:
      return FaBriefcase;
  }
};

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
          <span className="bg-gradient-to-r from-purple to-pink text-transparent bg-clip-text">
            Expérience
          </span>
        </h2>
        <p className="text-lg text-center text-gray-400 mb-10">Parcours professionnel et missions réalisées</p>
        <div className="space-y-6">
          {experiences.map((exp, idx) => {
            const Icon = roleIcon(exp.type);
            return (
              <div key={idx} className="group card-base card-interactive p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-dark-300 ring-1 ring-white/5 shadow-inner">
                      <Icon className="h-5 w-5 text-gray-200 group-hover:drop-shadow-glow" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-gray-400">
                    <div className="flex items-center gap-2">
                      <FaBuilding className="h-4 w-4 text-gray-300" />
                      <span className="text-blue">{exp.company}</span>
                    </div>
                    <div className="hidden md:block text-gray-600">•</div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="h-4 w-4 text-gray-300" />
                      <span>{exp.year}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
