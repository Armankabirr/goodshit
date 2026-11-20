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
            aria-label="Minh Pham — Back to top"
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
                d="M11 23V13L15.5 19L20 13V23M22.5 23V13H25.5C27 13 28 14 28 15.5C28 17 27 18 25.5 18H22.5"
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
        {/* Dribbble */}
        <a
          href="https://dribbble.com"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Dribbble"
          onPointerEnter={() => soundEngine.playTick(340)}
          className="text-[#b7ab98]/55 hover:text-[#eb5939] hover:-translate-y-0.5 transition-all duration-200 p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#eb5939]"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <circle cx="12" cy="12" r="9.5" />
            <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
          </svg>
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com"
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
          href="https://linkedin.com"
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

      {/* Bottom-Right Vertical Sound Toggle (Desktop) */}
      <div className="fixed bottom-9 right-12 z-40 hidden md:flex items-center">
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
