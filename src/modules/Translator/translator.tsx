"use client"
import ReactFlagsSelect from "react-flags-select";
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from "react";


const Translator = () => {
  const { t, i18n } = useTranslation()
  const [selected, setSelected] = useState("GB")

  const onClickLanguageChange = (code: any) => {
    setSelected(code)
    const language = code.toLowerCase()
    i18n.changeLanguage(language)
  }

  useEffect(() => {
    const language = selected.toLowerCase()
    i18n.changeLanguage(language)
  }, [i18n, selected])

  return (
    <ReactFlagsSelect
      selected={selected}
      onSelect={onClickLanguageChange}
      countries={["GB", "EE", "RU"]}
      showSelectedLabel={false}
      showOptionLabel={false}
    />
  )
}

export default Translator
