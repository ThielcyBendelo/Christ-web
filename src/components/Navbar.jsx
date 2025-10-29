import { useState, useEffect } from 'react';
import { GiEagleEmblem } from 'react-icons/gi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored) return stored;
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      )
        return 'dark';
    } catch {
      // ignore errors (e.g., SSR or private mode)
    }
    return 'light';
  });

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    } catch {
      // ignore write errors
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <nav className="fixed top-0 left-0 right-0 bg-dark-100/80 backdrop-blur z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <GiEagleEmblem className="text-3xl text-[var(--accent-1)]" />
            <span className="text-2xl font-bold bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-transparent bg-clip-text">
              Ir Bendelo
            </span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a
              href="#home"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Accueil
            </a>
            <a
              href="#about"
              className="text-gray-300 hover:text-white transition-colors"
            >
              À propos
            </a>
            <a
              href="#skills"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Compétences
            </a>
            <a
              href="#experience"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Expérience
            </a>
            <a
              href="#projects"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Projets
            </a>
            <a
              href="#work"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Travail
            </a>
            <a
              href="#contact"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Basculer thème"
              className="p-2 rounded-md text-gray-300 hover:text-white"
            >
              {theme === 'dark' ? (
                // Sun icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 6.636L5.636 5.222m12.728 0l-1.414 1.414M7.05 17.364l-1.414 1.414M12 7a5 5 0 100 10 5 5 0 000-10z"
                  />
                </svg>
              ) : (
                // Moon icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                  />
                </svg>
              )}
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white p-2 rounded-md"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-dark-200`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#home"
            className="block px-3 py-2 text-gray-300 hover:text-white"
          >
            Accueil
          </a>
          <a
            href="#about"
            className="block px-3 py-2 text-gray-300 hover:text-white"
          >
            À propos
          </a>
          <a
            href="#skills"
            className="block px-3 py-2 text-gray-300 hover:text-white"
          >
            Compétences
          </a>
          <a
            href="#experience"
            className="block px-3 py-2 text-gray-300 hover:text-white"
          >
            Expérience
          </a>
          <a
            href="#projects"
            className="block px-3 py-2 text-gray-300 hover:text-white"
          >
            Projets
          </a>
          <a
            href="#work"
            className="block px-3 py-2 text-gray-300 hover:text-white"
          >
            Travail
          </a>
          <a
            href="#contact"
            className="block px-3 py-2 text-gray-300 hover:text-white"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
