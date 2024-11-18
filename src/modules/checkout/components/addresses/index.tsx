"use client"

import {
  useSearchParams,
  useRouter,
  usePathname,
  useParams,
} from "next/navigation"
import { Cart, Customer } from "@medusajs/medusa"
import { CheckCircleSolid } from "@medusajs/icons"
import { Heading, Text, useToggleState } from "@medusajs/ui"

import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"

import BillingAddress from "../billing_address"
import ShippingAddress from "../shipping-address"
import { setAddresses } from "../../actions"
import { SubmitButton } from "../submit-button"
import { useFormState } from "react-dom"
import ErrorMessage from "../error-message"
import compareAddresses from "@lib/util/compare-addresses"
import { useEffect, useState } from "react"
import { ProductCollectionWithPreviews, ProductPreviewType } from "types/global"

const Addresses = ({
  cart,
  customer,
  collections,
}: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total"> | null
  customer: Omit<Customer, "password_hash"> | null
  collections: ProductCollectionWithPreviews[]
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const [hasTubers, setHasTubers] = useState<boolean>()

  const countryCode = params.countryCode as string

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsSBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useFormState(setAddresses, null)

  useEffect(() => {
    // console.log(collections)

    async function check() {
      const titles = cart?.items
        ? await Promise.all(cart.items.map(async (item) => item.title))
        : []

      await collections.map((collection: ProductCollectionWithPreviews) => {
        collection.products.map((product: ProductPreviewType) => {
          // console.log(titles, "titles")
          cart?.items.map(async (item) => {
            if (item.title === product.title) {
              if (collection.title === "Tubers and Plantains") {
                setHasTubers(true)
              }
            }
          })
        })
      })
    }

    check()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (hasTubers && !event.target.closest(".popup")) {
        // Close the  if clicked outside of it
        setHasTubers(false)
      }
    }

    // Add event listener when the popup is open
    if (hasTubers) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      // Remove event listener when the popup is closed to avoid memory leaks
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [hasTubers])

  const backToCart = () => {
    setHasTubers(false)
    router.back()
  }

  const goToWhatsApp = () => {}

  return !hasTubers ? (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className="flex flex-row text-3xl-regular gap-x-2 items-baseline"
        >
          Shipping Address
          {!isOpen && <CheckCircleSolid />}
        </Heading>
        {!isOpen && cart?.shipping_address && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
            >
              Edit
            </button>
          </Text>
        )}
      </div>
      {isOpen ? (
        <form action={formAction}>
          <div className="pb-8">
            <ShippingAddress
              customer={customer}
              countryCode={countryCode}
              checked={sameAsSBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsSBilling && (
              <div>
                <Heading
                  level="h2"
                  className="text-3xl-regular gap-x-4 pb-6 pt-8"
                >
                  Billing address
                </Heading>

                <BillingAddress cart={cart} countryCode={countryCode} />
              </div>
            )}
            <SubmitButton className="mt-6">Continue to delivery</SubmitButton>
            <ErrorMessage error={message} />
          </div>
        </form>
      ) : (
        <div>
          <div className="text-small-regular">
            {cart && cart.shipping_address ? (
              <div className="flex items-start gap-x-8">
                <div className="flex items-start gap-x-1 w-full">
                  <div className="flex flex-col w-1/3">
                    <Text className="txt-medium-plus text-ui-fg-base mb-1">
                      Shipping Address
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.first_name}{" "}
                      {cart.shipping_address.last_name}
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.address_1}{" "}
                      {cart.shipping_address.address_2}
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.postal_code},{" "}
                      {cart.shipping_address.city}
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.country_code?.toUpperCase()}
                    </Text>
                  </div>

                  <div className="flex flex-col w-1/3 ">
                    <Text className="txt-medium-plus text-ui-fg-base mb-1">
                      Contact
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.phone}
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.email}
                    </Text>
                  </div>

                  <div className="flex flex-col w-1/3">
                    <Text className="txt-medium-plus text-ui-fg-base mb-1">
                      Billing Address
                    </Text>

                    {sameAsSBilling ? (
                      <Text className="txt-medium text-ui-fg-subtle">
                        Billing- and delivery address are the same.
                      </Text>
                    ) : (
                      <>
                        <Text className="txt-medium text-ui-fg-subtle">
                          {cart.billing_address.first_name}{" "}
                          {cart.billing_address.last_name}
                        </Text>
                        <Text className="txt-medium text-ui-fg-subtle">
                          {cart.billing_address.address_1}{" "}
                          {cart.billing_address.address_2}
                        </Text>
                        <Text className="txt-medium text-ui-fg-subtle">
                          {cart.billing_address.postal_code},{" "}
                          {cart.billing_address.city}
                        </Text>
                        <Text className="txt-medium text-ui-fg-subtle">
                          {cart.billing_address.country_code?.toUpperCase()}
                        </Text>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
      <Divider className="mt-8" />
    </div>
  ) : (
    <div className="w-[400px] ">
      <div className="overlay"></div>
      <div className="popup">
        <div className="popup-content">
          <h2>Dear Customer</h2>
          <p className="font-bold w-[400px] text-center">
            Products in the Tuber and Plantain collection can only be ordered
            via whatsapp
          </p>
          <div className="flex gap-2 mx-[11%]">
            <button
              onClick={backToCart}
              className="bg-[#007bff] hover:bg-[#0056b3]"
            >
              Go back to Cart
            </button>
            <button
              onClick={goToWhatsApp}
              className="bg-green-700 hover:bg-green-950"
            >
              Go to Whatsapp
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Addresses
