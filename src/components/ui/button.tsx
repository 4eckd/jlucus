'use client';

import React from 'react'
import { Slot } from '@radix-ui/react-slot'
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
  size?: 'sm' | 'md' | 'lg' | 'icon'

  /**
   * Loading state
   */
  isLoading?: boolean

  /**
   * Full width button
   */
  fullWidth?: boolean

  /**
   * Render as child element (using Radix UI Slot)
   */
  asChild?: boolean
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
      asChild = false,
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
        'bg-primary text-primary-foreground',
        'hover:shadow-glow-sm active:shadow-glow',
        'focus-visible:ring-primary'
      ),
      secondary: cn(
        'bg-secondary text-secondary-foreground',
        'hover:shadow-glow-accent',
        'focus-visible:ring-secondary'
      ),
      outline: cn(
        'bg-transparent border-2 border-primary',
        'text-primary',
        'hover:bg-primary hover:text-primary-foreground',
        'focus-visible:ring-primary'
      ),
      ghost: cn(
        'bg-transparent text-text-primary',
        'hover:bg-dark-700',
        'focus-visible:ring-primary'
      ),
    }

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      icon: 'p-2',
    }

    const widthStyles = fullWidth ? 'w-full' : ''

    const Comp = asChild ? Slot : 'button'

    // When using asChild, render children directly (Slot expects single child)
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(
            baseStyles,
            variantStyles[variant],
            sizeStyles[size],
            widthStyles,
            className
          )}
          {...props}
        >
          {children}
        </Slot>
      )
    }

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
