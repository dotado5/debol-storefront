"use client"

import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Button } from "@medusajs/ui"
import { isEqual } from "lodash"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

import { useIntersection } from "@lib/hooks/use-in-view"
import { addToCart } from "@modules/cart/actions"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/option-select"

import MobileActions from "../mobile-actions"
import ProductPrice from "../product-price"
import axios from "axios"

type ProductActionsProps = {
  product: PricedProduct
  region: Region
}

export type PriceType = {
  calculated_price: string
  original_price?: string
  price_type?: "sale" | "default"
  percentage_diff?: string
}

export default function ProductActions({
  product,
  region,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [hasTubers, setHasTubers] = useState<boolean>()
  const [whatsappMessage, setWhatsappMessage] = useState<boolean>()
  const router = useRouter()

  const countryCode = useParams().countryCode as string

  const variants = product.variants

  // initialize the option state
  useEffect(() => {
    const optionObj: Record<string, string> = {}

    for (const option of product.options || []) {
      Object.assign(optionObj, { [option.id]: undefined })
    }

    setOptions(optionObj)
  }, [product])

  // memoized record of the product's variants
  const variantRecord = useMemo(() => {
    const map: Record<string, Record<string, string>> = {}

    for (const variant of variants) {
      if (!variant.options || !variant.id) continue

      const temp: Record<string, string> = {}

      for (const option of variant.options) {
        temp[option.option_id] = option.value
      }

      map[variant.id] = temp
    }

    return map
  }, [variants])

  // memoized function to check if the current options are a valid variant
  const variant = useMemo(() => {
    let variantId: string | undefined = undefined

    for (const key of Object.keys(variantRecord)) {
      if (isEqual(variantRecord[key], options)) {
        variantId = key
      }
    }

    return variants.find((v) => v.id === variantId)
  }, [options, variantRecord, variants])

  // if product only has one variant, then select it
  useEffect(() => {
    if (variants.length === 1 && variants[0].id) {
      setOptions(variantRecord[variants[0].id])
    }
  }, [variants, variantRecord])

  // update the options when a variant is selected
  const updateOptions = (update: Record<string, string>) => {
    setOptions({ ...options, ...update })
  }

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    if (variant && !variant.inventory_quantity) {
      return false
    }

    if (variant && variant.allow_backorder === false) {
      return true
    }
  }, [variant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!variant?.id) return null

    if (product.collection?.title === "Tubers and Plantains") {
      await setHasTubers(true)
    } else {
      setIsAdding(true)

      await addToCart({
        variantId: variant.id,
        quantity: 1,
        countryCode,
      })
    }

    setIsAdding(false)
  }

  const backToCart = () => {
    setHasTubers(false)
    // router.back()
  }

  const sendWhatsAppMessage = async () => {
    setWhatsappMessage(true)
    const accountSid = process.env.TWILIO_ACCOUNT_SID // Your Twilio account SID
    const authToken = process.env.TWILIO_ACCOUNT_AUTHTOKEN // Your Twilio auth token

    const messageBody = `Hi I would like to order this product: ${product.title}`

    try {
      const response = await axios.post(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        new URLSearchParams({
          To: "whatsapp:+2348034643978", // Business owner's WhatsApp number
          From: "whatsapp:+14155238886", // Your Twilio WhatsApp number
          Body: messageBody,
        }),
        {
          auth: {
            username: accountSid ? accountSid : "",
            password: authToken ? authToken : "",
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )

      console.log("Message sent:", response.data)
      setWhatsappMessage(false)
    } catch (error) {
      console.error("Error sending message:", error)
      setWhatsappMessage(false)
    }

    console.log("Whatsapp Message")
  }

  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        <div>
          {product.variants.length > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.id]}
                      updateOption={updateOptions}
                      title={option.title}
                    />
                  </div>
                )
              })}
              <Divider />
            </div>
          )}
        </div>

        <ProductPrice product={product} variant={variant} region={region} />

        <Button
          onClick={handleAddToCart}
          disabled={!inStock || !variant}
          variant="primary"
          className="w-full h-10"
          isLoading={isAdding}
        >
          {!variant
            ? "Select variant"
            : !inStock
            ? "Out of stock"
            : "Add to cart"}
        </Button>
        <MobileActions
          product={product}
          variant={variant}
          region={region}
          options={options}
          updateOptions={updateOptions}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
        />
      </div>

      {hasTubers && (
        <div className="w-[400px] ">
          <div className="overlay"></div>
          <div className="popup">
            <div className="popup-content">
              <h2>Dear Customer</h2>
              <p className="font-bold w-[400px] text-center">
                Products in the Tuber and Plantain collection can only be
                ordered via whatsapp
              </p>
              <div className="flex gap-2 mx-[11%]">
                <button
                  onClick={backToCart}
                  className="bg-[#007bff] hover:bg-[#0056b3]"
                >
                  Go back to Cart
                </button>
                <button
                  onClick={sendWhatsAppMessage}
                  className="bg-green-700 hover:bg-green-950"
                >
                  {whatsappMessage ? (
                    <div className="spinner"></div>
                  ) : (
                    "Go to Whatsapp"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
