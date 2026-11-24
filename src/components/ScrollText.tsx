import React, { useRef } from 'react';
import { motion, MotionValue, useScroll, useSpring, useTransform } from 'motion/react';

interface ScrollTextProps {
  text: string;
  className?: string;
  highlightPrefix?: string;
}

interface WordSpanProps {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}

const WordSpan: React.FC<WordSpanProps> = ({ word, range, progress }) => {
  const opacity = useTransform(progress, range, [0.22, 1]);
  const y = useTransform(progress, range, [4, 0]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block mr-[0.26em] will-change-[opacity,transform]">
      {word}
    </motion.span>
  );
};

export const ScrollText: React.FC<ScrollTextProps> = ({
  text,
  className = '',
  highlightPrefix,
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'end 0.48'],
  });

  // Smooth stepped mouse-wheel increments with a silky spring damper
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 26,
    restDelta: 0.001,
  });

  const words = text.split(' ');
  const highlightCount =
    highlightPrefix && text.startsWith(highlightPrefix)
      ? highlightPrefix.trim().split(/\s+/).length
      : 0;
  const highlightWords = words.slice(0, highlightCount);
  const remainingWords = words.slice(highlightCount);

  return (
    <p ref={containerRef} className={className}>
      {highlightWords.length > 0 && (
        <span className="text-[#eb5939]">
          {highlightWords.map((word, index) => {
            const start = index / words.length;
            const end = Math.min(1, start + 1.35 / words.length);
            return (
              <WordSpan
                key={`${word}-${index}`}
                word={word}
                range={[start, end]}
                progress={smoothProgress}
              />
            );
          })}
        </span>
      )}
      {remainingWords.map((word, idx) => {
        const index = highlightCount + idx;
        const start = index / words.length;
        const end = Math.min(1, start + 1.35 / words.length);
        return (
          <WordSpan
            key={`${word}-${index}`}
            word={word}
            range={[start, end]}
            progress={smoothProgress}
          />
        );
      })}
    </p>
  );
};
