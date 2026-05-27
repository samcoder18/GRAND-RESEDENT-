import React from 'react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex min-w-0 items-center gap-3 ${className}`} aria-label="Гранд Резидент">
      <svg
        viewBox="0 0 118 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-11 w-[5.8rem] shrink-0 text-[var(--color-accent)]"
        role="img"
      >
        <title>Гранд Резидент</title>
        <path
          d="M53 16C48.3 8.4 39.1 4.5 28.8 4.5C15.6 4.5 5 14.2 5 27C5 39.8 15.6 49.5 28.8 49.5C40.2 49.5 49.2 43.8 53.1 35.2"
          stroke="currentColor"
          strokeWidth="8.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M65.4 16C70.1 8.4 79.3 4.5 89.6 4.5C102.8 4.5 113.4 14.2 113.4 27V33.2H78.4"
          stroke="currentColor"
          strokeWidth="8.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M42.5 29.1H63.4V48.6"
          stroke="currentColor"
          strokeWidth="8.6"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          d="M111.8 33.2H75.8"
          stroke="currentColor"
          strokeWidth="8.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="h-10 w-px shrink-0 bg-[var(--color-rule)]"></div>

      <div className="flex select-none flex-col leading-none">
        <span className="font-sans text-[13px] font-medium uppercase tracking-[0.24em] text-[var(--color-ink)]">
          Гранд
        </span>
        <span className="mt-1 font-sans text-[13px] font-medium uppercase tracking-[0.24em] text-[var(--color-accent)]">
          Резидент
        </span>
      </div>
    </div>
  );
}
