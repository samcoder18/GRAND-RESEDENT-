import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'motion/react';
import { fadeUp, motionEase, revealGroup, viewportOnce } from '@/src/lib/motion';

const facts = [
  ['2011', 'помогаем с переездом и резиденцией'],
  ['500+', 'клиентов получили понятный план действий'],
  ['1:1', 'решение под семью, сроки и капитал'],
];

function AnimatedFactValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (!inView || reduceMotion) {
      setDisplayValue(value);
      return;
    }

    if (value === '500+') {
      setDisplayValue('0+');
      const controls = animate(0, 500, {
        duration: 1.15,
        ease: motionEase,
        onUpdate: (latest) => setDisplayValue(`${Math.round(latest)}+`),
      });

      return () => controls.stop();
    }

    if (value === '2011') {
      setDisplayValue('1998');
      const controls = animate(1998, 2011, {
        duration: 0.9,
        ease: motionEase,
        onUpdate: (latest) => setDisplayValue(String(Math.round(latest))),
      });

      return () => controls.stop();
    }

    if (value === '1:1') {
      setDisplayValue('0:0');
      const controls = animate(0, 1, {
        duration: 0.85,
        ease: motionEase,
        onUpdate: (latest) => {
          const rounded = Math.round(latest);
          setDisplayValue(`${rounded}:${rounded}`);
        },
      });

      return () => controls.stop();
    }

    setDisplayValue(value);
  }, [inView, reduceMotion, value]);

  return <span ref={ref}>{displayValue}</span>;
}

export function About() {
  const reduceMotion = useReducedMotion();
  const titleParts = ['Подбираем страну', 'и программу под вашу', 'реальную ситуацию.'];

  return (
    <section id="about" className="px-5 py-24 md:px-10 md:py-36">
      <motion.div
        className="mx-auto max-w-7xl"
        initial={reduceMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={viewportOnce}
        variants={revealGroup}
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.56fr)_minmax(0,0.44fr)] lg:items-end lg:gap-16">
          <motion.div className="min-w-0" variants={revealGroup}>
            <motion.p className="section-kicker" variants={fadeUp}>О нас</motion.p>
            <h2 className="mt-4 max-w-4xl font-display text-4xl leading-tight text-[var(--color-ink)] md:text-6xl">
              {titleParts.map((part, index) => (
                <span key={part} className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    className="block"
                    variants={{
                      hidden: { opacity: 0.75, y: '105%' },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.72, delay: index * 0.05, ease: motionEase },
                      },
                    }}
                  >
                    {part}
                  </motion.span>
                </span>
              ))}
            </h2>
            <motion.p className="body-copy mt-8 max-w-2xl" variants={fadeUp}>
              Оцениваем цели переезда, состав семьи, бюджет, сроки и риски. После этого показываем маршрут, который можно пройти без лишних шагов и публичности.
            </motion.p>
          </motion.div>

          <motion.blockquote
            className="relative min-w-0 pl-6 lg:mb-2"
            variants={fadeUp}
          >
            <motion.span
              className="absolute bottom-0 left-0 top-0 w-px origin-top bg-[var(--color-accent)]"
              initial={reduceMotion ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, delay: 0.25, ease: motionEase }}
              aria-hidden="true"
            />
            <p className="max-w-[34rem] text-base leading-relaxed text-[var(--color-ink-2)] md:text-lg">
              «Хорошее решение начинается не со страны, а с вводных клиента»
            </p>
            <motion.footer className="mt-8 border-t border-[var(--color-rule)] pt-5" variants={fadeUp}>
              <p className="font-display text-3xl leading-none text-[var(--color-ink)] md:text-4xl">Алексей Богданов</p>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-accent)]">Основатель Гранд Резидент</p>
            </motion.footer>
          </motion.blockquote>
        </div>

        <motion.div className="mt-14 grid gap-8 md:grid-cols-3" variants={revealGroup}>
          {facts.map(([value, label]) => (
            <motion.div
              key={value}
              className="group relative py-6 md:px-7 md:first:pl-0 md:last:pr-0"
              variants={fadeUp}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              transition={{ duration: 0.35, ease: motionEase }}
            >
              <p className="font-display text-4xl leading-none text-[var(--color-accent)] md:text-5xl">
                <AnimatedFactValue value={value} />
              </p>
              <p className="mt-4 max-w-[28ch] font-mono text-xs uppercase leading-relaxed tracking-[0.08em] text-[var(--color-muted)]">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
