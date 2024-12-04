"use client"

import { Button } from "@medusajs/ui"
import React from "react"
import { useFormStatus } from "react-dom"

export function SubmitButton({
  children,
  variant = "primary",
  className,
  onClick,
  disabled,
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "transparent" | "danger" | undefined
  className?: string
  onClick?: () => void
  disabled?: boolean
}) {
  const { pending } = useFormStatus()

  return (
    <Button
      size="large"
      className={className}
      type="submit"
      isLoading={pending}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  )
}
