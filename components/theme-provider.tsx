"use client"

import type * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useTheme as useNextTheme } from "next-themes"

type ThemeProviderProps = React.ComponentPropsWithoutRef<typeof NextThemesProvider>

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export function useTheme() {
  const { theme, setTheme } = useNextTheme()

  return {
    theme,
    setTheme,
  }
}
