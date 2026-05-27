import type { PointerEvent } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import { Globe } from './ui/cobe-globe';
import { GridBackground } from './ui/grid-background';
import { PremiumButton } from './ui/PremiumButton';
import { fadeUp, motionEase, revealGroup, softScale } from '@/src/lib/motion';

const markers = [
  { id: 'sf', location: [37.7595, -122.4367] as [number, number], label: 'San Francisco' },
  { id: 'nyc', location: [40.7128, -74.006] as [number, number], label: 'New York' },
  { id: 'tokyo', location: [35.6762, 139.6503] as [number, number], label: 'Tokyo' },
  { id: 'london', location: [51.5074, -0.1278] as [number, number], label: 'London' },
  { id: 'sydney', location: [-33.8688, 151.2093] as [number, number], label: 'Sydney' },
  { id: 'capetown', location: [-33.9249, 18.4241] as [number, number], label: 'Cape Town' },
  { id: 'dubai', location: [25.2048, 55.2708] as [number, number], label: 'Dubai' },
  { id: 'paris', location: [48.8566, 2.3522] as [number, number], label: 'Paris' },
  { id: 'saopaulo', location: [-23.5505, -46.6333] as [number, number], label: 'São Paulo' },
];

const arcs = [
  {
    id: 'sf-tokyo',
    from: [37.7595, -122.4367] as [number, number],
    to: [35.6762, 139.6503] as [number, number],
    label: 'SF → Tokyo',
  },
  {
    id: 'nyc-london',
    from: [40.7128, -74.006] as [number, number],
    to: [51.5074, -0.1278] as [number, number],
    label: 'NYC → London',
  },
];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const titleLines = [
    [{ text: 'СТАТУС, КОТОРЫЙ' }],
    [{ text: 'ОТКРЫВАЕТ МИР', accent: true }],
  ];
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 108, damping: 24, mass: 0.44 });
  const smoothY = useSpring(pointerY, { stiffness: 108, damping: 24, mass: 0.44 });
  const globeX = useTransform(smoothX, [-1, 1], [-26, 26]);
  const globeY = useTransform(smoothY, [-1, 1], [-18, 18]);
  const globeRotate = useTransform(smoothX, [-1, 1], [-3.4, 3.4]);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <GridBackground variant="diagonal-dark" className="px-5 pb-24 pt-28 md:px-10 md:pb-32 md:pt-36">
      <div
        className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,0.9fr)] lg:items-center"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
      >
        <motion.div
          className="hero-copy-block min-w-0 max-w-full"
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
          variants={revealGroup}
        >
          <h1 className="display-title hero-title max-w-none" aria-label="СТАТУС, КОТОРЫЙ ОТКРЫВАЕТ МИР">
            {titleLines.map((line, index) => (
              <span
                key={line.map((part) => part.text).join('')}
                className={`hero-title-line hero-title-line-${index + 1}`}
                aria-hidden="true"
              >
                <motion.span
                  className="inline-block"
                  initial={reduceMotion ? false : { y: '105%', opacity: 0.72 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.72, delay: 0.16 + index * 0.08, ease: motionEase }}
                >
                  {line.map((part) => (
                    <span key={part.text} className={part.accent ? 'hero-title-accent' : undefined}>
                      {part.text}
                    </span>
                  ))}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p className="body-copy mt-8 max-w-[31ch] md:max-w-xl" variants={fadeUp}>
            Оформляем ВНЖ и гражданство через проверенные программы.
          </motion.p>

          <motion.div className="mt-10 grid max-w-sm grid-cols-1 gap-3 sm:flex sm:max-w-none sm:flex-wrap" variants={fadeUp}>
            <PremiumButton href="#contact" variant="primary" className="w-full sm:w-auto">Обсудить маршрут</PremiumButton>
            <PremiumButton href="#programs" variant="outline" className="w-full sm:w-auto">Сравнить программы</PremiumButton>
          </motion.div>

        </motion.div>

        <motion.div
          className="relative -mt-4 min-h-[300px] min-w-0 max-w-full overflow-hidden lg:mt-0 lg:min-h-[520px]"
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
          variants={softScale}
        >
          <motion.div
            className="relative mx-auto flex aspect-square w-full max-w-[285px] items-center justify-center sm:max-w-[480px] lg:max-w-[570px]"
            style={reduceMotion ? undefined : { x: globeX, y: globeY, rotate: globeRotate }}
          >
            <Globe
              markers={markers}
              arcs={arcs}
              className="h-full w-full overflow-hidden"
              markerColor={[0.73, 0.57, 0.25]}
              baseColor={[0.16, 0.14, 0.1]}
              arcColor={[0.73, 0.57, 0.25]}
              glowColor={[0.14, 0.12, 0.08]}
              dark={1}
              mapBrightness={5.5}
              markerSize={0.014}
              markerElevation={0.02}
              arcWidth={1.15}
              arcHeight={0.34}
              speed={0.005}
              theta={0.22}
              diffuse={1.85}
            />
          </motion.div>
        </motion.div>
      </div>
    </GridBackground>
  );
}
