import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'accent' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'default' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'default',
    size = 'default',
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variantStyles = {
      default: 'bg-accent text-white hover:bg-accent/90 focus-visible:ring-accent/50',
      accent: 'bg-trust text-primary hover:bg-trust/90 focus-visible:ring-trust/50',
      outline: 'border border-accent/30 bg-transparent hover:bg-accent/10 text-text-primary focus-visible:ring-accent/50',
      ghost: 'hover:bg-accent/10 text-text-primary focus-visible:ring-accent/50',
      link: 'text-accent hover:underline underline-offset-4 focus-visible:ring-accent/50 p-0 h-auto',
    };

    const sizeStyles = {
      sm: 'h-9 px-3 text-sm',
      default: 'h-10 py-2 px-4',
      lg: 'h-12 px-6 text-lg',
    };

    return (
      <button
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          'relative',
          isLoading && 'opacity-80',
          className
        )}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-5 h-5 border-2 border-t-2 border-t-transparent border-current rounded-full animate-spin" />
          </span>
        )}
        <span className={cn(
          'flex items-center gap-2',
          isLoading && 'invisible'
        )}>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
