import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import styles from './Select.module.css';

type SelectSize = 'sm' | 'md' | 'lg';
type SelectState = 'default' | 'error' | 'success';

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  meta?: string;
  disabled?: boolean;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
}

export interface SelectProps {
  options?: SelectOption[];
  groups?: SelectGroup[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  size?: SelectSize;
  state?: SelectState;
  label?: string;
  helperText?: string;
  errorText?: string;
  successText?: string;
  multiline?: boolean;
  searchable?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
}

export const Select = ({
  options = [],
  groups = [],
  value,
  onChange,
  placeholder = 'Select an option...',
  size = 'md',
  state = 'default',
  label,
  helperText,
  errorText,
  successText,
  multiline = false,
  searchable = false,
  fullWidth = false,
  disabled = false,
  required = false,
  id,
  className,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlighted, setHighlighted] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const inputId = id ?? React.useId();
  const helperTextId = `${inputId}-helper`;

  const allOptions: SelectOption[] = groups.length > 0
    ? groups.flatMap((g: SelectGroup) => g.options)
    : options;

  const filteredOptions: SelectOption[] = search
    ? allOptions.filter((o: SelectOption) =>
        o.label.toLowerCase().includes(search.toLowerCase()) ||
        o.description?.toLowerCase().includes(search.toLowerCase())
      )
    : allOptions;

  const filteredGroups: SelectGroup[] = search
    ? groups.map((g: SelectGroup) => ({
        ...g,
        options: g.options.filter((o: SelectOption) =>
          o.label.toLowerCase().includes(search.toLowerCase()) ||
          o.description?.toLowerCase().includes(search.toLowerCase())
        ),
      })).filter(g => g.options.length > 0)
    : groups;

  const selectedOption = allOptions.find(o => o.value === value);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setOpen(false);
    setSearch('');
  };

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    const available = filteredOptions.filter(o => !o.disabled);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlighted(h => Math.min(h + 1, available.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlighted(h => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlighted >= 0 && available[highlighted]) {
        handleSelect(available[highlighted].value);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      setSearch('');
    }
  }, [open, filteredOptions, highlighted]);

  useEffect(() => {
    if (open && searchable) {
      setTimeout(() => searchRef.current?.focus(), 0);
    }
    if (!open) setHighlighted(-1);
  }, [open, searchable]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const wrapperClasses = [
    styles.wrapper,
    fullWidth ? styles.fullWidth : '',
    styles[size],
    state !== 'default' ? styles[state] : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  const triggerClasses = [
    styles.trigger,
    open ? styles.triggerOpen : '',
    multiline ? styles.triggerMultiline : '',
  ].filter(Boolean).join(' ');

  const renderTriggerContent = () => {
    if (!selectedOption) {
      return <span className={styles.triggerPlaceholder}>{placeholder}</span>;
    }
    if (multiline) {
      return (
        <div className={styles.optionContent}>
          <span className={styles.optionLabel}>{selectedOption.label}</span>
          {selectedOption.description && (
            <span className={styles.optionDescription}>{selectedOption.description}</span>
          )}
          {selectedOption.meta && (
            <span className={styles.optionMeta}>{selectedOption.meta}</span>
          )}
        </div>
      );
    }
    return <span>{selectedOption.label}</span>;
  };

  const renderOption = (option: SelectOption, index: number) => {
    const isSelected = option.value === value;
    const isHighlighted = highlighted === index;

    const optionClasses = [
      styles.option,
      multiline ? styles.optionMultiline : '',
      isSelected ? styles.optionSelected : '',
      isHighlighted ? styles.optionHighlighted : '',
      option.disabled ? styles.optionDisabled : '',
    ].filter(Boolean).join(' ');

    return (
      <button
        key={option.value}
        className={optionClasses}
        onClick={() => !option.disabled && handleSelect(option.value)}
        onMouseEnter={() => setHighlighted(index)}
        type="button"
        role="option"
        aria-selected={isSelected}
        disabled={option.disabled}
      >
        {multiline ? (
          <div className={styles.optionContent}>
            <span className={styles.optionLabel}>{option.label}</span>
            {option.description && (
              <span className={styles.optionDescription}>{option.description}</span>
            )}
            {option.meta && (
              <span className={styles.optionMeta}>{option.meta}</span>
            )}
          </div>
        ) : (
          <span>{option.label}</span>
        )}
        {isSelected && (
          <Check size={14} strokeWidth={2.5} className={styles.optionCheck} />
        )}
      </button>
    );
  };

  const renderOptions = () => {
    if (groups.length > 0) {
      return filteredGroups.map((group, gi) => (
        <div key={group.label} className={styles.group}>
          {gi > 0 && <div className={styles.divider} />}
          <div className={styles.groupLabel}>{group.label}</div>
          {group.options.map((option, oi) => renderOption(option, gi * 100 + oi))}
        </div>
      ));
    }
    return filteredOptions.map((option: SelectOption, i: number) => renderOption(option, i));
  };

  return (
    <div className={wrapperClasses}>
      {label && (
        <label
          htmlFor={inputId}
          className={`${styles.label} ${disabled ? styles.disabled : ''}`}
        >
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div className={styles.selectContainer} ref={containerRef}>
        <button
          id={inputId}
          type="button"
          className={triggerClasses}
          onClick={() => !disabled && setOpen(o => !o)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-describedby={helperText || errorText || successText ? helperTextId : undefined}
        >
          {renderTriggerContent()}
          <ChevronDown
            size={16}
            strokeWidth={1.75}
            className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
          />
        </button>

        {open && (
          <div className={styles.dropdown} role="listbox">
            {searchable && (
              <>
                <div className={styles.search}>
                  <input
                    ref={searchRef}
                    className={styles.searchInput}
                    placeholder="Search..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className={styles.searchDivider} />
              </>
            )}
            <div className={`${styles.dropdownInner} ${multiline ? styles.dropdownInnerMultiline : ''}`}>
              {renderOptions()}
            </div>
          </div>
        )}
      </div>

      {state === 'error' && errorText && (
        <span id={helperTextId} className={styles.errorText}>{errorText}</span>
      )}
      {state === 'success' && successText && (
        <span id={helperTextId} className={styles.successText}>{successText}</span>
      )}
      {state === 'default' && helperText && (
        <span id={helperTextId} className={styles.helperText}>{helperText}</span>
      )}
    </div>
  );
};

Select.displayName = 'Select';