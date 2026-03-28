import React, { useEffect, useRef } from 'react';
import styles from './Textarea.module.css';

type TextareaState = 'default' | 'error' | 'success';
type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  state?: TextareaState;
  label?: string;
  helperText?: string;
  errorText?: string;
  successText?: string;
  maxChars?: number;
  fullWidth?: boolean;
  autoGrow?: boolean;
  resize?: TextareaResize;
  className?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      state = 'default',
      label,
      helperText,
      errorText,
      successText,
      maxChars,
      fullWidth = false,
      autoGrow = false,
      resize = 'vertical',
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
    const innerRef = useRef<HTMLTextAreaElement>(null);
    const resolvedRef = (ref as React.RefObject<HTMLTextAreaElement>) ?? innerRef;

    const currentLength = typeof value === 'string' ? value.length : 0;
    const isOverLimit = maxChars !== undefined && currentLength > maxChars;
    const resolvedState = isOverLimit ? 'error' : state;

    useEffect(() => {
      if (autoGrow && resolvedRef.current) {
        resolvedRef.current.style.height = 'auto';
        resolvedRef.current.style.height = `${resolvedRef.current.scrollHeight}px`;
      }
    }, [value, autoGrow, resolvedRef]);

    const wrapperClasses = [
      styles.wrapper,
      fullWidth ? styles.fullWidth : '',
      resolvedState !== 'default' ? styles[resolvedState] : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    const textareaClasses = [
      styles.textarea,
      styles[`resize-${autoGrow ? 'none' : resize}`],
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        {label && (
          <label
            htmlFor={inputId}
            className={`${styles.label} ${disabled ? styles.disabled : ''}`}
          >
            {label}
            {props.required && <span className={styles.required}>*</span>}
          </label>
        )}

        <textarea
          ref={resolvedRef}
          id={inputId}
          className={textareaClasses}
          disabled={disabled}
          value={value}
          onChange={onChange}
          aria-describedby={helperText || errorText || successText ? helperTextId : undefined}
          aria-invalid={resolvedState === 'error'}
          {...props}
        />

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

Textarea.displayName = 'Textarea';