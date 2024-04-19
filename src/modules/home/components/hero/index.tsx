// "use client"
import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"

import { FaWhatsapp } from "react-icons/fa"
import { MdAddCall, MdEmail } from "react-icons/md"
import logo from "assets/debolslogo.jpg"
import BannerSlider from "../hero-components/slider"
import Sidebar from "../hero-components/sidebar"
import { CustomCard, BonusCard } from "../hero-components/custom-card"
import { ProductCollectionWithPreviews } from "types/global"
import { FaLocationDot } from "react-icons/fa6"

const Hero = async ({
  collections,
}: {
  collections: ProductCollectionWithPreviews[]
}) => {
  // console.log(collection)

  const companyInfo = {
    title: "Contact Us",
    content: [],
    contentIcon: [
      {
        title: "Call to Order: +372 53851546",
        icon: <MdAddCall className="text-[#1E854C]" />,
      },
      {
        title: "Email: debolsfood@gmail.com",
        icon: <MdEmail className="text-[#1E854C]" />,
      },
      {
        title: "WhatsApp: +372 53851546",
        icon: <FaWhatsapp className="text-[#1E854C]" />,
      },
      {
        title: "Location: Mustamäe tee 12, Tallinn (inside Maxima building)",
        icon: <FaLocationDot className="text-[#1E854C]" />,
      },
    ],
  }

  return (
    <div className=" w-full border-ui-border-base medium:relative bg-ui-bg-subtle">
      <div className="flex mt-6 hero ">
        <Sidebar collections={collections} />
        <div className=" xl:w-4/6 mt-2 w-auto bannerSlider">
          <BannerSlider collections={collections} />
          {/* Additional content here */}
        </div>
        <div className="lg:ml-2 w-64 customCard">
          <CustomCard
            title={companyInfo.title}
            contentIcon={companyInfo.contentIcon}
          />
          {/* <CustomCard {...bonusInfo} /> */}
          <BonusCard />
        </div>
      </div>
    </div>
  )
}

export default Hero
