import { Metadata } from "next"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import { getCollectionsWithProducts } from "./page"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default async function PageLayout(props: {
  children: React.ReactNode
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(props.params.countryCode)

  if (!collections) {
    return null
  }

  return (
    <>
      <Nav collections={collections} />
      {props.children}
      <Footer />
    </>
  )
}
