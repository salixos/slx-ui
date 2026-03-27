import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputAddonPasswordProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export const InputAddonPassword = ({ inputRef }: InputAddonPasswordProps) => {
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    setVisible(v => !v);
    if (inputRef.current) {
      inputRef.current.type = visible ? 'password' : 'text';
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={visible ? 'Hide password' : 'Show password'}
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
      {visible ? <EyeOff size={16} strokeWidth={1.75} /> : <Eye size={16} strokeWidth={1.75} />}
    </button>
  );
};