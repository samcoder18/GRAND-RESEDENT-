"use client";

import React, { type ReactNode, useEffect, useId } from "react";
import { cn } from "@/lib/utils";
import {
  motion,
  type MotionValue,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

interface InfiniteGridBackgroundProps {
  className?: string;
  children?: ReactNode;
}

export function InfiniteGridBackground({
  className,
  children,
}: InfiniteGridBackgroundProps) {
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  useEffect(() => {
    const setInitialPosition = () => {
      mouseX.set(window.innerWidth / 2);
      mouseY.set(window.innerHeight / 2);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    setInitialPosition();
    window.addEventListener("resize", setInitialPosition);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", setInitialPosition);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  useAnimationFrame(() => {
    if (reduceMotion) return;

    gridOffsetX.set((gridOffsetX.get() + 0.5) % 40);
    gridOffsetY.set((gridOffsetY.get() + 0.5) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div className={cn("pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background", className)} aria-hidden="true">
      <div className="absolute inset-0 opacity-[0.045] text-muted-foreground">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>
      <motion.div
        className="absolute inset-0 opacity-35 text-[var(--color-accent)]"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--color-paper)_76%,transparent),transparent_22%,color-mix(in_oklch,var(--color-paper)_84%,transparent))]" />
      {children}
    </div>
  );
}

export const Component = InfiniteGridBackground;

const GridPattern = ({
  offsetX,
  offsetY,
}: {
  offsetX: MotionValue<number>;
  offsetY: MotionValue<number>;
}) => {
  const patternId = useId();

  return (
    <svg className="h-full w-full">
      <defs>
        <motion.pattern
          id={patternId}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};
