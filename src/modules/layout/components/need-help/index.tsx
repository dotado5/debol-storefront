"use client"

import TranslationComponent from "@modules/Translator/component/translation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React, { useState } from "react"
import { FaWhatsapp } from "react-icons/fa"
import { IoMdHelpCircleOutline } from "react-icons/io"
import { MdArrowDropDown } from "react-icons/md"

const Index = () => {
  const [helpOpen, setHelpOpen] = useState(false)

  return (
    <div>
      <LocalizedClientLink
        href={""}
        className="hover:text-ui-fg-base flex text-base items-center gap-2 "
        onClick={() => setHelpOpen(!helpOpen)}
      >
        <IoMdHelpCircleOutline />
        <TranslationComponent query={"Need Help?"} />
        <MdArrowDropDown />
      </LocalizedClientLink>
      {helpOpen && (
        <div className="absolute top-[4em] right-[8%] flex flex-col items-center bg-[#A7D3B5] p-2 rounded-lg">
          <a
            href="https://wa.me/+37253851546"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 whitespace-nowrap text-base text-black hover:text-gray-900 "
          >
            <FaWhatsapp />
            Chat with Us
          </a>
        </div>
      )}
    </div>
  )
}

export default Index
