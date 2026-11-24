import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { soundEngine } from '../utils/soundEngine';

interface NavbarProps {
  onNavigate: (id: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  soundEnabled,
  onToggleSound,
}) => {
  const [activeId, setActiveId] = useState<string>('hero');

  useEffect(() => {
    const sectionIds = ['hero', 'about', 'work', 'experience', 'clients', 'testimonials', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === 'experience' || id === 'clients' || id === 'testimonials') {
              setActiveId('work');
            } else {
              setActiveId(id);
            }
          }
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    soundEngine.playTick(380);
    onNavigate(id);
  };

  return (
    <>
      {/* Top-Left Brand Mark + Top-Right Stacked Nav (authentic minhpham.design corner frame) */}
      <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
        <div className="px-6 py-5 md:px-12 md:py-9 flex items-start justify-between">
          {/* Top-Left Logo Emblem */}
          <a
            href="#hero"
            onClick={(e) => handleAnchor(e, 'hero')}
            aria-label="Arman Kabir — Back to top"
            className="pointer-events-auto group inline-flex items-center justify-center w-10 h-10 text-[#b7ab98] hover:text-[#eb5939] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#eb5939]"
          >
            <svg
              viewBox="0 0 36 36"
              fill="none"
              className="w-8 h-8 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              aria-hidden="true"
            >
              <circle
                cx="18"
                cy="18"
                r="16"
                stroke="currentColor"
                strokeWidth="1.5"
                className="opacity-85"
              />
              <path
                d="M9.5 23L13.5 13L17.5 23M11.1 19.2H15.9M20 13V23M26 13L20 18L26.2 23"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          {/* Top-Right Stacked Navigation (Desktop vertical stack / Mobile compact single row) */}
          <nav
            aria-label="Primary navigation"
            className="pointer-events-auto flex flex-row md:flex-col items-center md:items-end gap-5 md:gap-2"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleAnchor(e, item.id)}
                  onPointerEnter={() => soundEngine.playTick(320)}
                  className={`relative py-1 md:py-0.5 text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#eb5939] ${
                    isActive
                      ? 'text-[#b7ab98]'
                      : 'text-[#b7ab98]/45 hover:text-[#eb5939] md:hover:-translate-x-1'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="corner-nav-indicator"
                      transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                      aria-hidden="true"
                      className="hidden md:block absolute -left-3.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#eb5939]"
                    />
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Bottom-Left Vertical Social Icons (Desktop) */}
      <aside
        aria-label="Social links"
        className="fixed bottom-9 left-12 z-40 hidden md:flex flex-col items-center gap-5"
      >
        {/* GitHub */}
        <a
          href="https://github.com/Armankabirr"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="GitHub"
          onPointerEnter={() => soundEngine.playTick(340)}
          className="text-[#b7ab98]/55 hover:text-[#eb5939] hover:-translate-y-0.5 transition-all duration-200 p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#eb5939]"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/armankabiir"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Instagram"
          onPointerEnter={() => soundEngine.playTick(340)}
          className="text-[#b7ab98]/55 hover:text-[#eb5939] hover:-translate-y-0.5 transition-all duration-200 p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#eb5939]"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
          </svg>
        </a>

        {/* YouTube */}
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="YouTube"
          onPointerEnter={() => soundEngine.playTick(340)}
          className="text-[#b7ab98]/55 hover:text-[#eb5939] hover:-translate-y-0.5 transition-all duration-200 p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#eb5939]"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <rect x="2.5" y="5" width="19" height="14" rx="4" />
            <path d="M10 9.5L15.5 12L10 14.5V9.5Z" fill="currentColor" stroke="none" />
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/armankabiir"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="LinkedIn"
          onPointerEnter={() => soundEngine.playTick(340)}
          className="text-[#b7ab98]/55 hover:text-[#eb5939] hover:-translate-y-0.5 transition-all duration-200 p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#eb5939]"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <rect x="3" y="3" width="18" height="18" rx="2.5" />
            <path d="M8 11V16M8 8V8.01M12 16V11M12 13C12 11.5 13.2 11 14.2 11C15.4 11 16 11.8 16 13.2V16" strokeLinecap="round" />
          </svg>
        </a>
      </aside>

      {/* Bottom-Right Vertical Sound Toggle */}
      <div className="fixed bottom-5 right-5 md:bottom-9 md:right-12 z-40 flex items-center">
        <button
          type="button"
          onClick={onToggleSound}
          aria-pressed={soundEnabled}
          className="py-2 px-1 text-[11px] uppercase tracking-[0.22em] font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#eb5939]"
          style={{ writingMode: 'vertical-rl' }}
        >
          <span className={soundEnabled ? 'text-[#eb5939]' : 'text-[#b7ab98]/55 hover:text-[#b7ab98]'}>
            {soundEnabled ? 'Sound On' : 'Sound Off'}
          </span>
        </button>
      </div>
    </>
  );
};
