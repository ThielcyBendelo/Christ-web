// Vite: import all assets in src/assets (Vite 5+ syntax)
const images = import.meta.glob('../assets/*', {
  eager: true,
  query: '?url',
  import: 'default',
});

export default function ProjetCard({ projet }) {
  let imageSrc = projet.image;
  // Robust image lookup: accept paths like './assets/name.ext' or just 'name.ext'
  if (imageSrc) {
    // extract basename (e.g., 'projet1.png')
    const parts = imageSrc.split('/');
    const basename = parts[parts.length - 1];

    // First try the exact relative key
    const directKey = `../assets/${basename}`;
    if (images[directKey]) {
      imageSrc = images[directKey];
    } else {
      // Fallback: search any images key that ends with the basename
      const matchKey = Object.keys(images).find((k) => k.endsWith(basename));
      if (matchKey) imageSrc = images[matchKey];
    }
  }
  return (
    <div className="card-base card-interactive card-hover-scale overflow-hidden relative">
      {/* Image en box-shadow derrière la carte */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(16px) brightness(0.5)',
          opacity: 0.35,
        }}
      />
      <div className="relative z-10">
        <div className="relative">
          <img
            src={imageSrc}
            alt={projet.title}
            loading="lazy"
            className="w-full h-48 md:h-56 object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-linear-to-t from-dark-100/80 to-transparent rounded-t-lg" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2">{projet.title}</h3>
          <p className="text-gray-300 mb-4">{projet.description}</p>
          {/* Technologies */}
          {projet.technologies && <TechChips items={projet.technologies} />}
          <a
            href={projet.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 bg-linear-to-r from-purple to-pink text-white rounded-lg transform transition-all
                       hover:scale-105 hover:shadow-neon-purple"
          >
            Voir le projet
          </a>
        </div>
      </div>
    </div>
  );
}

// Technology chips with icons
import { FaReact, FaCloud, FaBrain } from 'react-icons/fa';
import { FaNodeJs } from 'react-icons/fa';
import {
  SiTailwindcss,
  SiJavascript,
  SiMongodb,
  SiPython,
  SiExpress,
} from 'react-icons/si';
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

function TechChips({ items = [] }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {items.map((t, i) => {
        const Icon = techIcons[t];
        return (
          <span
            key={`${t}-${i}`}
            className="inline-flex items-center gap-1.5 text-xs px-2 py-1 bg-dark-300/90 border border-dark-300/70
                       rounded-full text-gray-300 shadow-soft hover:shadow-elevated transition-all"
            title={t}
          >
            {Icon && <Icon className="h-3.5 w-3.5" />}
            <span>{t}</span>
          </span>
        );
      })}
    </div>
  );
}
