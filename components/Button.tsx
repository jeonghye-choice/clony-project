import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = "px-6 py-3 rounded-full font-display font-semibold transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg";

  const variants = {
    primary: "bg-gradient-to-r from-teal-400 to-blue-500 text-white hover:opacity-90 border-none shadow-[0_4px_14px_0_rgba(59,130,246,0.5)]",
    secondary: "bg-clony-dark text-white hover:bg-clony-primary",
    outline: "bg-transparent border-2 border-clony-primary text-clony-primary hover:bg-clony-primary hover:text-white"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};