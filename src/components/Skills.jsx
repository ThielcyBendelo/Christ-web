import { skills } from '../assets/assets';
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaGitAlt,
} from 'react-icons/fa';
import { SiJavascript } from 'react-icons/si';
import { MdDevices } from 'react-icons/md';

// Map skill label -> icon component
const skillIcons = {
  JavaScript: SiJavascript,
  React: FaReact,
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  'Node.js': FaNodeJs,
  Git: FaGitAlt,
  'Responsive Design': MdDevices,
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 bg-dark-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
          <span className="bg-gradient-to-r from-purple to-pink text-transparent bg-clip-text">
            Compétences
          </span>
        </h2>
        <p className="text-lg text-center text-gray-400 mb-10">Voici un aperçu de mes principales compétences techniques</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, idx) => {
            const Icon = skillIcons[skill];
            return (
              <div
                key={idx}
                className="group card-base card-interactive card-hover-scale p-5 text-center select-none"
              >
                <div
                  className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-dark-200
                                ring-1 ring-white/5 group-hover:ring-[var(--accent-1)]/40 transition-all shadow-inner"
                >
                  {Icon ? (
                    <Icon className="h-6 w-6 text-gray-200 group-hover:drop-shadow-glow" />
                  ) : (
                    <span className="text-gray-300 text-lg">{skill[0]}</span>
                  )}
                </div>
                <span className="text-gray-200 font-medium tracking-wide">
                  {skill}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
