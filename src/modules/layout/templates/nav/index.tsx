// "use client"

import { headers } from "next/headers"
import { Suspense, useRef, useState } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"

import { FiUser } from "react-icons/fi"
import { IoMdHelpCircleOutline } from "react-icons/io"
import { MdArrowDropDown } from "react-icons/md"
import { IoSearch } from "react-icons/io5"
import logo from "assets/debolslogo.jpg"
import Image from "next/image"
import { FaWhatsapp } from "react-icons/fa"
import { getCustomer, listRegions } from "@lib/data"
import SideMenu from "@modules/layout/components/side-menu"
import Needhelp from "modules/layout/components/need-help"
import Translator from "@modules/Translator/translator"
import TranslationComponent from "@modules/Translator/component/translation"
import { ProductCollectionWithPreviews } from "types/global"
import AccountDropdown from "@modules/layout/components/account-button"

export default async function Nav({
  collections,
}: {
  collections: ProductCollectionWithPreviews[]
}) {
  const regions = await listRegions().then((regions) => regions)
  const customer = await getCustomer().catch(() => null)

  console.log(customer)

  return (
    <div className="sticky top-0 inset-x-0 z-[100000001] group">
      <header className="relative h-16 mx-auto  duration-200 bg-[#A7D3B5] border-ui-border-base ">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full medium::hidden lg:mr-3 sideMenu">
              <SideMenu regions={regions} collections={collections} />
            </div>

            <div className="flex gap-4 ml-[1em] small:ml-0 w-[300px] small:w-auto">
              <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
              >
                <Image src={logo} alt={""} width={100} height={100} />
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/store"
                className=" leading-10 text-base hover:text-ui-fg-base"
              >
                <TranslationComponent query={"All Products"} />
              </LocalizedClientLink>
            </div>
          </div>

          {/* <div ref={searchRef} className="relative w-full h-full">
            <InstantSearch indexName="products" searchClient={searchClient}>
              <Stats />
              <SearchBox />
              <InfiniteHits hitComponent={Hit} />
            </InstantSearch>
          </div> */}

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="ml-[-7em] medium:ml-0">
              <Translator />
            </div>
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {process.env.FEATURE_SEARCH_ENABLED && (
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex text-base items-center gap-2"
                  href="/search"
                  scroll={false}
                >
                  <IoSearch />
                  <TranslationComponent query={"Search"} />
                </LocalizedClientLink>
              )}
              {customer ? (
                <AccountDropdown customer={customer} />
              ) : (
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex items-center text-base gap-2 "
                  href="/account"
                >
                  <>
                    <FiUser />
                    <TranslationComponent query={"Account"} />
                  </>
                </LocalizedClientLink>
              )}
              <div>
                <Needhelp />
              </div>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base text-base flex gap-2"
                  href="/cart"
                >
                  <TranslationComponent query={"Cart"} />
                  (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
