"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props} enableSystem={false} attribute="class">
      <div className="dark:bg-purple-900 dark:text-white light:bg-purple-50 light:text-purple-900">
        {children}
      </div>
    </NextThemesProvider>
  )
}
