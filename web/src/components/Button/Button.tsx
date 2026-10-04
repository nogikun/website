import type { ComponentPropsWithoutRef } from 'react';
import './Button.css';

// Keep the props of legacy/dev/vite's Button, and support native button props.
export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  label: string;
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  backgroundColor?: string;
  color?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
}

export function Button({ label, primary = false, size = 'medium', backgroundColor,
  color, width, height, borderRadius, style, className = '', type = 'button', ...props }: ButtonProps) {
  return (
    <button type={type}
      className={`button button--${primary ? 'primary' : 'secondary'} button--${size} ${className}`}
      style={{ backgroundColor, color, width, height, borderRadius, ...style }} {...props}>
      {label}
    </button>
  );
}
