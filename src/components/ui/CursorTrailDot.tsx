import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion } from 'motion/react';

const interactiveSelector = [
  'a',
  'button',
  '[role="button"]',
  '[data-cursor="interactive"]',
].join(',');

const textSelector = 'input, textarea, select, [contenteditable="true"]';

export function CursorTrailDot() {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(-40);
  const y = useMotionValue(-40);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [textMode, setTextMode] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateEnabled = () => setEnabled(mediaQuery.matches);

    updateEnabled();
    mediaQuery.addEventListener('change', updateEnabled);

    return () => mediaQuery.removeEventListener('change', updateEnabled);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('has-single-dot-cursor');
      return;
    }

    document.body.classList.add('has-single-dot-cursor');

    const handlePointerMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        setInteractive(false);
        setTextMode(false);
        return;
      }

      setInteractive(Boolean(target.closest(interactiveSelector)));
      setTextMode(Boolean(target.closest(textSelector)));
    };

    const handlePointerLeave = () => {
      setVisible(false);
      setInteractive(false);
      setTextMode(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerover', handlePointerOver);
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      document.body.classList.remove('has-single-dot-cursor');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerover', handlePointerOver);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <span aria-hidden="true" className="cursor-minimal-layer">
      <motion.span
        className="cursor-minimal-ring"
        animate={{
          opacity: visible && interactive && !textMode ? 1 : 0,
          scale: interactive ? 1 : 0.72,
        }}
        style={{ x, y }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        className="cursor-trail-dot"
        animate={{
          opacity: visible && !textMode ? 1 : 0,
          scale: interactive ? 1.22 : 1,
        }}
        style={{ x, y }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      />
    </span>
  );
}
