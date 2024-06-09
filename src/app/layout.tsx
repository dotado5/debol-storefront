"use client"
// import { Metadata } from "next"
import "styles/globals.css"
import "../i18n"
import { GoogleOAuthProvider } from "@react-oauth/google"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

// export const metadata: Metadata = {
//   metadataBase: new URL(BASE_URL),
// }

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <GoogleOAuthProvider clientId="44428971545-rh81erp247fo3p3dali2c052p0psu77l.apps.googleusercontent.com">
        <body className="">
          <main className="relative">{props.children}</main>
        </body>
      </GoogleOAuthProvider>
    </html>
  )
}
