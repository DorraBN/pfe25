import { FaShoppingCart } from "react-icons/fa";
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const baseStyles =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default: "bg-orange-500 text-white hover:bg-orange-600",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-gray-300 text-gray-800 hover:bg-gray-100",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  ghost: "bg-transparent hover:bg-gray-100",
  link: "text-blue-600 underline hover:text-blue-800",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "h-9 px-4 py-2",
  sm: "h-8 px-3 text-xs",
  lg: "h-10 px-6",
  icon: "h-9 w-9 p-0",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const finalClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    return <button ref={ref} className={finalClassName} {...props} />;
  }
);

Button.displayName = "Button";

export { Button };
