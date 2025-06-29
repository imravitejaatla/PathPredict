"use client"

import * as React from "react"

// Simple toast state management
type Toast = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  variant?: "default" | "destructive"
}

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 5000

// Create context
type ToastContextType = {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
  updateToast: (id: string, toast: Partial<Toast>) => void
}

const ToastContext = React.createContext<ToastContextType>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
  updateToast: () => {},
})

// Generate unique ID
let count = 0
function generateId() {
  return (++count).toString()
}

// Toast hook
export function useToast() {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const addToast = React.useCallback((toast: Omit<Toast, "id">) => {
    setToasts((prevToasts) => {
      const newToast = { ...toast, id: generateId(), open: true }
      return [...prevToasts, newToast].slice(-TOAST_LIMIT)
    })
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  const updateToast = React.useCallback((id: string, toast: Partial<Toast>) => {
    setToasts((prevToasts) => prevToasts.map((t) => (t.id === id ? { ...t, ...toast } : t)))
  }, [])

  // Auto-remove toasts
  React.useEffect(() => {
    const timeouts = new Map<string, NodeJS.Timeout>()

    toasts.forEach((toast) => {
      if (!toast.open) {
        const timeout = setTimeout(() => {
          removeToast(toast.id)
        }, TOAST_REMOVE_DELAY)

        timeouts.set(toast.id, timeout)
      }
    })

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout))
    }
  }, [toasts, removeToast])

  return {
    toasts,
    toast: addToast,
    dismiss: (id?: string) => {
      if (id) {
        setToasts((prevToasts) => prevToasts.map((t) => (t.id === id ? { ...t, open: false } : t)))
      } else {
        setToasts((prevToasts) => prevToasts.map((t) => ({ ...t, open: false })))
      }
    },
  }
}

// Export toast function
export function toast(props: Omit<Toast, "id">) {
  const { toast } = useToast()
  toast(props)
  return {
    id: generateId(),
    dismiss: () => {},
    update: () => {},
  }
}
