// "use client"

import { FaWhatsapp } from "react-icons/fa"
import { MdAddCall } from "react-icons/md"
import BannerSlider from "../hero-components/slider"
import Sidebar from "../hero-components/sidebar"
import { CustomCard, BonusCard } from "../hero-components/custom-card"
import { ProductCollectionWithPreviews } from "types/global"
import { FaLocationDot } from "react-icons/fa6"
import TranslationComponent from "@modules/Translator/component/translation"
import call from "assets/call.svg"
import whatsApp from "assets/whatsapp.svg"
import location from "assets/location.svg"
import Image from "next/image"

const Hero = async ({
  collections,
}: {
  collections: ProductCollectionWithPreviews[]
}) => {
  // console.log(collection)

  const companyInfo = {
    title: <TranslationComponent query={"Contact Us"} />,
    content: [
      {
        title: <TranslationComponent query={"WhatsApp: "} />,
        text: <TranslationComponent query={" +372 53851546"} />,
        icon: <Image src={whatsApp} alt={""} />,
      },
      {
        title: <TranslationComponent query={"Location: "} />,
        text: (
          <TranslationComponent
            query={"Tartu address: Sobra 41, 51013 Tartu"}
          />
        ),
        icon: <Image src={location} alt={""} />,
      },
      {
        title: <TranslationComponent query={"Location: "} />,
        text: (
          <TranslationComponent
            query={
              "Tallinn address: Mustamäe tee 12, Tallinn (inside Maxima building)"
            }
          />
        ),
        icon: <Image src={location} alt={""} />,
      },
    ],
  }

  return (
    <div className=" w-full border-ui-border-base medium:relative bg-ui-bg-subtle">
      <div className="flex mt-2 medium:mt-6 hero ">
        <Sidebar collections={collections} />
        <div className=" xl:w-4/6 mt-4 w-auto bannerSlider">
          <BannerSlider collections={collections} />
          {/* Additional content here */}
        </div>
        <div className="lg:ml-2 w-full mt-4 medium:w-[320px] md:flex medium:flex-col customCard">
          <CustomCard content={companyInfo.content} />
          {/* <CustomCard {...bonusInfo} /> */}
          <BonusCard />
        </div>
      </div>
    </div>
  )
}

export default Hero
