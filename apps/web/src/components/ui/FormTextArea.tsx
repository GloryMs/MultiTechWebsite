'use client';

import { cn } from '@/lib/utils';
import { type TextareaHTMLAttributes, forwardRef, useState } from 'react';

interface FormTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const hasValue = props.value && String(props.value).length > 0;

    return (
      <div className="group relative">
        <textarea
          ref={ref}
          id={id}
          rows={5}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
          className={cn(
            'peer w-full rounded-xl border bg-white px-4 py-4 text-brand-primary outline-none transition-all duration-200 resize-none',
            'placeholder-transparent',
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
            (focused || hasValue)
              ? '-top-2.5 text-xs font-medium bg-white px-2 rounded'
              : 'top-4 text-base',
            focused ? 'text-brand-accent' : 'text-brand-text/50',
            error && 'text-brand-error'
          )}
        >
          {label}
        </label>

        {error && (
          <p className="mt-1.5 ps-1 text-xs text-brand-error">{error}</p>
        )}
      </div>
    );
  }
);

FormTextArea.displayName = 'FormTextArea';
export default FormTextArea;
