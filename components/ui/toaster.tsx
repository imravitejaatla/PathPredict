"use client"
import { ToastProvider, ToastViewport } from "@/components/ui/toast"

// Simple toaster implementation
export function Toaster() {
  // This is a simplified version that doesn't rely on the useToast hook
  // It just renders a static toast provider and viewport
  return (
    <ToastProvider>
      <ToastViewport />
    </ToastProvider>
  )
}
