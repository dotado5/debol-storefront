"use client"

import { useTranslation } from "react-i18next"

const TranslationComponent = ({ query }: { query: string }) => {
  const { t } = useTranslation()

  return t(query)
}

export default TranslationComponent
