'use client';

import React, { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', fullWidth = true, ...props }, ref) => {
    const textareaClasses = `px-3 py-2 bg-white border rounded-md text-sm shadow-sm placeholder-gray-400
      focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
      disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
      ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'}
      ${fullWidth ? 'w-full' : ''}
      ${className}`;

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <textarea ref={ref} className={textareaClasses} {...props} />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea; 