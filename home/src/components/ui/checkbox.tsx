"use client";

import * as React from "react";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        type="checkbox"
        ref={ref}
        className={`h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 focus:ring-2 ${className}`}
        {...props}
      />
    );
  }
);

Checkbox.displayName = "Checkbox";
