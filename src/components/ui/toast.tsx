import * as React from "react"

type ToastProps = {
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

// Basit bir toast hook (production'da react-hot-toast veya sonner kullanılabilir)
export const useToast = () => {
  const toast = ({ title, description, variant = 'default' }: ToastProps) => {
    console.log(`[TOAST ${variant}] ${title}: ${description}`)
    // Gerçek bir toast kütüphanesi kullanılabilir
  }

  return { toast }
}

export const Toaster = () => {
  return null // Gerçek toast bileşeni buraya gelecek
}