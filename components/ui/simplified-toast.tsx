"use client"

import * as React from "react"

// Super simplified toast component that doesn't use Radix UI
// This is a fallback in case the other toast components are causing issues

export function SimpleToast({
  title,
  description,
  variant = "default",
  onClose,
}: {
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: "default" | "destructive"
  onClose?: () => void
}) {
  return (
    <div
      className={`fixed top-4 right-4 z-50 rounded-md shadow-lg p-4 max-w-md ${
        variant === "destructive" ? "bg-red-600 text-white" : "bg-white text-gray-900 border border-gray-200"
      }`}
    >
      {title && <div className="font-semibold mb-1">{title}</div>}
      {description && <div className="text-sm">{description}</div>}
      {onClose && (
        <button onClick={onClose} className="absolute top-2 right-2 text-sm" aria-label="Close">
          ×
        </button>
      )}
    </div>
  )
}

// Simple toast context
const ToastContext = React.createContext<{
  showToast: (props: {
    title?: React.ReactNode
    description?: React.ReactNode
    variant?: "default" | "destructive"
  }) => void
}>({
  showToast: () => {},
})

export function SimpleToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = React.useState<{
    visible: boolean
    title?: React.ReactNode
    description?: React.ReactNode
    variant?: "default" | "destructive"
  }>({
    visible: false,
  })

  const showToast = React.useCallback(
    (props: {
      title?: React.ReactNode
      description?: React.ReactNode
      variant?: "default" | "destructive"
    }) => {
      setToast({ ...props, visible: true })

      // Auto-hide after 5 seconds
      setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }))
      }, 5000)
    },
    [],
  )

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.visible && (
        <SimpleToast
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
        />
      )}
    </ToastContext.Provider>
  )
}

export function useSimpleToast() {
  return React.useContext(ToastContext)
}
