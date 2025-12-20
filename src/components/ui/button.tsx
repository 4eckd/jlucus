import React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant
   * - primary: Green background (main CTA)
   * - secondary: Emerald background
   * - outline: Transparent with green border
   * - ghost: Transparent with hover effect
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'

  /**
   * Button size
   */
  size?: 'sm' | 'md' | 'lg'

  /**
   * Loading state
   */
  isLoading?: boolean

  /**
   * Full width button
   */
  fullWidth?: boolean
}

/**
 * Button Component
 * Accessible button with multiple variants and sizes
 * Supports loading state and keyboard navigation
 *
 * @example
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center gap-2',
      'font-medium transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
      'rounded-md'
    )

    const variantStyles = {
      primary: cn(
        'bg-[var(--color-primary)] text-[var(--color-primary-text)]',
        'hover:bg-[var(--color-primary-hover)]',
        'active:bg-[var(--color-primary-active)]',
        'focus-visible:ring-[var(--color-primary)]',
        'shadow-sm hover:shadow-md',
        'hover:shadow-[var(--shadow-glow-sm)]'
      ),
      secondary: cn(
        'bg-[var(--color-secondary)] text-white',
        'hover:bg-[var(--color-secondary-hover)]',
        'active:bg-[var(--color-secondary-active)]',
        'focus-visible:ring-[var(--color-secondary)]',
        'shadow-sm hover:shadow-md'
      ),
      outline: cn(
        'bg-transparent border-2 border-[var(--color-primary)]',
        'text-[var(--color-primary)]',
        'hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-text)]',
        'focus-visible:ring-[var(--color-primary)]'
      ),
      ghost: cn(
        'bg-transparent text-[var(--color-text-primary)]',
        'hover:bg-[var(--color-surface-hover)]',
        'focus-visible:ring-[var(--color-border-focus)]'
      ),
    }

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    const widthStyles = fullWidth ? 'w-full' : ''

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          widthStyles,
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        <span>{children}</span>
      </button>
    )
  }
)

Button.displayName = 'Button'
