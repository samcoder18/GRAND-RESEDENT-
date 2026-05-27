import { motion, useReducedMotion } from 'motion/react';
import { PremiumButton } from './ui/PremiumButton';
import { fadeUp, revealGroup, softScale, viewportOnce } from '@/src/lib/motion';

export function Contact() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="contact" className="px-5 py-24 md:px-10 md:py-36">
      <motion.div
        className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.48fr_0.52fr] lg:items-start"
        initial={reduceMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={viewportOnce}
        variants={revealGroup}
      >
        <motion.div variants={fadeUp}>
          <p className="section-kicker">Следующий шаг</p>
          <h3 className="mt-4 font-display text-4xl leading-tight text-[var(--color-ink)] md:text-6xl">
            Получите первичный разбор вашего маршрута.
          </h3>
          <p className="body-copy mt-6 max-w-xl">
            Оставьте контакт, и мы уточним вводные: страну, сроки, состав семьи, бюджет и цель переезда. После этого предложим ближайшие реалистичные варианты.
          </p>
        </motion.div>

        <motion.form
          className="surface space-y-5 p-6 md:p-8"
          onSubmit={(e) => e.preventDefault()}
          variants={softScale}
        >
            <div>
            <label htmlFor="name" className="mb-2 block font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-muted)]">Имя</label>
              <input 
              id="name"
                type="text" 
              autoComplete="name"
              placeholder="Как к вам обращаться" 
              className="field w-full"
              />
            </div>
            <div>
            <label htmlFor="contact-channel" className="mb-2 block font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-muted)]">Телефон или мессенджер</label>
              <input 
              id="contact-channel"
                type="tel" 
              autoComplete="tel"
              placeholder="+36 или @имя" 
              className="field w-full"
              />
            </div>
            <div className="pt-4">
              <PremiumButton type="submit" variant="primary" className="w-full">
                Получить разбор
              </PremiumButton>
            </div>
          <p className="text-sm leading-relaxed text-[var(--color-muted)]">
            Первичный контакт конфиденциален. Детали программы обсуждаем только после проверки вводных и документов.
          </p>
          </motion.form>
      </motion.div>
    </section>
  );
}
