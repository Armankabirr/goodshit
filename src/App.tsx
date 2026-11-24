import React, { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { MaskRevealBlock } from './components/MaskRevealBlock';
import { ScrollText } from './components/ScrollText';
import { CapabilityBand } from './components/CapabilityBand';
import { ProjectModal } from './components/ProjectModal';
import { CustomCursor } from './components/CustomCursor';
import { TestimonialsSection } from './components/TestimonialsSection';
import {
  CAPABILITIES,
  CLIENTS,
  ClientProject,
  EXPERIENCE,
  HERO_IMAGE,
} from './data/portfolioData';
import { soundEngine } from './utils/soundEngine';

const HERO_VIDEO = '/assets/aistudio/Slow_spinning_portrait__3__89fb387e.mp4';
const EXPERIENCE_BG = '/assets/aistudio/Gemini_Generated_Image_e7tf6qe7tf6qe7tf_b8f8aea4.jfif';
const MOTTO_BG = '/assets/aistudio/Gemini_Generated_Image_jq7xr0jq7xr0jq7x__1__251d5cff.jfif';

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [expandedCapability, setExpandedCapability] = useState<string | null>(null);
  const [hoveredExpIdx, setHoveredExpIdx] = useState<number | null>(null);
  const [selectedClient, setSelectedClient] = useState<ClientProject | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [heroVideoError, setHeroVideoError] = useState(false);
  const [heroImgError, setHeroImgError] = useState(false);
  const [expBgError, setExpBgError] = useState(false);
  const [mottoBgError, setMottoBgError] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const smoothHeroScroll = useSpring(heroScroll, { stiffness: 120, damping: 24 });
  const heroBgY = useTransform(smoothHeroScroll, [0, 1], ['0%', '18%']);
  const heroBgScale = useTransform(smoothHeroScroll, [0, 1], [1.02, 1.12]);
  const heroBgOpacity = useTransform(smoothHeroScroll, [0, 1], [0.64, 0.15]);

  const expRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: expScroll } = useScroll({
    target: expRef,
    offset: ['start end', 'end start'],
  });
  const smoothExpScroll = useSpring(expScroll, { stiffness: 110, damping: 24 });
  const expBgY = useTransform(smoothExpScroll, [0, 1], ['-8%', '8%']);
  const expBgScale = useTransform(smoothExpScroll, [0, 1], [1.08, 1.02]);

  const mottoRef = useRef<HTMLElement>(null);
  const { scrollYProgress: mottoScroll } = useScroll({
    target: mottoRef,
    offset: ['start end', 'end start'],
  });
  const smoothMottoScroll = useSpring(mottoScroll, { stiffness: 110, damping: 24 });
  const mottoBgY = useTransform(smoothMottoScroll, [0, 1], ['-8%', '8%']);
  const mottoBgScale = useTransform(smoothMottoScroll, [0, 1], [1.08, 1.02]);

  const navigateTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleToggleSound = () => {
    const next = soundEngine.toggle();
    setSoundEnabled(next);
  };

  const handleCopyEmail = async () => {
    const email = 'armanutsho12@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      soundEngine.playTick(540);
      setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#b7ab98]">
      <CustomCursor />
      <Navbar
        onNavigate={navigateTo}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      <main>
        {/* HERO SECTION */}
        <section
          id="hero"
          ref={heroRef}
          className="relative min-h-screen flex flex-col justify-center border-b border-[#b7ab98]/12 overflow-hidden"
        >
          {/* Ambient spinning portrait video backdrop with spring-smoothed parallax */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden bg-[#0d0d0d]">
            {!heroVideoError ? (
              <motion.video
                src={HERO_VIDEO}
                poster={HERO_IMAGE}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
                onError={() => setHeroVideoError(true)}
                style={{
                  y: heroBgY,
                  scale: heroBgScale,
                  opacity: heroBgOpacity,
                }}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 0.64, scale: 1.02 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover object-center will-change-transform"
              />
            ) : (
              !heroImgError && (
                <motion.img
                  src={HERO_IMAGE}
                  alt="Sculptural 3D obsidian digital form"
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImgError(true)}
                  style={{
                    y: heroBgY,
                    scale: heroBgScale,
                    opacity: heroBgOpacity,
                  }}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 0.52, scale: 1.04 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover will-change-transform"
                />
              )
            )}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/65 via-[#0d0d0d]/35 to-[#0d0d0d]"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex-1 flex items-center"
          >
            <MaskRevealBlock
              radius={230}
              className="w-full"
              baseContent={
                <div className="w-full py-16 md:py-24">
                  <div className="max-w-[1120px] mx-auto px-6 md:px-12 text-center">
                    <div
                      data-mask-text="true"
                      className="inline-block max-w-4xl mx-auto space-y-6 py-2 px-4"
                    >
                      <p className="text-xs md:text-sm uppercase tracking-[0.28em] font-medium text-[#b7ab98]/80">
                        ARMAN KABIR
                      </p>
                      <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.25rem] font-extrabold uppercase tracking-[-0.03em] leading-[0.92] text-[#b7ab98]">
                        Everything
                        <br />
                        Starts
                        <br />
                        With
                        <br />
                        <span className="text-[#eb5939]">Curiosity</span>
                      </h1>
                    </div>
                  </div>
                </div>
              }
              revealContent={
                <div className="w-full h-full flex items-center justify-center py-16 md:py-24">
                  <div className="max-w-[1120px] mx-auto px-6 md:px-12 text-center">
                    <div className="inline-block max-w-4xl mx-auto space-y-6 py-2 px-4">
                      <p className="text-xs md:text-sm uppercase tracking-[0.28em] font-semibold text-[#0d0d0d]/80">
                        ARMAN KABIR
                      </p>
                      <p className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.25rem] font-extrabold uppercase tracking-[-0.03em] leading-[0.92] text-[#0d0d0d]">
                        Until
                        <br />
                        It
                        <br />
                        Works.
                      </p>
                    </div>
                  </div>
                </div>
              }
            />
          </motion.div>
        </section>

        {/* ABOUT ME SECTION */}
        <section id="about" className="border-b border-[#b7ab98]/12">
          <MaskRevealBlock
            radius={220}
            baseContent={
              <div className="py-24 md:py-36">
                <div className="max-w-[1120px] mx-auto px-6 md:px-12">
                  <div data-mask-text="true" className="w-fit max-w-5xl space-y-8">
                    <h2 className="text-xs uppercase tracking-[0.24em] font-semibold text-[#b7ab98]/60">
                      About Me
                    </h2>
                    <ScrollText
                      text="I'm a software engineer passionate about building modern web applications, exploring AI, and turning ideas into products people genuinely enjoy using."
                      className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-[-0.025em] leading-[1.08] text-[#b7ab98]"
                    />
                  </div>
                </div>
              </div>
            }
            revealContent={
              <div className="w-full h-full flex items-center py-24 md:py-36">
                <div className="max-w-[1120px] mx-auto px-6 md:px-12 w-full">
                  <div className="w-fit max-w-5xl space-y-8">
                    <p className="text-xs uppercase tracking-[0.24em] font-semibold text-[#0d0d0d]/70">
                      About Me
                    </p>
                    <p className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-[-0.025em] leading-[1.08] text-[#0d0d0d]">
                      A curious builder—always learning, always experimenting, and always chasing
                      the next idea worth bringing to life.
                    </p>
                  </div>
                </div>
              </div>
            }
          />
        </section>

        {/* WHAT I DO SECTION */}
        <section id="work" className="border-b border-[#b7ab98]/12 pt-20 md:pt-28">
          <div className="max-w-[1120px] mx-auto px-6 md:px-12 pb-10 flex items-end justify-between gap-6">
            <h2 className="text-xs uppercase tracking-[0.24em] font-semibold text-[#b7ab98]/60">
              What I Do
            </h2>
            <p className="text-xs text-[#b7ab98]/55 hidden sm:block">
              Select a discipline to inspect tools and process
            </p>
          </div>

          <div className="border-t border-[#b7ab98]/12">
            {CAPABILITIES.map((cap) => (
              <CapabilityBand
                key={cap.id}
                item={cap}
                isExpanded={expandedCapability === cap.id}
                onToggle={() =>
                  setExpandedCapability((prev) => (prev === cap.id ? null : cap.id))
                }
              />
            ))}
          </div>
        </section>

        {/* EXPERIENCE & HISTORY SECTION */}
        <section id="experience" className="border-b border-[#b7ab98]/12 bg-[#0d0d0d]">
          {/* Experience intro block with scoped background image */}
          <div
            ref={expRef}
            className="relative min-h-[520px] md:min-h-[620px] flex items-center border-b border-[#b7ab98]/12 overflow-hidden bg-[#0d0d0d]"
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {!expBgError && (
                <motion.img
                  src={EXPERIENCE_BG}
                  alt="Portrait in dark studio lighting"
                  referrerPolicy="no-referrer"
                  onError={() => setExpBgError(true)}
                  style={{ y: expBgY, scale: expBgScale }}
                  className="w-full h-full object-cover object-[78%_18%] md:object-right-top opacity-100 will-change-transform"
                />
              )}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/75 via-[#0d0d0d]/25 to-transparent"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/40 via-transparent to-[#0d0d0d]/50"
              />
            </div>

            <div className="relative z-10 w-full">
              <MaskRevealBlock
                radius={220}
                baseContent={
                  <div className="py-24 md:py-36">
                    <div className="max-w-[1120px] mx-auto px-6 md:px-12">
                      <div data-mask-text="true" className="w-fit max-w-3xl space-y-8">
                        <h2 className="text-xs uppercase tracking-[0.24em] font-semibold text-[#b7ab98]/85">
                          Experience
                        </h2>
                        <ScrollText
                          text="My journey has been shaped by curiosity, collaboration, and the willingness to take on projects that push me beyond my comfort zone."
                          className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-[-0.025em] leading-[1.08] text-[#b7ab98]"
                        />
                      </div>
                    </div>
                  </div>
                }
                revealContent={
                  <div className="w-full h-full flex items-center py-24 md:py-36">
                    <div className="max-w-[1120px] mx-auto px-6 md:px-12 w-full">
                      <div className="w-fit max-w-3xl space-y-8">
                        <p className="text-xs uppercase tracking-[0.24em] font-semibold text-[#0d0d0d]/70">
                          Experience
                        </p>
                        <p className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-[-0.025em] leading-[1.08] text-[#0d0d0d]">
                          One day this section will list companies. Today, it tells the story of how I got there.
                        </p>
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          </div>

          {/* History Timeline */}
          <div className="max-w-[1120px] mx-auto px-6 md:px-12 py-16 md:py-24">
            <h3 className="text-xs uppercase tracking-[0.24em] font-semibold text-[#b7ab98]/60 mb-10">
              History
            </h3>

            <div className="divide-y divide-[#b7ab98]/12 border-y border-[#b7ab98]/12">
              {EXPERIENCE.map((item, idx) => {
                const showHonest = hoveredExpIdx === idx;
                return (
                  <div
                    key={`${item.year}-${item.role}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      soundEngine.playTick(340);
                      setHoveredExpIdx((prev) => (prev === idx ? null : idx));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        soundEngine.playTick(340);
                        setHoveredExpIdx((prev) => (prev === idx ? null : idx));
                      }
                    }}
                    onPointerEnter={() => {
                      setHoveredExpIdx(idx);
                      soundEngine.playTick(310);
                    }}
                    onPointerLeave={() =>
                      setHoveredExpIdx((prev) => (prev === idx ? null : prev))
                    }
                    className="py-7 md:py-9 px-4 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-center transition-colors duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#151413] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#eb5939]"
                  >
                    <div
                      className={`md:col-span-3 font-display text-2xl md:text-3xl font-bold font-mono-tabular transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        showHonest ? 'text-[#eb5939] md:translate-x-1' : 'text-[#b7ab98]'
                      }`}
                    >
                      {item.year}
                    </div>

                    {/* Full-height odometer roll prevents text overlap & descender clipping */}
                    <div className="md:col-span-5 font-display text-xl md:text-2xl lg:text-[1.7rem] font-bold tracking-tight leading-snug grid py-1.5 -my-1.5 overflow-hidden">
                      <motion.span
                        initial={false}
                        animate={{
                          opacity: showHonest ? 0 : 1,
                          y: showHonest ? '-115%' : '0%',
                        }}
                        transition={{
                          y: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.2, ease: 'easeOut' },
                        }}
                        aria-hidden={showHonest}
                        className="col-start-1 row-start-1 text-[#b7ab98] will-change-[transform,opacity]"
                      >
                        {item.role}
                      </motion.span>
                      <motion.span
                        initial={false}
                        animate={{
                          opacity: showHonest ? 1 : 0,
                          y: showHonest ? '0%' : '115%',
                        }}
                        transition={{
                          y: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.24, delay: showHonest ? 0.05 : 0, ease: 'easeOut' },
                        }}
                        aria-hidden={!showHonest}
                        className="col-start-1 row-start-1 text-[#eb5939] will-change-[transform,opacity]"
                      >
                        {item.honestRole}
                      </motion.span>
                    </div>

                    <div
                      className={`md:col-span-4 text-sm md:text-right transition-colors duration-300 ${
                        showHonest ? 'text-[#b7ab98]/90' : 'text-[#b7ab98]/60'
                      }`}
                    >
                      <span>{item.company}</span>
                      <span aria-hidden="true" className="mx-2">
                        ·
                      </span>
                      <span>{item.location}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CLIENTS SECTION */}
        <section id="clients" className="border-b border-[#b7ab98]/12">
          <MaskRevealBlock
            radius={220}
            className="border-b border-[#b7ab98]/12"
            baseContent={
              <div className="py-24 md:py-32">
                <div className="max-w-[1120px] mx-auto px-6 md:px-12">
                  <div data-mask-text="true" className="w-fit max-w-5xl space-y-8">
                    <h2 className="text-xs uppercase tracking-[0.24em] font-semibold text-[#b7ab98]/60">
                      working with teams
                    </h2>
                    <ScrollText
                      text="I've had the opportunity to collaborate with talented teammates, faculty members, and student communities on projects that helped me grow as a team player."
                      className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-[-0.025em] leading-[1.08] text-[#b7ab98]"
                    />
                  </div>
                </div>
              </div>
            }
            revealContent={
              <div className="w-full h-full flex items-center py-24 md:py-32">
                <div className="max-w-[1120px] mx-auto px-6 md:px-12 w-full">
                  <div className="w-fit max-w-5xl space-y-8">
                    <p className="text-xs uppercase tracking-[0.24em] font-semibold text-[#0d0d0d]/70">
                      Clients
                    </p>
                    <p className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-[-0.025em] leading-[1.08] text-[#0d0d0d]">
                     No Fortune 500 clients. Just real people, real teamwork, and lessons that shaped the engineer I'm becoming.
                    </p>
                  </div>
                </div>
              </div>
            }
          />

          <div className="divide-y divide-[#b7ab98]/12">
            {CLIENTS.map((client) => (
              <button
                key={client.id}
                type="button"
                onClick={() => {
                  soundEngine.playTick(420);
                  setSelectedClient(client);
                }}
                onPointerEnter={() => soundEngine.playTick(280)}
                className="w-full text-left group relative overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#eb5939]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[#eb5939] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center will-change-transform"
                />
                <div className="relative z-10 max-w-[1120px] mx-auto px-6 md:px-12 py-8 md:py-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
                  <div className="lg:col-span-4 flex items-center justify-between lg:justify-start gap-4">
                    <span className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#b7ab98] group-hover:text-[#0d0d0d] group-hover:translate-x-2 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      {client.name}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-[#eb5939] group-hover:text-[#0d0d0d] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 lg:hidden" />
                  </div>

                  <div className="lg:col-span-6">
                    <p className="text-sm md:text-base text-[#b7ab98]/75 group-hover:text-[#0d0d0d] transition-colors duration-300 leading-relaxed">
                      {client.honestLine}
                    </p>
                  </div>

                  <div className="lg:col-span-2 hidden lg:flex items-center justify-end gap-3 text-xs font-mono-tabular text-[#b7ab98]/55 group-hover:text-[#0d0d0d] transition-colors duration-300">
                    <span>{client.year}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* WHAT THEY SAID SECTION */}
        <TestimonialsSection />

        {/* MY MOTTO SECTION */}
        <section
          ref={mottoRef}
          className="relative border-b border-[#b7ab98]/12 overflow-hidden bg-[#0d0d0d]"
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {!mottoBgError && (
              <motion.img
                src={MOTTO_BG}
                alt="Side profile portrait in studio lighting"
                referrerPolicy="no-referrer"
                onError={() => setMottoBgError(true)}
                style={{ y: mottoBgY, scale: mottoBgScale }}
                className="w-full h-full object-cover object-[50%_22%] opacity-80 will-change-transform"
              />
            )}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/55 via-[#0d0d0d]/35 to-[#0d0d0d]/65"
            />
          </div>

          <div className="relative z-10">
            <MaskRevealBlock
              radius={220}
              baseContent={
                <div className="py-28 md:py-44">
                  <div className="max-w-[1120px] mx-auto px-6 md:px-12 text-center">
                    <div
                      data-mask-text="true"
                      className="inline-block max-w-4xl mx-auto space-y-6 py-2 px-4"
                    >
                      <p className="text-xs uppercase tracking-[0.24em] font-semibold text-[#b7ab98]/80">
                        My Motto
                      </p>
                      <p className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-[-0.03em] leading-[0.94] text-[#b7ab98]">
                        Stay hungry. Stay foolish.
                      </p>
                      <p className="text-sm text-[#b7ab98]/75">Steve Jobs</p>
                    </div>
                  </div>
                </div>
              }
              revealContent={
                <div className="w-full h-full flex items-center justify-center py-28 md:py-44">
                  <div className="max-w-[1120px] mx-auto px-6 md:px-12 text-center">
                    <div className="inline-block max-w-4xl mx-auto space-y-6 py-2 px-4">
                      <p className="text-xs uppercase tracking-[0.24em] font-semibold text-[#0d0d0d]/70">
                        My Motto
                      </p>
                      <p className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-[-0.03em] leading-[0.94] text-[#0d0d0d]">
                        Still hungry. Still figuring things out.
                      </p>
                      <p className="text-sm font-semibold text-[#0d0d0d]/80">Arman Kabir</p>
                    </div>
                  </div>
                </div>
              }
            />
          </div>
        </section>
      </main>

      {/* CONNECT / FOOTER SECTION */}
      <footer id="contact" className="bg-[#0d0d0d] py-20 md:py-28">
        <div className="max-w-[1120px] mx-auto px-6 md:px-12 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5 space-y-4">
              <h2 className="text-xs uppercase tracking-[0.24em] font-semibold text-[#b7ab98]/60">
                Connect
              </h2>
              <p className="font-display text-2xl md:text-3xl font-bold text-[#b7ab98] max-w-sm leading-snug">
                Open to opportunities, collaborations, and interesting ideas worth building.
              </p>
            </div>

            <div className="md:col-span-4 space-y-3">
              <h3 className="text-xs uppercase tracking-[0.18em] text-[#b7ab98]/45 mb-4">
                Social
              </h3>
              <ul className="space-y-2">
                {[
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/armankabiir' },
                  { label: 'Github', href: 'https://github.com/Armankabirr' },
                  { label: 'Instagram', href: 'https://www.instagram.com/armankabiir' },
                  { label: 'twitter', href: 'https://twitter.com' },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      onPointerEnter={() => soundEngine.playTick(340)}
                      className="inline-flex items-center gap-2 py-1 text-xl md:text-2xl font-display font-bold text-[#b7ab98] hover:text-[#eb5939] hover:translate-x-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#eb5939]"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3 space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-[0.18em] text-[#b7ab98]/45 mb-3">
                  Email
                </h3>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2.5 text-left text-sm md:text-base font-medium text-[#b7ab98] hover:text-[#eb5939] transition-colors duration-200 min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#eb5939]"
                >
                  <span>armanutsho12@gmail.com</span>
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-[#eb5939] shrink-0" />
                  ) : (
                    <Copy className="w-4 h-4 opacity-55 shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {copiedEmail && (
                    <motion.p
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs text-[#eb5939] mt-1"
                    >
                      Email copied to clipboard
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-[0.18em] text-[#b7ab98]/45 mb-2">
                  Base
                </h3>
                <p className="text-sm text-[#b7ab98]/80">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#b7ab98]/12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#b7ab98]/45">
            <p>&copy; {new Date().getFullYear()} Minh Pham. All rights reserved.</p>
            <p>CREATIVE BUILDING</p>
          </div>
        </div>
      </footer>

      <ProjectModal project={selectedClient} onClose={() => setSelectedClient(null)} />
    </div>
  );
}
