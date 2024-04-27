"use client"

import { Popover, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Region } from "@medusajs/medusa"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { MdOutlineArrowDropDownCircle } from "react-icons/md"
import { ProductCollectionWithPreviews } from "types/global"
import { Icons } from "@modules/home/components/hero-components/icons"
import Image from "next/image"
import TranslationComponent from "@modules/Translator/component/translation"

const SideMenuItems = {
  Store: "/store",
  Search: "/search",
  Account: "/account",
  Cart: "/cart",
  WhatsApp: "#",
}

const SideMenu = ({
  regions,
  collections,
}: {
  regions: Region[] | null
  collections: ProductCollectionWithPreviews[]
}) => {
  const toggleState = useToggleState()
  const [showCategories, setShowCategories] = useState(false)

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button className="relative h-full flex text-base items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base">
                  Menu
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100 backdrop-blur-2xl"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl"
                leaveTo="opacity-0"
              >
                <Popover.Panel className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh+5rem)]  inset-x-0 text-sm text-ui-fg-on-color m-2 backdrop-blur-2xl z-[1000001]">
                  <div className="flex flex-col h-full bg-[rgba(3,7,18,0.5)] rounded-rounded justify-between p-6">
                    <div className="flex justify-end" id="xmark">
                      <button onClick={close}>
                        <XMark />
                      </button>
                    </div>
                    <ul className="flex flex-col gap-6 items-start justify-start">
                      <li>
                        <LocalizedClientLink
                          href={"/"}
                          className="text-3xl leading-10 hover:text-ui-fg-disabled"
                          onClick={close}
                        >
                          Home
                        </LocalizedClientLink>
                      </li>
                      <li>
                        <div
                          className="text-3xl leading-10 flex items-center justify-between w-[400px] transition-all"
                          onClick={() => setShowCategories(!showCategories)}
                        >
                          All Categories
                          <MdOutlineArrowDropDownCircle
                            className={`transition-all ${
                              showCategories ? "" : "rotate"
                            }`}
                          />
                        </div>
                        <ul
                          className={
                            showCategories
                              ? "flex flex-col w-full gap-2 overflow-y-scroll h-[40vh]"
                              : "hidden"
                          }
                        >
                          {collections.map((collection, index) => (
                            <LocalizedClientLink
                              href={`/collections/${collection.handle}`}
                              className="flex items-center text-xl gap-4 bg-white text-black p-2 rounded-sm "
                              key={index}
                              onClick={close}
                            >
                              <Image
                                src={Icons[index]}
                                alt={""}
                                width={20}
                                height={20}
                              />
                              <TranslationComponent query={collection.title} />
                            </LocalizedClientLink>
                          ))}
                        </ul>
                      </li>
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        return (
                          <li key={name}>
                            <LocalizedClientLink
                              href={href}
                              className="text-3xl leading-10 hover:text-ui-fg-disabled"
                              onClick={close}
                            >
                              {name}
                            </LocalizedClientLink>
                          </li>
                        )
                      })}
                    </ul>
                    <div className="flex flex-col gap-y-6">
                      <div
                        className="flex justify-between"
                        onMouseEnter={toggleState.open}
                        onMouseLeave={toggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={toggleState}
                            regions={regions}
                          />
                        )}
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150",
                            toggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                      <Text className="flex justify-between txt-compact-small">
                        © {new Date().getFullYear()} Debol Store. All rights
                        reserved.
                      </Text>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
