"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

// Simple variant class names
const toastVariants = {
  default: "border bg-background text-foreground",
  destructive: "destructive border-destructive bg-destructive text-destructive-foreground",
}

// Provider component
const ToastProvider = ToastPrimitives.Provider

// Viewport component
const ToastViewport = React.forwardRef((props, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
    {...props}
  />
))
ToastViewport.displayName = "ToastViewport"

// Toast component
const Toast = React.forwardRef((props, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    className={cn(
      "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
      toastVariants[props.variant || "default"],
    )}
    {...props}
  />
))
Toast.displayName = "Toast"

// Toast action component
const ToastAction = React.forwardRef((props, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className="inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    {...props}
  />
))
ToastAction.displayName = "ToastAction"

// Toast close component
const ToastClose = React.forwardRef((props, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = "ToastClose"

// Toast title component
const ToastTitle = React.forwardRef((props, ref) => (
  <ToastPrimitives.Title ref={ref} className="text-sm font-semibold" {...props} />
))
ToastTitle.displayName = "ToastTitle"

// Toast description component
const ToastDescription = React.forwardRef((props, ref) => (
  <ToastPrimitives.Description ref={ref} className="text-sm opacity-90" {...props} />
))
ToastDescription.displayName = "ToastDescription"

// Export components
export { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction }
