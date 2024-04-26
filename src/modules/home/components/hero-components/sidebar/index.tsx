"use client"

import React, { useState } from "react"
import { ProductCollectionWithPreviews } from "types/global"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Icons } from "../icons"
import Image from "next/image"
import TranslationComponent from "@modules/Translator/component/translation"

export interface Category {
  name: string
  subcategories: string[]
  icon?: string
  items: string[][]
}

const Sidebar = ({
  collections,
}: {
  collections: ProductCollectionWithPreviews[]
}) => {
  const [activeCollection, setActiveCollection] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [other, setOther] = useState(false)

  function others() {
    setOther(!other)
    // console.log("hey")
  }

  return (
    <aside
      className="w-[310px] sidebar medium:w-[310px] hidden medium:block"
      aria-label="Sidebar"
    >
      <div className="overflow-y-auto py-4 px-3 shadow-md bg-[#f5f6f4] rounded dark:bg-gray-800 h-[462px] mr-[10px] sidebar">
        <ul className="space-y-2 grid grid-cols-2 medium:grid-cols-1">
          {collections.slice(0, 8).map((collection, index) => (
            <li
              key={collection.title}
              onMouseEnter={() => {
                setActiveCollection(collection.title)
              }}
              onMouseLeave={() => setActiveCollection(null)}
              onClick={() => setOpen(!open)}
              className="cursor-pointer"
            >
              <LocalizedClientLink
                href={`/collections/${collection.handle}`}
                className=" transition-all items-center p-2 text-base font-bold text-gray-900 rounded-lg dark:text-white hover:bg-white dark:hover:bg-gray-700 gap-2 category relative hidden medium:flex"
              >
                <Image src={Icons[index]} alt={""} width={20} height={20} />
                <TranslationComponent query={collection.title} />
              </LocalizedClientLink>

              {/* for mobile */}
              <LocalizedClientLink
                href={``}
                className=" items-center p-2 text-sm font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 gap-2 category relative medium:hidden hidden"
              >
                {/* <img src={category.icon} alt="" className="w-4" /> */}
                <Image src={Icons[index]} alt={""} width={20} height={20} />
                <TranslationComponent query={collection.title} />
              </LocalizedClientLink>
              {/* {activeCollection === collection.title && (
                <ul className="dropdown hidden">
                  {open &&
                    collection.products.map((product, index) => (
                      <li key={index}>
                        <DropDownItem title={product.title} to={""} />
                      </li>
                    ))}
                </ul>
              )} */}
            </li>
          ))}

          {other && (
            <ul className="pl-4 medium:grid-cols-1 w-[50%] md:w-[40%] lg:w-80 absolute left-0 lg:left-[14em] top-[2%] grid grid-cols-2 lg:top-[-0.5em] bg-white lg:bg-[#f5f6f4] h-[16em] lg:h-[63vh] z-[10000000000001] medium:grid ">
              {collections.slice(8, 18).map((collection, index) => (
                <LocalizedClientLink
                  href={`/collections/${collection.handle}`}
                  className=" transition-all items-center p-2 text-lg font-bold text-gray-900 rounded-lg dark:text-white hover:bg-white dark:hover:bg-gray-700 category relative flex medium:flex w-72 gap-2"
                  key={index}
                >
                  <Image
                    src={Icons[index + 9]}
                    alt={""}
                    width={20}
                    height={20}
                  />
                  <TranslationComponent query={collection.title} />
                </LocalizedClientLink>
              ))}
            </ul>
          )}
          <p
            className=" transition-all items-center p-1 text-base text-gray-900 rounded-lg dark:text-white hover:bg-white dark:hover:bg-gray-700 gap-2 category relative hidden small:flex font-bold cursor-pointer"
            onClick={() => setOther(!other)}
          >
            <Image src={Icons[8]} alt={""} width={20} height={20} />
            <TranslationComponent query={"Other Collections"} />
          </p>
          <p
            className=" items-center p-2 text-sm font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 gap-2 category relative small:hidden medium:hidden cursor-pointer hidden"
            onClick={others}
          >
            <Image src={Icons[9]} alt={""} width={20} height={20} />
            <TranslationComponent query={"Other Collections"} />
          </p>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
