"use client"

import { Popover, Transition } from "@headlessui/react"
import { Cart } from "@medusajs/medusa"
import { Button } from "@medusajs/ui"
import { useParams, usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

import { formatAmount } from "@lib/util/prices"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import TranslationComponent from "@modules/Translator/component/translation"
import { IoCartOutline } from "react-icons/io5"
import { FiUser } from "react-icons/fi"
import { toUpper } from "lodash"

const AccountDropdown = ({
  cart: cartState,
  customer,
}: {
  cart?: Omit<Cart, "beforeInsert" | "afterLoad"> | null
  customer: any
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const { countryCode } = useParams()

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <Popover.Button className="h-full">
          <LocalizedClientLink
            className="hover:text-ui-fg-base text-base ml-[-1em] md:ml-0 flex items-center gap-1"
            href="/account"
          >
            <FiUser />
            <TranslationComponent
              query={
                customer ? `Hello, ${toUpper(customer.first_name)}` : `Account`
              }
            />
          </LocalizedClientLink>
        </Popover.Button>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            static
            className="hidden small:block absolute top-[calc(100%+1px)] right-0 bg-white border-x border-b border-gray-200 w-[280px] text-ui-fg-base"
          >
            <div>
              <div className="flex pb-6 flex-col gap-y-4 items-center justify-center">
                <div>
                  <LocalizedClientLink href="/account">
                    <Button onClick={close} className="w-[200px] mt-[1em]">
                      View Profile
                    </Button>
                  </LocalizedClientLink>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}

export default AccountDropdown
