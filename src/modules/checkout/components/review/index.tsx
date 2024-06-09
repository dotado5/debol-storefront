"use client"

import { Heading, Text, clx } from "@medusajs/ui"

import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"
import { Cart, Customer } from "@medusajs/medusa"
import { useEffect } from "react"
import axios from "axios"

const Review = ({
  cart,
  customer,
}: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
  customer: Omit<Customer, "password_hash"> | null
}) => {
  const searchParams = useSearchParams()

  const isOpen = searchParams.get("step") === "review"
  useEffect(() => {
    const itemsPrice = () => {
      // console.log("call")
      cart?.items.forEach((item) => console.log(item.unit_price, "item price"))
    }
    itemsPrice()
  }, [])

  const bodytouser = JSON.stringify({
    sender: {
      name: "Debol Store",
      email: "debolsfood@gmail.com",
    },
    to: [
      {
        email: cart?.customer?.email,
      },
    ],
    subject: "Confirmation: Your Order has been successfully purchased",
    htmlContent: `<html><head>

        <style>
            body {
                background-color:#696969;
            }
            .imgtag{
                justify-content: center;
                align-items: center;
                margin-left: 45%;
            }
            .welcome {
                text-align: center;
                color: #696969;
            }
    
            .content {
                background-color: #ffffff;
                margin: 15px;
                padding: 20px;
            }
        </style> 
    </head>
    
    <body>
        <div class="imgtag">
            <img src="https://debol-storefront.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdebolslogo.5c9c9ded.jpg&w=128&q=75" alt="img" /> 
        </div>
        
        <div class="content">
            <p>Dear {{params.name}},</p> 
            <h5 style="margin-bottom: 5px"><strong>Here is your Order Details:</strong></h5>
            <h5><strong>Name:</strong> <span style="margin-left: 7px;">{{params.orderName}}</span></h5>
            <h5><strong>Date: </strong> <span style="margin-left: 7px;">{{params.orderDate}}</span></h5>
        
            <h5><strong>Quantity: </strong> <span style="margin-left: 7px;">{{params.orderQuantity}}</span></h5>
            <h5><strong>Order Number: </strong> <span style="margin-left: 7px;">{{params.orderNumber}}</span></h5>
            <h5><strong>Price: </strong> <span style="margin-left: 7px;">{{params.orderPrice}}</span></h5>

            <p>TThank you for choosing Debol Store! We're committed to ensuring your experience with us is seamless.</p>
            
            <p>If you encounter any hurdles or have questions before your order arrives, don't hesitate to drop us a line at debolsfood@gmail.com. Our support team is here to assist you </p>
            
            <p>We're grateful for your decision to shop with us and look forward to your satisfaction with our products!</p>

            <p>Best regards,</p>  
            <p>Debol Store</p>
        </div> 
    
        
    </body>
    </html>   
             `,
    params: {
      orderName: "Product Name",
      orderDate: cart?.shipping_address?.created_at,
      // "orderTime": cart?.shipping_address?.created_at.toLocaleTimeString(),
      orderQuantity: cart?.items?.length,
      orderNumber: cart?.payment_session?.cart_id,
      name: `${cart?.shipping_address?.first_name} ${cart?.shipping_address?.last_name}`,
      orderPrice: cart?.payment_session?.amount,
    },
  })

  const tableRows = cart?.items
    .map(
      (item) => `
    <tr>
      <td>${item.id}</td>
      <td>${item.created_at}</td>
      <td>${item.title}</td>
      <td>${item.created_at}</td>
      <td>${item.quantity}</td>
      <td>${item.unit_price}</td>
    </tr>
  `
    )
    .join("")

  const bodytodebol = JSON.stringify({
    sender: {
      name: "Debol Store Order Notification",
      email: "debolsfood@gmail.com",
    },
    to: [
      {
        email: "olagbemiifeoluwa@gmail.com",
      },
    ],
    subject: "Order Confirmation",
    htmlContent: `<html>
      <head>
        <style>
          /* General styles */
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
          }
      
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
      
          th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }
      
          th {
            background-color: #f2f2f2;
          }
      
          /* Specific table styles */
          .order-details {
            margin-top: 20px;
          }
      
          .order-details th, .order-details td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }
      
          .order-details th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
      <div class="imgtag">
      <img src="https://debol-storefront.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdebolslogo.5c9c9ded.jpg&w=128&q=75" alt="img" /> 
      </div>
  
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Created At</th>
              <th>Product Name</th>
              <th>Order Date</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      
        <div class="order-details">
          <h3>Order Details</h3>
          <table>
            <thead>
              <tr>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{params.orderPrice}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </body>
    </html>`,
    params: {
      orderName: "Product Name",
      orderDate: cart?.shipping_address?.created_at,
      orderQuantity: cart?.items?.length,
      orderNumber: cart?.payment_session?.cart_id,
      orderPrice: cart?.payment_session?.amount,
    },
  })
  // console.log(process.env.NEXT_PUBLIC_BREVO_API_KEY, "this is brevo key")

  const sendWhatsAppMessage = async () => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID // Your Twilio account SID
    const authToken = process.env.TWILIO_ACCOUNT_AUTHTOKEN // Your Twilio auth token

    const tableRows = cart?.items
      .map(
        (item) => `
          - Product ID: ${item.id}
          - Name: ${item.title}
          - Quantity: ${item.quantity}
          - Price: ${
            item.unit_price / 100
          } ${cart.region.currency_code.toUpperCase()}
        `
      )
      .join("\n")

    const messageBody = `
      New Order Received!
      Order ID: ${cart?.id}
      Created At: ${cart?.created_at}
      Customer: ${cart?.shipping_address?.first_name} ${
      cart?.shipping_address?.last_name
    }
      Email: ${cart?.email}

      Items:
      ${tableRows}

      Total Price: ${
        cart?.payment_session?.amount !== undefined &&
        cart?.payment_session?.amount / 100
      } ${cart?.region.currency_code.toUpperCase()}
    `

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
    } catch (error) {
      console.error("Error sending message:", error)
    }

    console.log("Whatsapp Message")
  }

  useEffect(() => {
    if (cart && customer) {
      sendWhatsAppMessage()
    }
  }, [cart, customer])

  const handleEmail = () => {
    axios
      .post("https://api.brevo.com/v3/smtp/email", bodytouser, {
        headers: {
          accept: "application/json",
          "api-key": process.env.NEXT_PUBLIC_BREVO_API_KEY,
          "content-type": "application/json",
        },
      })
      .then((res) => console.log(res))
      .catch((brevoError) => console.log(brevoError, "Body to User Error"))

    axios
      .post("https://api.brevo.com/v3/smtp/email", bodytodebol, {
        headers: {
          accept: "application/json",
          "api-key": process.env.NEXT_PUBLIC_BREVO_API_KEY,
          "content-type": "application/json",
        },
      })
      .then((res) => console.log(res))
      .catch((brevoError) => console.log(brevoError, "body to debol"))
  }

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    cart.payment_session

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-3xl-regular gap-x-2 items-baseline",
            {
              "opacity-50 pointer-events-none select-none": !isOpen,
            }
          )}
        >
          Review
        </Heading>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="flex items-start gap-x-1 w-full mb-6">
            <div className="w-full">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                By clicking the Place Order button, you confirm that you have
                read, understand and accept our Terms of Use, Terms of Sale and
                Returns Policy and acknowledge that you have read Medusa
                Store&apos;s Privacy Policy.
              </Text>
            </div>
          </div>
          <div onClick={handleEmail}>
            <PaymentButton cart={cart} />
          </div>
        </>
      )}
    </div>
  )
}

export default Review
