"use client"

import React, { useState } from "react"
import SubCategory from "@modules/layout/components/sub-category"
import { MdArrowDropDown } from "react-icons/md"
import { DropDownItem } from "@modules/layout/components/dropdown"
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

  // getCollection(collections)

  // console.log(collections.slice(5, 17))

  return (
    <aside className="w-[270px] sidebar" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3 shadow-md bg-[#f5f6f4] rounded dark:bg-gray-800 h-[462px] mr-[10px] sidebar">
        <ul className="space-y-2 grid grid-cols-2 medium:grid-cols-1">
          {collections.slice(0, 9).map((collection, index) => (
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
                className=" items-center p-2 text-xs font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 gap-2 category relative hidden medium:flex"
              >
                <Image src={Icons[index]} alt={""} width={20} height={20} />
                <TranslationComponent query={collection.title} />
              </LocalizedClientLink>

              {/* for mobile */}
              <LocalizedClientLink
                href={``}
                className="flex items-center p-2 text-sm font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 gap-2 category relative medium:hidden"
              >
                {/* <img src={category.icon} alt="" className="w-4" /> */}
                <Image src={Icons[index]} alt={""} width={20} height={20} />
                <TranslationComponent query={collection.title} />
                {/* <MdArrowDropDown
                  className={`hidden dropdownArrow absolute right-[2em]`}
                /> */}
              </LocalizedClientLink>
              {activeCollection === collection.title && (
                <ul className="dropdown hidden">
                  {open &&
                    collection.products.map((product, index) => (
                      <li key={index}>
                        <DropDownItem title={product.title} to={""} />
                      </li>
                    ))}
                </ul>
              )}
            </li>
          ))}

          {other && (
            <ul className="pl-4 medium:grid-cols-1 w-60 absolute left-[15em] top-0 bg-[#f5f6f4] h-[59vh] z-[10000] subCategories hidden medium:grid ">
              {collections.slice(9, 18).map((collection, index) => (
                <LocalizedClientLink
                  href={`/collections/${collection.handle}`}
                  className=" items-center p-2 text-xs font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 category relative hidden medium:flex w-44 gap-2"
                  key={index}
                >
                  {/* <img src={category.icon} alt="" className="w-4" /> */}
                  <Image
                    src={Icons[index + 10]}
                    alt={""}
                    width={20}
                    height={20}
                  />
                  <TranslationComponent query={collection.title} />
                  <MdArrowDropDown
                    className={`hidden dropdownArrow absolute right-[2em]`}
                  />
                </LocalizedClientLink>
              ))}
            </ul>
          )}
          <p
            className=" items-center p-1 text-xs font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 gap-2 category relative hidden small:flex cursor-pointer"
            onClick={() => setOther(!other)}
          >
            <Image src={Icons[9]} alt={""} width={20} height={20} />
            <TranslationComponent query={"Other Collections"} />
          </p>
          <p className="flex items-center p-2 text-sm font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 gap-2 category relative small:hidden medium:hidden">
            <Image src={Icons[9]} alt={""} width={20} height={20} />
            <TranslationComponent query={"Other Collections"} />
          </p>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar

// {
//   activeCategory === category.title && (
//     <ul className="pl-4 grid grid-cols-3 w-[calc(100vw-30%)] absolute left-[7.3rem] top-0 bg-white h-[462px] z-[10000] ml-[4em] subCategories">
//       {category.products.map((product, index) => (
//         <SubCategory
//           name={product.title}
//           key={index}
//           // subCategories={category.items[index]}
//         />
//       ))}
//     </ul>
//   )
// }
