import React from 'react';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface PremiumButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.FormEvent) => void;
  className?: string;
  type?: 'submit' | 'button';
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function PremiumButton({
  children,
  href,
  onClick,
  className = '',
  type = 'button',
  icon: Icon = ArrowRight,
  variant = 'outline'
}: PremiumButtonProps) {
  const isLink = !!href;
  const baseClasses = `premium-btn ${className}`;

  const innerContent = (
    <span className="premium-btn-content flex items-center justify-center gap-3">
      <span>{children}</span>
      <Icon className="premium-btn-icon h-3.5 w-3.5" aria-hidden="true" />
    </span>
  );

  if (isLink) {
    return (
      <a href={href} className={baseClasses} data-variant={variant}>
        {innerContent}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClasses} data-variant={variant}>
      {innerContent}
    </button>
  );
}
