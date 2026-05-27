import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    quote:
      'Команда спокойно разложила варианты по странам, срокам и требованиям к документам. После первой консультации стало понятно, какой маршрут реалистичен для нашей семьи.',
    name: 'Анна Мельникова',
    designation: 'Предприниматель, ВНЖ в Испании',
    src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop',
  },
  {
    quote:
      'Нам помогли связать бизнес-задачи, банковские вопросы и иммиграционный процесс в один понятный план. Особенно ценю, что нас заранее предупредили о рисках.',
    name: 'Михаил Волков',
    designation: 'Основатель IT-компании, бизнес-релокация',
    src: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop',
  },
  {
    quote:
      'Процесс был сложным, но сопровождение оказалось очень собранным: чек-листы, сроки, переводы, апостили и коммуникация с юристами были под контролем.',
    name: 'Елена Соколова',
    designation: 'Финансовый директор, программа для семьи',
    src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop',
  },
  {
    quote:
      'Мы сравнивали несколько стран и не хотели ошибиться с бюджетом. Консультанты показали не только плюсы программ, но и ограничения по проживанию и продлению.',
    name: 'Кирилл Орлов',
    designation: 'Инвестор, европейский ВНЖ',
    src: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop',
  },
  {
    quote:
      'Понравилось, что нам не продавали универсальное решение. Сначала проверили вводные и документы, затем предложили маршрут с понятным календарем действий.',
    name: 'Мария Романова',
    designation: 'Частный клиент, второй статус',
    src: 'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?q=80&w=1887&auto=format&fit=crop',
  },
];

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

const AnimatedTestimonials = ({
  testimonials,
  autoplay = true,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = React.useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoplay, handleNext]);

  const isActive = (index: number) => index === active;
  const randomRotate = () => `${Math.floor(Math.random() * 16) - 8}deg`;

  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-20">
        <div className="flex items-center justify-center">
          <div className="relative h-80 w-full max-w-xs">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{ opacity: 0, scale: 0.9, y: 50, rotate: randomRotate() }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.5,
                    scale: isActive(index) ? 1 : 0.9,
                    y: isActive(index) ? 0 : 20,
                    zIndex: isActive(index) ? testimonials.length : testimonials.length - Math.abs(index - active),
                    rotate: isActive(index) ? '0deg' : randomRotate(),
                  }}
                  exit={{ opacity: 0, scale: 0.9, y: -50 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="absolute inset-0 origin-bottom"
                  style={{ perspective: '1000px' }}
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover shadow-2xl"
                    onError={(event) => {
                      event.currentTarget.src = `https://placehold.co/500x500/e2e8f0/64748b?text=${testimonial.name.charAt(0)}`;
                      event.currentTarget.onerror = null;
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col justify-center py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="flex flex-col justify-between"
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-accent)]">Отзывы</p>
                <h3 className="mt-4 text-2xl font-bold text-[var(--color-ink)]">{testimonials[active].name}</h3>
                <p className="text-sm text-[var(--color-muted)]">{testimonials[active].designation}</p>
                <motion.p className="mt-8 text-lg leading-relaxed text-[var(--color-ink-2)]">
                  "{testimonials[active].quote}"
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-4 pt-12">
            <button
              onClick={handlePrev}
              aria-label="Предыдущий отзыв"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-rule)] bg-[var(--color-paper-2)] transition-colors hover:border-[var(--color-rule-2)] hover:bg-[var(--color-paper-3)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:ring-offset-2 focus:ring-offset-[var(--color-paper)]"
            >
              <ArrowLeft className="h-5 w-5 text-[var(--color-ink)] transition-transform duration-300 group-hover:-translate-x-1" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Следующий отзыв"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-rule)] bg-[var(--color-paper-2)] transition-colors hover:border-[var(--color-rule-2)] hover:bg-[var(--color-paper-3)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:ring-offset-2 focus:ring-offset-[var(--color-paper)]"
            >
              <ArrowRight className="h-5 w-5 text-[var(--color-ink)] transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function AnimatedTestimonialsDemo() {
  return <AnimatedTestimonials testimonials={testimonials} />;
}

export function Component() {
  return (
    <section id="testimonials" className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[var(--color-paper)]">
      <style>
        {`
          @keyframes animate-grid {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }

          .animated-grid {
            width: 200%;
            height: 200%;
            background-image:
              linear-gradient(to right, color-mix(in oklch, var(--color-rule) 70%, transparent) 1px, transparent 1px),
              linear-gradient(to bottom, color-mix(in oklch, var(--color-rule) 70%, transparent) 1px, transparent 1px);
            background-size: 3rem 3rem;
            animation: animate-grid 40s linear infinite alternate;
          }
        `}
      </style>
      <div className="animated-grid absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />

      <div className="z-10">
        <AnimatedTestimonialsDemo />
      </div>
    </section>
  );
}
