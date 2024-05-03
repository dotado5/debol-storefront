"use client"

import Image from "next/image"
import React from "react"
import whiteLogo from "assets/logo_white.svg"
import advertWoman from "assets/advert_woman.svg"
import Translator from "@modules/Translator/translator"
import TranslationComponent from "@modules/Translator/component/translation"

interface ContentIcons {
  title: any
  text: any
  icon?: any
}

interface CardProps {
  content?: ContentIcons[]
}

export const CustomCard: React.FC<CardProps> = ({ content }) => {
  return (
    <>
      <div className="bg-[#f5f6f4] shadow-lg hidden lg:flex flex-col justify-between rounded-lg p-2 w-full md:w-full  mb-4 h-[50%]">
        {/* <h2 className="text-sm font-semibold mb-4">{title}</h2> */}
        {content &&
          content.map((item, index) => (
            <div
              key={index}
              className="flex items-center mb-3 gap-4 text-base lg:text-base "
            >
              {item.icon}
              <p className="flex flex-col font-bold">
                {item.title} <span className="font-normal">{item.text}</span>
              </p>
            </div>
          ))}
      </div>

      {/* for mobile screen */}
      <div className="flex lg:hidden justify-between rounded-lg w-[330px] items-center relative left-[13%] md:left-[35%] top-[-345px] md:top-[-445px] lg:top-[-495px]">
        {content &&
          content.slice(0, 1).map((item, index) => (
            <div
              key={index}
              className="flex items-center mb-3 gap-4 text-base lg:text-base mx-auto "
            >
              {item.icon}
              <p className="flex font-bold">
                {item.title} <span className="font-normal">{item.text}</span>
              </p>
            </div>
          ))}
      </div>
    </>
  )
}

export const BonusCard = () => {
  return (
    <div className="bonusCard hidden lg:flex w-full medium:w-full md:mx-0 h-full ">
      <div className="z-[10000001]">
        <Image src={whiteLogo} alt={""} width={100} height={50} />
        <h1 className="text-4xl p-0 text-white font-bold ml-1 mt-[1em] md:mt-[-0.05px] medium:mt-0">
          <TranslationComponent query={"Africa & Asia"} />
        </h1>
        <h4 className="text-white font-bold ml-1 text-xl">
          <TranslationComponent query={"Store"} />
        </h4>
        <p className="text-base lg:text-xs text-white ml-1 w-full">
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
          className=" ml-0 rounded-br-2xl mt-0 medium:mt-[-3.2em] w-[300px] h-[200px] medium:w-[400px] medium:h-[300px]"
          // width={400}
          // height={400}
        />
      </div>
    </div>
  )
}
