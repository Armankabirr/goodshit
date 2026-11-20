import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData';
import { MaskRevealBlock } from './MaskRevealBlock';
import { soundEngine } from '../utils/soundEngine';

interface TestimonialsSectionProps {
  honestMode: boolean;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ honestMode }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [failedAvatars, setFailedAvatars] = useState<Record<string, boolean>>({});

  const active = TESTIMONIALS[activeIdx];

  const handleSelect = (idx: number) => {
    soundEngine.playTick(400);
    setActiveIdx(idx);
  };

  const handlePrev = () => {
    soundEngine.playTick(360);
    setActiveIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    soundEngine.playTick(420);
    setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const renderQuoteBlock = (isMaskLayer: boolean) => (
    <div className="py-24 md:py-32">
      <div className="max-w-[1120px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8">
            <h2
              className={`text-xs uppercase tracking-[0.24em] font-semibold mb-10 ${
                isMaskLayer ? 'text-[#0d0d0d]/70' : 'text-[#b7ab98]/60'
              }`}
            >
              What They Said
            </h2>

            <AnimatePresence mode="wait">
              <motion.blockquote
                key={`${active.id}-${isMaskLayer ? 'mask' : 'base'}`}
                data-mask-text={isMaskLayer ? undefined : 'true'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8 w-fit max-w-3xl"
              >
                <span
                  aria-hidden="true"
                  className={`block font-display text-6xl leading-none select-none ${
                    isMaskLayer ? 'text-[#0d0d0d]' : 'text-[#eb5939]'
                  }`}
                >
                  &ldquo;
                </span>

                <p
                  className={`font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-bold tracking-tight leading-[1.16] min-h-[120px] md:min-h-[150px] ${
                    isMaskLayer ? 'text-[#0d0d0d]' : 'text-[#b7ab98]'
                  }`}
                >
                  {isMaskLayer ? active.honestQuote : active.quote}
                </p>

                <footer
                  className={`text-sm pt-2 ${
                    isMaskLayer ? 'text-[#0d0d0d]/85' : 'text-[#b7ab98]/70'
                  }`}
                >
                  <span
                    className={`font-semibold ${
                      isMaskLayer ? 'text-[#0d0d0d]' : 'text-[#b7ab98]'
                    }`}
                  >
                    {active.name}
                  </span>
                  <span aria-hidden="true" className="mx-2">
                    ·
                  </span>
                  <span>
                    {active.role}, {active.company}
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Right column spacer matching interactive selector width */}
          <div className="lg:col-span-4 hidden lg:block" aria-hidden="true" />
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="testimonials"
      className={`relative border-b border-[#b7ab98]/12 overflow-hidden transition-colors duration-300 ${
        honestMode ? 'bg-[#eb5939]' : 'bg-[#0d0d0d]'
      }`}
    >
      <MaskRevealBlock
        forceReveal={honestMode}
        radius={220}
        baseContent={renderQuoteBlock(false)}
        revealContent={renderQuoteBlock(true)}
      />

      {/* Interactive Colleague Selector floating cleanly above the full-width mask layer */}
      <div className="lg:absolute lg:inset-0 lg:pointer-events-none z-30 flex items-center">
        <div className="max-w-[1120px] mx-auto px-6 md:px-12 w-full pb-20 lg:pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 hidden lg:block" />
            <div className="lg:col-span-4 lg:pointer-events-auto flex flex-col justify-center space-y-6">
              <div className="flex items-center justify-between">
                <span
                  className={`font-mono-tabular text-xs tracking-wider transition-colors ${
                    honestMode ? 'text-[#0d0d0d]/75' : 'text-[#b7ab98]/55'
                  }`}
                >
                  0{activeIdx + 1} / 0{TESTIMONIALS.length}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                    className={`w-10 h-10 inline-flex items-center justify-center border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#eb5939] ${
                      honestMode
                        ? 'border-[#0d0d0d]/30 text-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-[#eb5939]'
                        : 'border-[#b7ab98]/20 text-[#b7ab98] hover:border-[#eb5939] hover:text-[#eb5939]'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className={`w-10 h-10 inline-flex items-center justify-center border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#eb5939] ${
                      honestMode
                        ? 'border-[#0d0d0d]/30 text-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-[#eb5939]'
                        : 'border-[#b7ab98]/20 text-[#b7ab98] hover:border-[#eb5939] hover:text-[#eb5939]'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto pb-2 lg:pb-0">
                {TESTIMONIALS.map((person, index) => {
                  const isActive = index === activeIdx;
                  const imgFailed = failedAvatars[person.id];

                  return (
                    <button
                      key={person.id}
                      type="button"
                      onClick={() => handleSelect(index)}
                      className={`relative flex items-center gap-4 px-4 py-3 min-h-[44px] text-left border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#eb5939] ${
                        honestMode
                          ? isActive
                            ? 'bg-[#0d0d0d] border-[#0d0d0d] text-[#b7ab98]'
                            : 'bg-[#0d0d0d]/10 border-[#0d0d0d]/25 text-[#0d0d0d] hover:bg-[#0d0d0d]/20'
                          : isActive
                          ? 'bg-[#171615] border-[#eb5939]'
                          : 'bg-[#0d0d0d]/70 border-[#b7ab98]/14 hover:border-[#b7ab98]/40'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full overflow-hidden shrink-0 border transition-all duration-300 ${
                          isActive
                            ? 'border-[#eb5939] grayscale-0 scale-105'
                            : 'border-[#b7ab98]/20 grayscale opacity-65'
                        }`}
                      >
                        {!imgFailed ? (
                          <img
                            src={person.avatar}
                            alt={person.name}
                            referrerPolicy="no-referrer"
                            onError={() =>
                              setFailedAvatars((prev) => ({ ...prev, [person.id]: true }))
                            }
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[#1a1917] font-display text-xs font-bold text-[#b7ab98]">
                            {person.initials}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <span
                          className={`block text-sm font-semibold truncate transition-colors duration-200 ${
                            honestMode
                              ? isActive
                                ? 'text-[#b7ab98]'
                                : 'text-[#0d0d0d]'
                              : isActive
                              ? 'text-[#b7ab98]'
                              : 'text-[#b7ab98]/70'
                          }`}
                        >
                          {person.name}
                        </span>
                        <span
                          className={`block text-xs truncate ${
                            honestMode
                              ? isActive
                                ? 'text-[#b7ab98]/65'
                                : 'text-[#0d0d0d]/70'
                              : 'text-[#b7ab98]/50'
                          }`}
                        >
                          {person.role} · {person.company}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
