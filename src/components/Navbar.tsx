import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface NavbarProps {
  onNavigate: (id: string) => void;
}

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'clients', label: 'Clients' },
];

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [activeId, setActiveId] = useState<string>('hero');

  useEffect(() => {
    const sectionIds = ['hero', ...NAV_ITEMS.map((i) => i.id), 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
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
    onNavigate(id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0d0d0d]/80 backdrop-blur-md border-b border-[#b7ab98]/10 transition-colors duration-300">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between gap-8">
        <a
          href="#hero"
          onClick={(e) => handleAnchor(e, 'hero')}
          className="font-display text-sm md:text-base font-bold tracking-tight text-[#b7ab98] hover:text-[#eb5939] transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#eb5939]"
        >
          Minh Pham
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.14em] font-medium text-[#b7ab98]/65"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleAnchor(e, item.id)}
                className={`relative py-2 whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#eb5939] ${
                  isActive ? 'text-[#b7ab98]' : 'hover:text-[#b7ab98]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                    className="absolute left-0 right-0 bottom-1 h-[1.5px] bg-[#eb5939]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="shrink-0">
          <a
            href="#contact"
            onClick={(e) => handleAnchor(e, 'contact')}
            className="inline-flex items-center justify-center px-5 py-2.5 min-h-[40px] text-xs font-semibold uppercase tracking-[0.12em] text-[#0d0d0d] bg-[#eb5939] hover:bg-[#f06b4d] active:scale-[0.98] transition-all duration-200 rounded-sm whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b7ab98]"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
};
