import Link from "next/link"
import React from "react"

interface DropDownItemProps {
  title: string
  to: string
}

export const DropDownItem: React.FC<DropDownItemProps> = ({ title, to }) => {
  return <Link href={to}>{title}</Link>
}
