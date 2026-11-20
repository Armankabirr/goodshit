import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [overMaskText, setOverMaskText] = useState(false);
  const [interactive, setInteractive] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const smoothX = useSpring(rawX, { stiffness: 450, damping: 34, mass: 0.3 });
  const smoothY = useSpring(rawY, { stiffness: 450, damping: 34, mass: 0.3 });

  const hasMovedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        setVisible(true);
      }

      const target = e.target as HTMLElement | null;
      const inTextMask = Boolean(
        target?.closest('[data-mask-active="true"] [data-mask-text="true"]')
      );
      const isInteractive = Boolean(
        target?.closest('a, button, [role="button"], input, textarea, select')
      );

      setOverMaskText(inTextMask);
      setInteractive(isInteractive);
    };

    const onLeave = () => {
      hasMovedRef.current = false;
      setVisible(false);
      setOverMaskText(false);
      setInteractive(false);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [rawX, rawY]);

  if (!enabled) return null;

  const targetScale = overMaskText ? 0 : interactive ? 1.5 : 1;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[60] pointer-events-none mix-blend-difference hidden md:block"
      style={{
        x: smoothX,
        y: smoothY,
      }}
    >
      <motion.div
        animate={{
          opacity: visible && !overMaskText ? 1 : 0,
          scale: targetScale,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 320, damping: 24 },
          opacity: { duration: 0.18 },
        }}
        className="w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-[#eb5939]"
      />
    </motion.div>
  );
};
