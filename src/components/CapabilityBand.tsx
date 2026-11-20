import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { CapabilityItem } from '../data/portfolioData';
import { soundEngine } from '../utils/soundEngine';

interface CapabilityBandProps {
  item: CapabilityItem;
  isExpanded: boolean;
  onToggle: () => void;
  forceHonest: boolean;
}

export const CapabilityBand: React.FC<CapabilityBandProps> = ({
  item,
  isExpanded,
  onToggle,
  forceHonest,
}) => {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const active = hovered || forceHonest || isExpanded;

  return (
    <div className="border-b border-[#b7ab98]/12 last:border-b-0">
      <button
        type="button"
        onClick={() => {
          soundEngine.playTick(440);
          onToggle();
        }}
        onPointerEnter={() => {
          setHovered(true);
          soundEngine.playTick(320);
        }}
        onPointerLeave={() => setHovered(false)}
        aria-expanded={isExpanded}
        className="w-full text-left relative overflow-hidden group focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#eb5939]"
      >
        {/* Signature #eb5939 vertical wipe fill from center with silky deceleration */}
        <span
          aria-hidden="true"
          className={`absolute inset-0 bg-[#eb5939] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center will-change-transform ${
            active ? 'scale-y-100' : 'scale-y-0'
          }`}
        />

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 md:px-12 py-6 md:py-9 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-12">
          <div className="flex items-center gap-4">
            <span
              className={`font-display text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase tracking-tight transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                active ? 'text-[#0d0d0d] translate-x-2' : 'text-[#b7ab98] translate-x-0'
              }`}
            >
              {item.title}
            </span>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-6 md:max-w-lg w-full">
            <p
              className={`text-sm md:text-base leading-relaxed transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                active
                  ? 'text-[#0d0d0d] opacity-100 translate-x-0 font-medium'
                  : 'text-[#b7ab98]/60 opacity-85 md:opacity-0 md:translate-x-4'
              }`}
            >
              {item.honestSummary}
            </p>
            <ChevronDown
              className={`w-5 h-5 shrink-0 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                active ? 'text-[#0d0d0d]' : 'text-[#b7ab98]/40'
              } ${isExpanded ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="capability-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-[#121212] border-t border-[#b7ab98]/10"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.04 }}
              className="max-w-[1360px] mx-auto px-6 md:px-12 py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              <div className="md:col-span-5 aspect-[16/9] bg-[#0d0d0d] border border-[#b7ab98]/10 overflow-hidden">
                {!imgError ? (
                  <img
                    src={item.image}
                    alt={`${item.title} visual sample`}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#181715] text-[#b7ab98]/60 text-sm">
                    {item.title} Practice
                  </div>
                )}
              </div>
              <div className="md:col-span-7 space-y-4">
                <div className="text-xs text-[#eb5939] font-medium tracking-wide">
                  {item.deliverables}
                </div>
                <p className="text-base text-[#b7ab98]/85 leading-relaxed max-w-2xl">
                  {item.details}
                </p>
                <div className="text-xs text-[#b7ab98]/55 pt-1">
                  <span>Stack</span>
                  <span aria-hidden="true" className="mx-2">
                    ·
                  </span>
                  <span>{item.tools}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
