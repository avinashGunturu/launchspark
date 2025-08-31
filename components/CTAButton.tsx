
import React from 'react';
import { Link } from 'react-router-dom';

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  to?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  variant?: 'primary' | 'secondary';
}

const CTAButton: React.FC<CTAButtonProps> = ({ children, onClick, href, to, type = 'button', className = '', variant = 'primary' }) => {
  const baseClasses = "inline-block font-semibold py-3 px-8 rounded-full transform transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-4 tracking-wide";
  
  const variantClasses = {
    primary: "bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary-hover hover:shadow-xl hover:-translate-y-1 focus-visible:ring-primary/40 bg-gradient-to-r from-primary to-[#00B88A] hover:shadow-glow-primary",
    secondary: "bg-card text-foreground border border-border shadow-md hover:bg-muted-light hover:border-primary/50 hover:-translate-y-0.5 focus-visible:ring-primary/30"
  };

  const finalClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={finalClasses}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={finalClasses}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={finalClasses}>
      {children}
    </button>
  );
};

export default CTAButton;