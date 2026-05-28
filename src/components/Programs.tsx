import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { fadeUp, motionEase, revealGroup, viewportOnce } from '@/src/lib/motion';

const programs = [
  {
    country: 'Бельгия',
    flag: 'belgium',
    entries: [
      { program: 'ВНЖ — Длительная командировка', term: '6 месяцев', price: 'По запросу', citizenship: '6 лет' },
      { program: 'ВНЖ — Трудоустройство', term: '6 месяцев', price: 'По запросу', citizenship: '6 лет' },
      { program: 'ВНЖ — Открытие бизнеса', term: '6-9 месяцев', price: 'По запросу', citizenship: '6 лет' },
    ],
  },
  {
    country: 'Венгрия',
    flag: 'hungary',
    entries: [
      { program: 'ВНЖ — Белая карта', term: '2 месяца', price: 'По запросу', citizenship: '7 лет' },
    ],
  },
  {
    country: 'Парагвай',
    flag: 'paraguay',
    entries: [
      { program: 'ВНЖ — Натурализация', term: '2 месяца', price: '€ 10 000', citizenship: '4 года' },
    ],
  },
];

const headers = ['Страна', 'Программа', 'Сроки', 'Цена', 'Гражданство'];

function FlagMark({ type }: { type: string }) {
  return (
    <span className={`program-flag program-flag-${type}`} aria-hidden="true">
      <span className="program-flag-core" />
    </span>
  );
}

export function Programs() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="programs" className="relative overflow-hidden px-5 py-16 md:px-10 md:py-24">
      <motion.div
        className="mx-auto max-w-7xl"
        initial={reduceMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={viewportOnce}
        variants={revealGroup}
      >
        <div className="grid gap-9 lg:grid-cols-[minmax(0,0.68fr)_minmax(18rem,0.32fr)] lg:items-end lg:gap-16">
          <motion.div className="min-w-0" variants={revealGroup}>
            <motion.p className="section-kicker" variants={fadeUp}>Программы</motion.p>
            <motion.h2
              className="mt-4 max-w-4xl text-balance font-display text-4xl leading-tight text-[var(--color-ink)] md:text-6xl"
              variants={fadeUp}
            >
              В мире нет места, которое идеально для каждого
            </motion.h2>
          </motion.div>
          <motion.div
            className="max-w-[28rem] border-t border-[var(--color-rule)] pt-5 lg:max-w-none lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
            variants={fadeUp}
          >
            <p className="text-balance font-display text-[2rem] leading-[1.06] text-[var(--color-ink)] sm:text-[2.35rem] lg:text-[2.7rem]">
              но есть страны, которые подходят именно вам
            </p>
          </motion.div>
        </div>

        <motion.div className="mt-16 overflow-hidden border-y border-[var(--color-rule)] md:mt-20" variants={fadeUp}>
          <div className="hidden grid-cols-[0.21fr_0.33fr_0.15fr_0.15fr_0.16fr] border-b border-[var(--color-rule)] py-4 font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-muted)] lg:grid">
            {headers.map((header) => (
              <span key={header}>{header}</span>
            ))}
          </div>

          <motion.div variants={revealGroup}>
            {programs.map((country) => (
              <motion.article
                key={country.country}
                className="program-country-row border-b border-[var(--color-rule)] py-5 last:border-b-0 lg:py-0"
                variants={fadeUp}
              >
                <div className="grid gap-5 lg:grid-cols-[0.21fr_0.79fr]">
                  <div className="flex items-center gap-3 lg:py-6">
                    <FlagMark type={country.flag} />
                    <div>
                      <h3 className="font-mono text-sm uppercase tracking-[0.08em] text-[var(--color-ink)]">{country.country}</h3>
                      <p className="mt-1.5 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-[var(--color-muted)] lg:hidden">
                        {country.entries[0].citizenship} до гражданства
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-0">
                    {country.entries.map((entry, index) => (
                      <motion.div
                        key={`${country.country}-${entry.program}`}
                        className="program-entry group grid gap-4 border-t border-[var(--color-rule)] py-5 first:border-t-0 lg:grid-cols-[0.42fr_0.19fr_0.19fr_0.2fr] lg:items-center lg:py-6"
                        whileHover={reduceMotion ? undefined : { x: 6 }}
                        transition={{ duration: 0.42, ease: motionEase }}
                      >
                        <p className="max-w-[34ch] text-lg leading-snug text-[var(--color-ink)] md:text-xl lg:text-base">
                          {entry.program}
                        </p>
                        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-[var(--color-ink-2)] lg:contents">
                          <div>
                            <dt className="program-mobile-label">Сроки</dt>
                            <dd>{entry.term}</dd>
                          </div>
                          <div>
                            <dt className="program-mobile-label">Цена</dt>
                            <dd>{entry.price}</dd>
                          </div>
                          <div>
                            <dt className="program-mobile-label">Гражданство</dt>
                            <dd>{entry.citizenship}</dd>
                          </div>
                          <div className="col-span-2 lg:col-span-1">
                            {index === 0 && (
                              <a
                                href="#contact"
                                className="program-link inline-flex min-h-11 items-center gap-3 font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-accent)]"
                              >
                                Подробнее
                                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.6} aria-hidden="true" />
                              </a>
                            )}
                          </div>
                        </dl>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
