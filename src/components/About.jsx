import { about } from '../assets/assets';
import profileImg from '../assets/profile.jpg';
import bgImage from '../assets/image.programmation2.jpg';

export default function About() {
  return (
    <section id="about" className="relative py-20 px-4 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.15)',
          opacity: 0.6,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <img
          src={profileImg}
          alt="Profil"
          className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover mb-10 shadow-lg border-4 border-purple hover:scale-105 transition-transform duration-300"
        />
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          <span className="bg-gradient-to-r from-purple to-pink text-transparent bg-clip-text">
            À propos
          </span>
        </h2>
        <p className="text-lg text-gray-300 text-center leading-relaxed max-w-2xl">
          {about}
        </p>
      </div>
    </section>
  );
}
