import useParallax from '../hooks/useParallax';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import bgImage from '../assets/background.jpg';
import profileImage from '../assets/profile.jpg';

export default function Hero() {
  const scrollY = useParallax();
  const [elementRef, isVisible] = useIntersectionObserver();

  return (
    <section
      ref={elementRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.3)',
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-100/90 to-dark-100/70 z-10" />

      <div
        className={`relative z-20 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        {/* Profile Image */}
        <div className="mb-8 flex justify-center">
          <img
            src={profileImage}
            alt="Ir Bendelo Thielcy"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-purple shadow-neon-purple"
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 typewriter">
          <span className="bg-linear-to-r from-purple to-pink text-transparent bg-clip-text">
            Bonjour! je suis, Bendelo
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-8">
          Développeur Web React & JavaScript
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="#contact"
            className="px-8 py-3 bg-linear-to-r from-purple to-pink text-white rounded-lg
                     transform transition-all hover:scale-105 hover:shadow-lg"
          >
            Me contacter
          </a>
          <a
            href="#projects"
            className="px-8 py-3 bg-dark-300 text-white rounded-lg
                     transform transition-all hover:scale-105 hover:shadow-lg
                     border border-purple"
          >
            Voir mes projets
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce w-6 h-6 border-2 border-purple rounded-full"></div>
      </div>
    </section>
  );
}
