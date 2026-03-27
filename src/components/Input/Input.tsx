import React from 'react';
import styles from './Input.module.css';

type InputVariant = 'default' | 'filled' | 'flushed';
type InputSize = 'sm' | 'md' | 'lg';
type InputState = 'default' | 'error' | 'success';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  size?: InputSize;
  state?: InputState;
  fullWidth?: boolean;
  label?: string;
  helperText?: string;
  errorText?: string;
  successText?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  leftAddonInteractive?: boolean;
  rightAddonInteractive?: boolean;
  maxChars?: number;
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      size = 'md',
      state = 'default',
      fullWidth = false,
      label,
      helperText,
      errorText,
      successText,
      leftAddon,
      rightAddon,
      leftAddonInteractive = false,
      rightAddonInteractive = true,
      maxChars,
      className,
      disabled,
      id,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId();
    const helperTextId = `${inputId}-helper`;

    const wrapperClasses = [
      styles.inputWrapper,
      styles[size],
      styles[variant],
      state !== 'default' ? styles[state] : '',
      leftAddon ? styles.hasLeftAddon : '',
      rightAddon ? styles.hasRightAddon : '',
    ]
      .filter(Boolean)
      .join(' ');

    const currentLength = typeof value === 'string' ? value.length : 0;
    const isOverLimit = maxChars !== undefined && currentLength > maxChars;

    const resolvedState = isOverLimit ? 'error' : state;

    return (
      <div className={[styles.wrapper, fullWidth ? styles.fullWidth : '', className ?? ''].filter(Boolean).join(' ')}>
        {label && (
          <label
            htmlFor={inputId}
            className={`${styles.label} ${disabled ? styles.disabled : ''}`}
          >
            {label}
            {props.required && <span className={styles.required}>*</span>}
          </label>
        )}

        <div className={wrapperClasses}>
          {leftAddon && (
            <span className={`${styles.leftAddon} ${leftAddonInteractive ? styles.interactive : ''}`}>
              {leftAddon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={styles.input}
            disabled={disabled}
            value={value}
            onChange={onChange}
            aria-describedby={helperText || errorText || successText ? helperTextId : undefined}
            aria-invalid={resolvedState === 'error'}
            {...props}
          />

          {rightAddon && (
            <span className={`${styles.rightAddon} ${rightAddonInteractive ? styles.interactive : ''}`}>
              {rightAddon}
            </span>
          )}
        </div>

        {maxChars !== undefined && (
          <span className={`${styles.characterCount} ${isOverLimit ? styles.overLimit : ''}`}>
            {currentLength}/{maxChars}
          </span>
        )}

        {resolvedState === 'error' && errorText && (
          <span id={helperTextId} className={styles.errorText}>{errorText}</span>
        )}

        {resolvedState === 'success' && successText && (
          <span id={helperTextId} className={styles.successText}>{successText}</span>
        )}

        {resolvedState === 'default' && helperText && (
          <span id={helperTextId} className={styles.helperText}>{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';