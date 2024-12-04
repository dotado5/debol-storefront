"use client"

import { Heading, Text, clx } from "@medusajs/ui"

import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"
import TranslationComponent from "@modules/Translator/component/translation"
import { Cart, Customer } from "@medusajs/medusa"
import React, { useState, useEffect } from "react"
import { getCustomer, listRegions } from "@lib/data"
import axios from "axios"

import CountrySelect from "../country-select"
import { deleteLineItem } from "@modules/cart/actions"
const Review = ({
  cart,
  customer,
}: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
  customer: Omit<Customer, "password_hash"> | null
}) => {
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [checkB, setCheckB] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [messageC, setMessageC] = useState("")
  const [showModal, setShowModal] = useState(true);
  const [disableOrderBtn, setDisableOrderBtn] = useState(false)
  

  const searchParams = useSearchParams()

  const isOpen = searchParams.get("step") === "review"
  useEffect(() => {
    setShowModal(true)
    const itemsPrice = () => {
      // console.log("call")
      cart?.items.forEach((item) => console.log(item.unit_price, "item price"))
    }
    itemsPrice()
  }, [cart])

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


  const bodytouserMail = JSON.stringify({
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
      orderName: "Selected Orders",
      orderDate: cart?.shipping_address?.created_at,
      // "orderTime": cart?.shipping_address?.created_at.toLocaleTimeString(),
      orderQuantity: cart?.items?.length,
      orderNumber: cart?.payment_session?.cart_id,
      name: `${firstname} ${lastname}`,
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

  const bodytodebolMail = JSON.stringify({
    sender: {
      name: "Debol Store Order Notification",
      email: "debolsfood@gmail.com",
    },
    to: [
      {
        email: "info.doyenify@gmail.com",
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

      

          <div>
            <div><span>Firstname </span>: <span style="margin-left: 8px"> {{params.firstname}}</span></div>
            <div><span>Lastname </span>: <span style="margin-left: 8px"> {{params.lastname}} </span></div>
            <div><span>Address </span>: <span style="margin-left: 8px"> {{params.address}}</span></div>
            <div><span>Company </span>: <span style="margin-left: 8px"> {{params.company}} </span></div>
            <div><span>PostalCode </span>: <span style="margin-left: 8px"> {{params.postalCode}} </span></div>
            <div><span>City </span>: <span style="margin-left: 8px"> {{params.city}}</span></div>
            <div><span>Country </span>: <span style="margin-left: 8px"> {{params.country}}</span></div>
            <div><span>Province </span>: <span style="margin-left: 8px"> {{params.province}} </span></div>
            <div><span>Billing address same as shipping address </span>: <span style="margin-left: 8px"> {{params.checkB}} </span></div>
            <div><span>Email </span>: <span style="margin-left: 8px"> {{params.email}}</span></div>
            <div><span>Phone </span>: <span style="margin-left: 8px"> {{params.phone}} </span></div>
            <div><span>Message </span>: <span style="margin-left: 8px"> {{params.message}} </span></div>
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
      orderName: "Selected Orders",
      orderDate: cart?.shipping_address?.created_at,
      orderQuantity: cart?.items?.length,
      orderNumber: cart?.payment_session?.cart_id,
      orderPrice: cart?.payment_session?.amount,
      firstname: firstname,
      lastname: lastname,
      address: address,
      company: company,
      postalCode: postalCode,
      city: city,
      country: country,
      province: province,
      checkB: checkB,
      email: email,
      phone: phone,
      message: messageC,
    },
  })

  useEffect(() => {
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

    const postEmailData = async() => {
      // console.log(retrieveCart)
      setDisableOrderBtn(true)
    
      // cart?.items
      //   .map(
      //     async(item) => { 
      //       await deleteLineItem(item.id).then(() => {
      //         setDisableOrderBtn(false)
      //         window.location.href=`/store`}).catch((error) => {
      //         alert("An error occurred, please try again.")
      //         setDisableOrderBtn(false)
      //         console.log(error)
              
      //       })
      //     })
      
      if (firstname.length > 0 && lastname.length > 0 && address.length > 0 && company.length > 0 && postalCode.length > 0 && city.length > 0 
        && country.length > 0 && province.length > 0 && email.length > 0 && phone.length > 0 && messageC.length > 0) {
          // const emailData = {
          //   "firstname": firstname,
          //   "lastname": lastname,
          //   "address": address,
          //   "company": company,
          //   "postalCode": postalCode,
          //   "city": city,
          //   "country": country,
          //   "province": province,
          //   "checkB": checkB,
          //   "email": email,
          //   "phone": phone,
          //   "message": messageC,
          // }
          
          // console.log(emailData)

        axios
          .post("https://api.brevo.com/v3/smtp/email", bodytodebolMail, {
            headers: {
              accept: "application/json",
              "api-key": process.env.NEXT_PUBLIC_BREVO_API_KEY,
              "content-type": "application/json",
            },
          })
          .then((res) => {

            axios
              .post("https://api.brevo.com/v3/smtp/email", bodytouserMail, {
                headers: {
                  accept: "application/json",
                  "api-key": process.env.NEXT_PUBLIC_BREVO_API_KEY,
                  "content-type": "application/json",
                },
              })
              .then((res) => {
                cart?.items
                .map(
                  async(item) => { 
                    await deleteLineItem(item.id).then(() => {
                      setDisableOrderBtn(false)
                      setFirstname("")
                      setLastname("");
                      setAddress("");
                      setCompany("");
                      setPostalCode("");
                      setCity("");
                      setCountry("");
                      setProvince("");
                      setCheckB(false);
                      setEmail("");
                      setPhone("");
                      setMessageC("")
                      window.location.href=`/store`}).catch((error) => {
                      alert("An error occurred, please try again.")
                      setDisableOrderBtn(false)
                      console.log(error)
                      
                    })
                  })
              })
              .catch((brevoError) => {
                setDisableOrderBtn(false)
                console.log(brevoError, "Body to User Error")})
              })
          .catch((brevoError) => {
            setDisableOrderBtn(false)
            console.log(brevoError, "body to debol")})

        } else {
          alert("Values not complete")
          setDisableOrderBtn(false)
        }
  
    }

  return (
    <div className="bg-white">
        {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div style={{marginTop: "10px"}}  className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Place your Order
                  </h3>
                  {/* <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button> */}
                </div>
                {/*body*/}
                {disableOrderBtn ? (<>
                  <p style={{color: "#696969", textAlign: "center", marginTop: "4%", padding: "30px"}}>Please wait while we Process your Order. Processing...</p>
                </>):(<>
                  <div className="relative p-6 flex-auto">
                  <div>
                              
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        placeholder="First name..."
                        value={firstname}
                        onChange={(e) => {setFirstname(e.target.value)}}
                        type="text"
                        style={{border: "1px solid #d4e6e6", borderRadius: "10px", padding: "10px"}}
                      />
                      <input
                        placeholder="Last name..."
                        value={lastname}
                        onChange={(e) => {setLastname(e.target.value)}}
                        type="text"
                        style={{border: "1px solid #d4e6e6", borderRadius: "10px", padding: "10px"}}
                      />
                      <input
                        placeholder="Address..."
                        value={address}
                        onChange={(e) => {setAddress(e.target.value)}}
                        type="text"
                        style={{border: "1px solid #d4e6e6", borderRadius: "10px", padding: "10px"}}
                      />
                      <input
                        placeholder="Company..."
                        value={company}
                        onChange={(e) => {setCompany(e.target.value)}}
                        type="text"
                        style={{border: "1px solid #d4e6e6", borderRadius: "10px", padding: "10px"}}
                      />
                      <input
                        placeholder="Postal code..."
                        value={postalCode}
                        onChange={(e) => {setPostalCode(e.target.value)}}
                        type="number"
                        style={{border: "1px solid #d4e6e6", borderRadius: "10px", padding: "10px"}}
                      />
                      <input
                        placeholder="City..."
                        value={city}
                        onChange={(e) => {setCity(e.target.value)}}
                        type="text"
                        style={{border: "1px solid #d4e6e6", borderRadius: "10px", padding: "10px"}}
                      />
                      <CountrySelect
                        name="country_code..."
                        region={cart?.region}
                        value={country}
                        onChange={(e) => {setCountry(e.target.value)}}
                        required
                      />
                      <input
                        placeholder="State / Province..."
                        value={province}
                        onChange={(e) => {setProvince(e.target.value)}}
                        type="text"
                        style={{border: "1px solid #d4e6e6", borderRadius: "10px", padding: "10px"}}
                      />
                    </div>
                    <div className="my-8">
                      <input
                        type="checkbox"
                        checked={checkB}
                        onChange={(e:any) => {setCheckB(e.target.checked)}}
                      /> Billing address same as shipping address
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <input
                        placeholder="Email..."
                        type="email"
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}
                        style={{border: "1px solid #d4e6e6", borderRadius: "10px", padding: "10px"}}
                      />
                      <input
                        placeholder="Phone..."
                        value={phone}
                        onChange={(e) => {setPhone(e.target.value)}}
                        type="tel" style={{border: "1px solid #d4e6e6", borderRadius: "10px", padding: "10px"}}
                      />
                    </div>
                    <div>
                      <textarea placeholder="Message..."  
                      value={messageC}
                      onChange={(e) => {setMessageC(e.target.value)}}
                      style={{width: "100%", height: "75px", border: "1px solid #d4e6e6", borderRadius: "10px", padding: "10px"}}/>
                    </div>
                                </div>
                </div>
                
                </>)}
                
                
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  {/* <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  
                  >
                    Close
                  </button> */}
                  {disableOrderBtn ? (<>
                    <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    disabled={disableOrderBtn}
                    
                  >
                    Processing ...
                  </button>
                  </>):(<>
                    <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    disabled={disableOrderBtn}
                    // onClick={() => setShowModal(false)}
                    onClick={() => postEmailData()}
                  >
                    Place Order
                  </button>
                  
                  </>)}
                  
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
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
          <TranslationComponent query={"Review"} />
        </Heading>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="flex items-start gap-x-1 w-full mb-6">
            <div className="w-full">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                <TranslationComponent
                  query={
                    "By clicking the Place Order button, you confirm that you have read, understand and accept our Terms of Use, Terms of Sale and Returns Policy and acknowledge that you have read Debol Store&apos;s Privacy Policy."
                  }
                />
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
