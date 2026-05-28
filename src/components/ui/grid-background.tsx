import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GridBackgroundProps {
  children?: ReactNode;
  className?: string;
  variant?: "light-orb" | "diagonal-dark" | "site";
}

export function GridBackground({
  children,
  className,
  variant = "site",
}: GridBackgroundProps) {
  const background =
    variant === "light-orb"
      ? {
          background: "white",
          backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
            radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
          `,
          backgroundSize: "40px 40px, 40px 40px, 100% 100%",
        }
      : variant === "diagonal-dark"
        ? {
            backgroundColor: "transparent",
            backgroundImage: `
              linear-gradient(45deg, color-mix(in oklch, var(--color-accent) 7%, transparent) 1px, transparent 1px),
              linear-gradient(-45deg, color-mix(in oklch, var(--color-rule-2) 18%, transparent) 1px, transparent 1px),
              radial-gradient(circle at 74% 42%, color-mix(in oklch, var(--color-accent) 6%, transparent) 0%, transparent 34%)
            `,
            backgroundPosition: "center top, center top, center",
            backgroundSize: "56px 56px, 56px 56px, 100% 100%",
          }
        : {
            backgroundImage: `
              linear-gradient(90deg, transparent 0, transparent calc(100% - 1px), color-mix(in oklch, var(--color-rule) 72%, transparent) calc(100% - 1px))
            `,
            backgroundSize: "clamp(4rem, 12vw, 11rem) 100%",
            backgroundColor: "transparent",
          };

  return (
    <div className={cn("relative w-full overflow-clip", className)}>
      <div className="absolute inset-0 z-0 pointer-events-none" style={background} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export const Component = GridBackground;

export default GridBackground;
