import { Text, clx } from "@medusajs/ui"

import { getCategoriesList, getCollectionsList } from "@lib/data"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import Image from "next/image"
import logo from "assets/debolslogo.jpg"
import { CiLinkedin, CiTwitter, CiInstagram } from "react-icons/ci"
import { RiFacebookBoxLine } from "react-icons/ri"
import TranslationComponent from "@modules/Translator/component/translation"

export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)

  const columns = [
    // {
    //   title: <TranslationComponent query={"What We Do"} />,
    //   links: [
    //     {
    //       name: <TranslationComponent query={"Store"} />,
    //       to: "#",
    //     },
    //     {
    //       name: <TranslationComponent query={"African Store"} />,
    //       to: "#",
    //     },
    //   ],
    // },
    {
      title: <TranslationComponent query={"Services"} />,
      links: [
        {
          name: <TranslationComponent query={"Delivery Service"} />,
          to: "",
        },
      ],
    },
    {
      title: <TranslationComponent query={"Resources"} />,
      links: [
        {
          name: <TranslationComponent query={"Privacy Policy"} />,
          to: "",
        },
        {
          name: <TranslationComponent query={"Terms and Conditions"} />,
          to: "",
        },
        {
          name: <TranslationComponent query={"FAQs"} />,
          to: "",
        },
      ],
    },
  ]

  const socials = [
    {
      tag: <RiFacebookBoxLine />,
      src: "https://www.facebook.com/profile.php?id=100048446393932",
    },
    { tag: <CiInstagram />, src: "https://www.instagram.com/debolsstore/" },
  ]

  return (
    <footer className="border-t border-ui-border-base w-full bg-[#F5F5F5] ">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-10">
          <div>
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
            >
              <Image src={logo} alt={""} width={120} height={120} />
            </LocalizedClientLink>

            <div className="flex gap-2 socials mt-[1em]">
              {socials.map((social, index) => (
                <a href={social.src} className="text-[30px]" key={index}>
                  {social.tag}
                </a>
              ))}
            </div>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 medium:grid-cols-3">
            {columns.map((column, index) => (
              <div key={index} className="flex flex-col gap-3 ml-[3em] column">
                <h3 className="text-base font-bold txt-ui-fg-base">
                  {column.title}
                </h3>
                {column.links.map((link, index) => (
                  <LocalizedClientLink
                    href={link.to}
                    key={index}
                    className="hover:text-ui-fg-base text-ui-fg-subtle text-base"
                  >
                    {link.name}
                  </LocalizedClientLink>
                ))}
              </div>
            ))}
            {product_categories && product_categories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="text-base txt-ui-fg-base">Categories</span>
                <ul className="grid grid-cols-1 gap-2">
                  {product_categories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="flex flex-col gap-2 text-ui-fg-subtle text-base"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-ui-fg-base",
                            children && "text-base"
                          )}
                          href={`/categories/${c.handle}`}
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-ui-fg-base"
                                    href={`/categories/${child.handle}`}
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            <div className="flex flex-col text-base w-[250px] items-start ml-[1em] lg:ml-0">
              <h2 className="font-bold">Location: </h2>
              <p>Mustamäe tee 12, Tallinn (inside Maxima building)</p>
            </div>
          </div>
        </div>
        <div className="flex w-full mb-16 justify-between text-ui-fg-muted">
          <div>
            <Text className="text-base">
              © {new Date().getFullYear()}{" "}
              <TranslationComponent
                query={"Debol Store. All rights reserved."}
              />
            </Text>
          </div>
          <div className="flex gap-2 font-bold text-base ml-4">
            <TranslationComponent query={"developed by"} />{" "}
            <p className="flex text-green-700">
              <a href="https://doyenify.com/">
                doyenif<span className="text-gray-500">y</span>
              </a>
            </p>
          </div>
          {/* <MedusaCTA /> */}
        </div>
      </div>
    </footer>
  )
}
