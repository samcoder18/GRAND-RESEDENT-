import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Logo } from './Logo';
import { PremiumButton } from './ui/PremiumButton';
import { motionEase } from '@/src/lib/motion';

const navItems = [
  { href: '#about', label: 'О нас' },
  { href: '#services', label: 'Услуги' },
  { href: '#route', label: 'Отзывы' },
  { href: '#contact', label: 'Контакт' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-rule)] bg-[color-mix(in_oklch,var(--color-paper)_88%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-3 md:px-10">
        <Logo />
        
        <nav className="hidden items-center gap-8 md:flex" aria-label="Главная навигация">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap font-mono text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-muted)] transition-colors duration-200 ease-out hover:text-[var(--color-ink)]"
            >
              {item.label}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <PremiumButton href="#contact" variant="secondary" className="px-5 py-2">
              Консультация
            </PremiumButton>
          </div>
          <button
            type="button"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="grid min-h-11 min-w-11 place-items-center border border-[var(--color-rule)] text-[var(--color-accent)] md:hidden"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="border-t border-[var(--color-rule)] bg-[var(--color-paper)] px-5 py-5 md:hidden"
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.24, ease: motionEase }}
          >
            <nav className="grid gap-2" aria-label="Мобильная навигация">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border border-[var(--color-rule)] px-4 py-3 font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-ink)]"
                  initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.22, delay: index * 0.035, ease: motionEase }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
