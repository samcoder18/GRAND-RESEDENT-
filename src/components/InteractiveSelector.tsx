import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { PremiumButton } from './ui/PremiumButton';
import { fadeUp, motionEase, revealGroup, softScale, viewportOnce } from '@/src/lib/motion';

type Destination = 'europe' | 'asia' | 'carribean' | 'americas';
type InvestmentStyle = 'realestate' | 'business' | 'capital' | 'none';
type Aim = 'citizenship' | 'tax' | 'mobility' | 'safety';

export function InteractiveSelector() {
  const [destination, setDestination] = useState<Destination>('europe');
  const [investment, setInvestment] = useState<InvestmentStyle>('realestate');
  const [aim, setAim] = useState<Aim>('citizenship');
  const reduceMotion = useReducedMotion();

  // Logic to determine the customized program recommendation
  const getRecommendation = () => {
    if (destination === 'europe') {
      if (investment === 'realestate' || investment === 'capital') {
        return {
          country: "Венгрия и Испания",
          title: "Инвестиционный ВНЖ",
          description: "Подходит, если семье нужен европейский статус, понятный бюджет и возможность свободно перемещаться по Шенгену.",
          time: "3-6 месяцев",
          benefits: ["Проверить бюджет и источник средств", "Сравнить требования по проживанию", "Оценить перспективу для семьи"]
        };
      }
      if (investment === 'business') {
        return {
          country: "Бельгия / Испания",
          title: "Бизнес-релокация",
          description: "Подходит, если нужно перенести часть бизнеса, открыть компанию или получить статус через предпринимательскую активность.",
          time: "2-4 месяца",
          benefits: ["Проверить бизнес-модель", "Оценить банковский и налоговый контекст", "Собрать план для семьи и компании"]
        };
      }
      return {
        country: "Румыния / Польша",
        title: "Репатриация",
        description: "Подходит, если у семьи могут быть корни или архивные основания для гражданства без инвестиционной программы.",
        time: "12-18 месяцев",
        benefits: ["Проверить семейную линию", "Понять список документов", "Оценить сроки до подачи"]
      };
    }

    if (destination === 'carribean') {
      return {
        country: "Карибский бассейн (Гренада, Антигуа)",
        title: "Гражданство за инвестиции",
        description: "Подходит, если нужен второй паспорт с понятным сроком, дистанционным процессом и высокой конфиденциальностью.",
        time: "4-6 месяцев",
        benefits: ["Сравнить программы и платежи", "Проверить требования due diligence", "Выбрать безопасную структуру подачи"]
      };
    }

    if (destination === 'asia') {
      if (investment === 'none') {
        return {
          country: "ОАЭ (Золотая Резиденция)",
          title: "Виза таланта",
          description: "Подходит, если статус можно получить через профессиональный профиль, предпринимательство или удаленную работу.",
          time: "1-2 месяца",
          benefits: ["Проверить профиль заявителя", "Подготовить подтверждения опыта", "Оценить налоговую резиденцию"]
        };
      }
      return {
        country: "ОАЭ / Таиланд",
        title: "Золотая резиденция",
        description: "Подходит, если нужен долгосрочный статус в удобной деловой юрисдикции для жизни, счетов и поездок.",
        time: "1-3 месяца",
        benefits: ["Сравнить основания для статуса", "Понять требования к активам", "Подготовить документы для счетов"]
      };
    }

    // Americas
    return {
      country: "США (Виза EB-5 / L-1)",
      title: "Бизнес-релокация",
      description: "Подходит, если цель связана с рынком США: инвестиции, перевод руководителя, бизнес-план или долгосрочный переезд семьи.",
      time: "12-24 месяцев",
      benefits: ["Выбрать между EB-5, L-1 и альтернативами", "Оценить доказательную базу", "Построить реалистичный календарь"]
    };
  };

  const rec = getRecommendation();
  const recKey = `${destination}-${investment}-${aim}`;

  return (
    <section id="route" className="px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-10 max-w-2xl"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportOnce}
          variants={revealGroup}
        >
          <p className="section-kicker">Первичный отбор</p>
          <motion.h3 className="mt-4 font-display text-4xl leading-tight text-[var(--color-ink)] md:text-5xl" variants={fadeUp}>
            Ответьте на три вопроса и получите направление.
          </motion.h3>
          <motion.p className="body-copy mt-5" variants={fadeUp}>
            Это не финальное решение, а быстрый способ понять, какие программы стоит обсуждать на консультации.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid gap-8 lg:grid-cols-[minmax(0,0.54fr)_minmax(0,0.46fr)] lg:items-start"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={viewportOnce}
          variants={revealGroup}
        >
          <motion.div className="space-y-7" variants={fadeUp}>
            <div>
              <div className="mb-3 flex items-baseline justify-between gap-4 pb-3">
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-accent)]">Регион</span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { id: 'europe', label: 'Европа' },
                  { id: 'asia', label: 'Азия / ОАЭ' },
                  { id: 'carribean', label: 'Карибы' },
                  { id: 'americas', label: 'США / Латам' }
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setDestination(item.id as Destination)}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    className={`min-h-11 border px-3 py-2 font-mono text-xs uppercase tracking-[0.06em] transition-colors duration-200 ease-out ${
                      destination === item.id 
                        ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-ink)]' 
                        : 'border-[var(--color-rule)] bg-[var(--color-paper-2)] text-[var(--color-ink-2)] hover:border-[var(--color-rule-2)]'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-baseline justify-between gap-4 pb-3">
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-accent)]">Основание</span>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  { id: 'realestate', label: 'Недвижимость', desc: 'готовы рассмотреть покупку' },
                  { id: 'business', label: 'Бизнес', desc: 'есть компания или план' },
                  { id: 'capital', label: 'Капитал', desc: 'депозит, фонд или вложения' },
                  { id: 'none', label: 'Без инвестиций', desc: 'корни, профиль или работа' }
                ].map((item) => {
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => setInvestment(item.id as InvestmentStyle)}
                      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                      className={`min-h-[82px] cursor-pointer border p-4 text-left transition-colors duration-200 ease-out ${
                        investment === item.id 
                          ? 'border-[var(--color-accent)] bg-[var(--color-paper-3)] text-[var(--color-ink)]' 
                          : 'border-[var(--color-rule)] bg-[var(--color-paper-2)] text-[var(--color-ink-2)] hover:border-[var(--color-rule-2)]'
                      }`}
                    >
                      <div className="font-mono text-xs uppercase tracking-[0.06em]">{item.label}</div>
                      <div className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{item.desc}</div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-baseline justify-between gap-4 pb-3">
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-accent)]">Цель</span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { id: 'citizenship', label: 'Паспорт / ПМЖ' },
                  { id: 'tax', label: 'Налоги' },
                  { id: 'mobility', label: 'Мобильность' },
                  { id: 'safety', label: 'Безопасность' }
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setAim(item.id as Aim)}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    className={`min-h-11 border px-3 py-2 font-mono text-xs uppercase tracking-[0.06em] transition-colors duration-200 ease-out ${
                      aim === item.id 
                        ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-ink)]' 
                        : 'border-[var(--color-rule)] bg-[var(--color-paper-2)] text-[var(--color-ink-2)] hover:border-[var(--color-rule-2)]'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.aside className="surface flex min-h-[420px] flex-col justify-between overflow-hidden p-6 md:p-8" variants={softScale}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={recKey}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.34, ease: motionEase }}
              >
            <div>
              <div className="mb-7 flex items-center justify-between gap-6 pb-4">
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-accent)]">Ваш ориентир</span>
                <span className="font-mono text-xs text-[var(--color-muted)]">не оферта</span>
              </div>
                
              <span className="inline-block border border-[var(--color-rule-2)] px-3 py-1 font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-accent)]">
                {rec.country}
              </span>
                
              <h4 className="mt-5 font-display text-3xl font-normal leading-tight text-[var(--color-ink)] md:text-4xl">
                {rec.title}
              </h4>
                
              <p className="body-copy mt-5 text-sm md:text-base">{rec.description}</p>

              <div className="mt-8 space-y-5 pt-6">
                <div className="flex justify-between gap-6 text-sm">
                <span className="font-mono uppercase tracking-[0.08em] text-[var(--color-muted)]">Срок</span>
                  <span className="text-right font-medium text-[var(--color-accent)]">{rec.time}</span>
                </div>
                  <div>
                  <span className="mb-3 block font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-muted)]">Что разберем</span>
                    <ul className="space-y-3">
                      {rec.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[var(--color-ink-2)]">
                        <span className="mt-1 h-3 w-px flex-shrink-0 bg-[var(--color-accent)]"></span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10">
                <PremiumButton 
                  href="#contact" 
                  variant="primary" 
                  className="w-full"
                  icon={ChevronRight}
                >
                  Обсудить мой случай
                </PremiumButton>
              </div>
          </motion.aside>

        </motion.div>
      </div>
    </section>
  );
}
