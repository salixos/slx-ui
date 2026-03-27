import React from 'react';
import { LucideProps } from 'lucide-react';
import styles from './Icon.module.css';

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type IconColor = 'primary' | 'secondary' | 'muted' | 'disabled' | 'accent';

export interface IconProps {
  icon: React.ComponentType<LucideProps>;
  size?: IconSize;
  color?: IconColor;
  label?: string;
  className?: string;
}

const sizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
};

export const Icon = ({
  icon: LucideIcon,
  size = 'md',
  color = 'primary',
  label,
  className,
}: IconProps) => {
  const classes = [
    styles.icon,
    styles[size],
    styles[color],
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={classes}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={!label}
    >
      <LucideIcon size={sizeMap[size]} strokeWidth={1.75} />
    </span>
  );
};

Icon.displayName = 'Icon';