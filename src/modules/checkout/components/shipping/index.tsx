"use client"

import { RadioGroup } from "@headlessui/react"
import { CheckCircleSolid } from "@medusajs/icons"
import { Cart } from "@medusajs/medusa"
import { PricedShippingOption } from "@medusajs/medusa/dist/types/pricing"
import { Button, Heading, Text, clx, useToggleState } from "@medusajs/ui"
import { formatAmount } from "@lib/util/prices"

import Divider from "@modules/common/components/divider"
import Radio from "@modules/common/components/radio"
import Spinner from "@modules/common/icons/spinner"
import ErrorMessage from "@modules/checkout/components/error-message"
import { setShippingMethod } from "@modules/checkout/actions"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import TranslationComponent from "@modules/Translator/component/translation"
import axios from "axios"

type ShippingProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
  availableShippingMethods: PricedShippingOption[] | null
  hasTalinn: boolean
  over: boolean
}

// utils.js
export const generateRandomString = (length = 10) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
  hasTalinn,
  over,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [over35, setOver35] = useState(false)
  const [isTalinn, setIsTalinn] = useState(false)
  const [freeDelivery, setFreeDelivery] = useState(false)
  const [details, setDetails] =
    useState<Omit<Cart, "refundable_amount" | "refunded_total">>()

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "delivery"

  const handleEdit = () => {
    router.push(pathname + "?step=delivery", { scroll: false })
  }

  const handleSubmit = () => {
    setIsLoading(true)
    router.push(pathname + "?step=payment", { scroll: false })
  }

  const set = async (id: string) => {
    setIsLoading(true)
    await setShippingMethod(id)
      .then(() => {
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err.toString())
        setIsLoading(false)
      })
  }

  const handleChange = (value: string) => {
    set(value)
  }

  useEffect(() => {
    async function setOver() {
      if (cart.total) {
        if (cart.total / 100 >= 35) {
          await setOver35(true)
          // console.log("over 35")
        } else {
          await setOver35(false)
          // console.log("not over")
        }
      }
    }

    setOver()
  }, [cart])

  useEffect(() => {
    // console.log("enterrr")

    async function setDatas() {
      if (window.localStorage.getItem("Talinn")?.length !== 0) {
        console.log("estonia")
        await setIsTalinn(true)

        console.log(isTalinn, over)

        await setFreeDelivery(
          window.localStorage.getItem("Talinn")?.length !== 0 && over
        )
      } else {
        setIsTalinn(false)
      }

      if (hasTalinn) {
        await setIsTalinn(true)
        await setFreeDelivery(isTalinn && over)
      } else {
        setIsTalinn(false)
      }
    }

    async function setCart() {
      if (cart) {
        console.log(cart)

        await setDetails(cart)
      }
    }

    setDatas()
    setCart()
  }, [isOpen, cart, hasTalinn, isTalinn, over])

  useEffect(() => {
    setIsLoading(false)
    setError(null)
  }, [isOpen])

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-3xl-regular gap-x-2 items-baseline",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && cart.shipping_methods.length === 0,
            }
          )}
        >
          <TranslationComponent query={"Delivery"} />
          {!isOpen && cart.shipping_methods.length > 0 && <CheckCircleSolid />}
        </Heading>
        {!isOpen &&
          cart?.shipping_address &&
          cart?.billing_address &&
          cart?.email && (
            <Text>
              <button
                onClick={handleEdit}
                className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
              >
                <TranslationComponent query={"Edit"} />
              </button>
            </Text>
          )}
      </div>
      {isOpen ? (
        <div>
          <div className="pb-8">
            <RadioGroup
              value={cart.shipping_methods[0]?.shipping_option_id}
              onChange={(value: string) => handleChange(value)}
            >
              {availableShippingMethods ? (
                availableShippingMethods.map((option) => {
                  return (
                    <>
                      {freeDelivery
                        ? option.name === "Debol Free Shipping" && (
                            <RadioGroup.Option
                              key={option.id}
                              value={option.id}
                              className={clx(
                                "flex items-center justify-between text-small-regular cursor-pointer py-4 border rounded-rounded px-8 mb-2 hover:shadow-borders-interactive-with-active",
                                {
                                  "border-ui-border-interactive":
                                    option.id ===
                                    cart.shipping_methods[0]
                                      ?.shipping_option_id,
                                }
                              )}
                            >
                              <div className="flex items-center gap-x-4">
                                <Radio
                                  checked={
                                    option.id ===
                                    cart.shipping_methods[0]?.shipping_option_id
                                  }
                                />
                                <span className="text-base-regular">
                                  {option.name}
                                </span>
                              </div>
                              <span className="justify-self-end text-ui-fg-base">
                                {formatAmount({
                                  amount: option.amount!,
                                  region: cart?.region,
                                  includeTaxes: false,
                                })}
                              </span>
                            </RadioGroup.Option>
                          )
                        : option.name !== "Debol Free Shipping" && (
                            <RadioGroup.Option
                              key={option.id}
                              value={option.id}
                              className={clx(
                                "flex items-center justify-between text-small-regular cursor-pointer py-4 border rounded-rounded px-8 mb-2 hover:shadow-borders-interactive-with-active",
                                {
                                  "border-ui-border-interactive":
                                    option.id ===
                                    cart.shipping_methods[0]
                                      ?.shipping_option_id,
                                }
                              )}
                            >
                              <div className="flex items-center gap-x-4">
                                <Radio
                                  checked={
                                    option.id ===
                                    cart.shipping_methods[0]?.shipping_option_id
                                  }
                                />
                                <span className="text-base-regular">
                                  {option.name}
                                </span>
                              </div>
                              <span className="justify-self-end text-ui-fg-base">
                                {formatAmount({
                                  amount: option.amount!,
                                  region: cart?.region,
                                  includeTaxes: false,
                                })}
                              </span>
                            </RadioGroup.Option>
                          )}
                    </>
                  )
                })
              ) : (
                <div className="flex flex-col items-center justify-center px-4 py-8 text-ui-fg-base">
                  <Spinner />
                </div>
              )}
            </RadioGroup>
          </div>

          <ErrorMessage error={error} />

          <Button
            size="large"
            className="mt-6"
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={!cart.shipping_methods[0]}
          >
            <TranslationComponent query={"Continue to payment"} />
          </Button>
        </div>
      ) : (
        <div>
          <div className="text-small-regular">
            {cart && cart.shipping_methods.length > 0 && (
              <div className="flex flex-col w-1/3">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">
                  Method
                </Text>
                <Text className="txt-medium text-ui-fg-subtle">
                  {cart.shipping_methods[0].shipping_option.name} (
                  {formatAmount({
                    amount: cart.shipping_methods[0].price,
                    region: cart.region,
                    includeTaxes: false,
                  })
                    .replace(/,/g, "")
                    .replace(/\./g, ",")}
                  )
                </Text>
              </div>
            )}
          </div>
        </div>
      )}
      <Divider className="mt-8" />
    </div>
  )
}

export default Shipping
