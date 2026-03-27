import React from 'react';
import { Search, X } from 'lucide-react';

interface InputAddonSearchProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  onClear?: () => void;
}

export const InputAddonSearch = ({ inputRef, onClear }: InputAddonSearchProps) => {
  const hasValue = inputRef.current?.value.length ?? 0 > 0;

  const clear = () => {
    if (inputRef.current) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      )?.set;
      nativeInputValueSetter?.call(inputRef.current, '');
      inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
      onClear?.();
    }
  };

  return hasValue ? (
    <button
      type="button"
      onClick={clear}
      aria-label="Clear search"
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        display: 'inline-flex',
        alignItems: 'center',
        color: 'inherit',
      }}
    >
      <X size={16} strokeWidth={1.75} />
    </button>
  ) : (
    <Search size={16} strokeWidth={1.75} />
  );
};