'use client';

import { cn } from '@/lib/utils';
import { type InputHTMLAttributes, forwardRef, useState } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, icon, className, id, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const hasValue = props.value && String(props.value).length > 0;

    return (
      <div className="group relative">
        {/* Icon */}
        {icon && (
          <div className={cn(
            'absolute start-4 top-1/2 -translate-y-1/2 transition-colors duration-200 pointer-events-none',
            focused ? 'text-brand-accent' : 'text-brand-text/40',
            error && 'text-brand-error'
          )}>
            {icon}
          </div>
        )}

        <input
          ref={ref}
          id={id}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
          className={cn(
            'peer w-full rounded-xl border bg-white px-4 py-4 text-brand-primary outline-none transition-all duration-200',
            'placeholder-transparent',
            icon && 'ps-12',
            focused
              ? 'border-brand-accent ring-2 ring-brand-accent/20'
              : 'border-brand-text/15 hover:border-brand-text/30',
            error && 'border-brand-error ring-2 ring-brand-error/20',
            className
          )}
          placeholder={label}
          {...props}
        />

        {/* Floating label */}
        <label
          htmlFor={id}
          className={cn(
            'absolute start-4 transition-all duration-200 pointer-events-none',
            icon && 'start-12',
            (focused || hasValue)
              ? '-top-2.5 text-xs font-medium bg-white px-2 rounded'
              : 'top-4 text-base',
            focused ? 'text-brand-accent' : 'text-brand-text/50',
            error && 'text-brand-error'
          )}
        >
          {label}
        </label>

        {/* Error message */}
        {error && (
          <p className="mt-1.5 ps-1 text-xs text-brand-error">{error}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
export default FormInput;
