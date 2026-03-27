import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  external?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      external = false,
      leftIcon,
      rightIcon,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isLink = variant === 'link';

    const classes = [
      styles.button,
      styles[variant],
      !isLink ? styles[size] : '',
      fullWidth ? styles.fullWidth : '',
      loading ? styles.loading : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <span className={styles.spinner} aria-hidden="true" />}
        {leftIcon && leftIcon}
        {isLink ? (
          <span className={styles.linkText}>{children}</span>
        ) : (
          children
        )}
        {rightIcon && rightIcon}
        {isLink && external && (
          <span className={styles.externalIcon} aria-hidden="true">
            <ArrowUpRight size={14} />
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';