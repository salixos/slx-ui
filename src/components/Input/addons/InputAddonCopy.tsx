import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface InputAddonCopyProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export const InputAddonCopy = ({ inputRef }: InputAddonCopyProps) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (inputRef.current) {
      await navigator.clipboard.writeText(inputRef.current.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy to clipboard"
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        display: 'inline-flex',
        alignItems: 'center',
        color: 'inherit',
        transition: 'color 125ms cubic-bezier(0.2, 0, 0, 1)',
      }}
    >
      {copied
        ? <Check size={16} strokeWidth={1.75} />
        : <Copy size={16} strokeWidth={1.75} />
      }
    </button>
  );
};