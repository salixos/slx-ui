import React from 'react';
import { Loader } from 'lucide-react';

export const InputAddonLoading = () => {
  return (
    <span
      aria-label="Loading"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        animation: 'spin 600ms linear infinite',
        color: 'inherit',
      }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <Loader size={16} strokeWidth={1.75} />
    </span>
  );
};