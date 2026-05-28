"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { ArrowUp, Mail, MessageCircle, Phone } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
.cinematic-footer-wrapper {
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  --background: var(--color-background);
  --foreground: var(--color-foreground);
  --border: var(--color-border);
  --muted-foreground: var(--color-muted-foreground);
  --primary: var(--color-primary);
  --secondary: var(--color-secondary);
  --destructive: var(--color-destructive);

  --pill-bg-1: color-mix(in oklch, var(--foreground) 3%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground) 1%, transparent);
  --pill-shadow: color-mix(in oklch, var(--background) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--foreground) 10%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--background) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 8%, transparent);

  --pill-bg-1-hover: color-mix(in oklch, var(--foreground) 8%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--foreground) 2%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--background) 70%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow:
      0 10px 30px -10px var(--pill-shadow),
      inset 0 1px 1px var(--pill-highlight),
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: border-color 0.25s ease, background 0.25s ease, color 0.25s ease, transform 0.25s ease;
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow:
      0 14px 32px -14px var(--pill-shadow-hover),
      inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}

.footer-text-glow {
  background: linear-gradient(180deg, var(--foreground) 0%, color-mix(in oklch, var(--foreground) 68%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 14px color-mix(in oklch, var(--foreground) 7%, transparent));
}
`;

export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.15,
            y: y * 0.15,
            scale: 1.02,
            ease: "power2.out",
            duration: 0.3,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            scale: 1,
            ease: "power3.out",
            duration: 0.5,
          });
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          localRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
MagneticButton.displayName = "MagneticButton";

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 52%",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div
        ref={wrapperRef}
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="cinematic-footer-wrapper fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-transparent text-foreground">
          <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 pt-8 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground md:px-12 md:text-xs">
            <span>Гранд Резидент</span>
            <span>Global mobility consulting</span>
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6">
            <h2
              ref={headingRef}
              className="footer-text-glow mb-6 max-w-3xl text-center font-display text-4xl font-normal leading-tight tracking-normal md:text-6xl"
            >
              Начнем с консультации?
            </h2>
            <p className="mb-10 max-w-xl text-center text-sm font-light leading-relaxed text-[var(--color-ink-2)] md:text-base">
              Обсудим задачу, подходящую юрисдикцию и следующий практический шаг.
            </p>

            <div ref={linksRef} className="flex w-full flex-col items-center gap-5">
              <div className="flex w-full flex-wrap justify-center gap-4">
                <MagneticButton
                  as="a"
                  href="tel:+36201245566"
                  className="footer-glass-pill group flex min-h-11 items-center gap-3 rounded-full px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.08em] text-foreground"
                >
                  <Phone className="h-4 w-4 text-[var(--color-accent)] transition-colors group-hover:text-foreground" />
                  Позвонить
                </MagneticButton>

                <MagneticButton
                  as="a"
                  href="mailto:hello@grand-resident.com"
                  className="footer-glass-pill group flex min-h-11 items-center gap-3 rounded-full px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.08em] text-foreground"
                >
                  <Mail className="h-4 w-4 text-[var(--color-accent)] transition-colors group-hover:text-foreground" />
                  Написать
                </MagneticButton>
              </div>

              <div className="mt-2 flex w-full flex-wrap justify-center gap-3 md:gap-6">
                <MagneticButton
                  as="a"
                  href="#services"
                  className="footer-glass-pill rounded-full px-5 py-3 font-mono text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground hover:text-foreground"
                >
                  Услуги
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="#about"
                  className="footer-glass-pill rounded-full px-5 py-3 font-mono text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground hover:text-foreground"
                >
                  О компании
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="#contact"
                  className="footer-glass-pill rounded-full px-5 py-3 font-mono text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground hover:text-foreground"
                >
                  Контакты
                </MagneticButton>
              </div>
            </div>
          </div>

          <div className="relative z-20 flex w-full flex-col items-center justify-between gap-6 px-6 pb-8 md:flex-row md:px-12">
            <div className="order-2 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground md:order-1 md:text-xs">
              © 2026 Гранд Резидент. Все права защищены.
            </div>

            <div className="order-3 flex items-center gap-3">
              <MagneticButton
                as="a"
                href="#contact"
                className="footer-glass-pill flex h-12 w-12 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
                aria-label="Открыть контакты"
              >
                <MessageCircle className="h-5 w-5" />
              </MagneticButton>
              <MagneticButton
                as="button"
                onClick={scrollToTop}
                className="footer-glass-pill group flex h-12 w-12 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
                aria-label="Наверх"
              >
                <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1.5" />
              </MagneticButton>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
