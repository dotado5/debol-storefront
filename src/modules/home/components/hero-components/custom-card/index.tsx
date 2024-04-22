"use client"

import Image from "next/image"
import React from "react"
import whiteLogo from "assets/logo_white.svg"
import advertWoman from "assets/advert_woman.svg"
import Translator from "@modules/Translator/translator"
import TranslationComponent from "@modules/Translator/component/translation"

interface ContentIcons {
  title: any
  icon?: any
}

interface CardProps {
  title: any
  content?: any[]
  imageUrl?: any // Optional image URL for the bonus card
  contentIcon?: ContentIcons[]
}

export const CustomCard: React.FC<CardProps> = ({
  title,
  imageUrl,
  contentIcon,
}) => {
  return (
    <div className="bg-[#f5f6f4] shadow-lg rounded-2xl p-6 w-full md:w-auto mb-4">
      {/* <h2 className="text-sm font-semibold mb-4">{title}</h2> */}
      {contentIcon &&
        contentIcon.map((item, index) => (
          <div key={index} className="flex items-center mb-3 gap-2 text-sm">
            {item.icon}
            <p>{item.title}</p>
          </div>
        ))}
    </div>
  )
}

export const BonusCard = () => {
  return (
    <div className="bonusCard flex w-[300px] medium:w-full mx-auto md:mx-0">
      <div className="z-[10000001]">
        <Image src={whiteLogo} alt={""} width={100} height={50} />
        <h1 className="text-xl p-0 text-white font-bold ml-1 mt-[1em] medium:mt-[1.5em]">
          <TranslationComponent query={"Africa & Asia"} />
        </h1>
        <h4 className="text-white font-bold ml-1 text-sm">
          {" "}
          <TranslationComponent query={"Store"} />
        </h4>
        <p className="text-[10px] text-white ml-1">
          <TranslationComponent
            query={
              "Explore African and Asian wonders with our curated collection."
            }
          />
        </p>
      </div>
      <div className=" z-[10000001] ">
        <Image
          src={advertWoman}
          alt={""}
          className="medium:mt-[40.2%] ml-0 rounded-br-2xl mt-[2.3em]"
          width={400}
          height={400}
        />
      </div>
    </div>
  )
}
