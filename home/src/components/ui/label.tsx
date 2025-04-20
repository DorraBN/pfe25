"use client";

import * as React from "react";

// Fonction utilitaire simple pour fusionner les classes
function mergeClassNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const labelVariants = "text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={mergeClassNames(labelVariants, className)}
      {...props}
    />
  )
);

Label.displayName = "Label";

export { Label };
