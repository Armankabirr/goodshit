import React, { useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react';

interface MaskRevealBlockProps {
  baseContent: React.ReactNode;
  revealContent: React.ReactNode;
  forceReveal?: boolean;
  radius?: number;
  className?: string;
  maskClassName?: string;
}

export const MaskRevealBlock: React.FC<MaskRevealBlockProps> = ({
  baseContent,
  revealContent,
  forceReveal = false,
  radius = 210,
  className = '',
  maskClassName = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wasOverTextRef = useRef(false);

  const rawX = useMotionValue(-500);
  const rawY = useMotionValue(-500);
  const rawRadius = useMotionValue(0);

  // Liquid GSAP-like spring interpolation with zero React re-renders per frame
  const smoothX = useSpring(rawX, { stiffness: 280, damping: 32, mass: 0.42 });
  const smoothY = useSpring(rawY, { stiffness: 280, damping: 32, mass: 0.42 });
  const smoothRadius = useSpring(rawRadius, { stiffness: 240, damping: 28, mass: 0.45 });

  const clipPath = useMotionTemplate`circle(${smoothRadius}px at ${smoothX}px ${smoothY}px)`;

  useEffect(() => {
    if (forceReveal && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      rawX.set(rect.width / 2);
      rawY.set(rect.height / 2);
      rawRadius.set(Math.hypot(rect.width, rect.height) + 120);
    } else if (!forceReveal) {
      wasOverTextRef.current = false;
      rawRadius.set(0);
    }
  }, [forceReveal, rawX, rawY, rawRadius]);

  const handlePointerUpdate = (
    e: React.PointerEvent<HTMLDivElement>,
    snapOnEntry = false
  ) => {
    if (!containerRef.current || forceReveal) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const overText = Boolean(
      (e.target as HTMLElement | null)?.closest('[data-mask-text="true"]')
    );

    if (snapOnEntry || (!wasOverTextRef.current && overText)) {
      smoothX.jump(x);
      smoothY.jump(y);
    }

    wasOverTextRef.current = overText;
    rawX.set(x);
    rawY.set(y);
    rawRadius.set(overText ? radius : 0);
  };

  return (
    <div
      ref={containerRef}
      data-mask-active={forceReveal ? 'false' : 'true'}
      onPointerEnter={(e) => handlePointerUpdate(e, true)}
      onPointerMove={(e) => handlePointerUpdate(e, false)}
      onPointerLeave={() => {
        if (!forceReveal) {
          wasOverTextRef.current = false;
          rawRadius.set(0);
        }
      }}
      className={`relative select-none cursor-default ${className}`}
    >
      {/* Base warm-sand text layer */}
      <div className="relative z-10">{baseContent}</div>

      {/* Signature #eb5939 spotlight mask layer revealing candid copy */}
      <motion.div
        aria-hidden={!forceReveal}
        className={`pointer-events-none absolute inset-0 z-20 bg-[#eb5939] text-[#0d0d0d] will-change-[clip-path] ${maskClassName}`}
        style={{ clipPath }}
      >
        {revealContent}
      </motion.div>
    </div>
  );
};
