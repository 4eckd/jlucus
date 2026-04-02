'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ComponentProps } from 'react'

/**
 * Theme Provider Component
 * Wraps the application with next-themes provider for dark/light mode support
 *
 * Default theme: dark (as per project requirements)
 */
export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
