import { Globe2, Briefcase, FileCheck2 } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { fadeUp, revealGroup, viewportOnce } from '@/src/lib/motion';

const services = [
  {
    num: "01",
    title: "Переезд и ВНЖ",
    description: "Подбираем страну, программу и последовательность шагов для семьи: от первичной оценки до подачи и получения статуса.",
    icon: Globe2,
  },
  {
    num: "02",
    title: "Бизнес и активы",
    description: "Помогаем связать иммиграционный маршрут с компанией, счетами, инвестициями и задачами по релокации капитала.",
    icon: Briefcase,
  },
  {
    num: "03",
    title: "Визы и гражданство",
    description: "Проверяем основания для виз, ПМЖ, репатриации или второго паспорта и ведем процесс до понятного результата.",
    icon: FileCheck2,
  }
];

export function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-20 max-w-4xl md:mb-24"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportOnce}
          variants={revealGroup}
        >
          <p className="section-kicker">Практика</p>
          <motion.h3
            className="mt-4 font-display text-3xl leading-tight text-[var(--color-ink)] sm:text-4xl md:text-6xl"
            variants={fadeUp}
          >
            Закрываем путь от идеи переезда до оформленного статуса.
          </motion.h3>
        </motion.div>

        <motion.div
          className="grid gap-0 border-y border-[var(--color-rule)]"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportOnce}
          variants={revealGroup}
        >
          {services.map((service) => (
            <motion.article
              key={service.title}
              className="grid gap-6 border-b border-[var(--color-rule)] py-7 last:border-b-0 md:grid-cols-[0.16fr_0.24fr_0.6fr] md:items-start"
              variants={fadeUp}
              whileHover={reduceMotion ? undefined : { x: 6 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-[var(--color-muted)]">{service.num}</span>
                <service.icon className="h-5 w-5 text-[var(--color-accent)]" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h4 className="font-display text-2xl font-normal text-[var(--color-ink)]">{service.title}</h4>
              <p className="body-copy max-w-3xl text-sm md:text-base">{service.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
