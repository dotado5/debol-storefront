"use client"

import Image from "next/image"
import React from "react"
import whiteLogo from "assets/logo_white.svg"
import advertWoman from "assets/advert_woman.svg"

interface ContentIcons {
  title: string
  icon?: any
}

interface CardProps {
  title: string
  content?: string[]
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
      <h2 className="text-sm font-semibold mb-4">{title}</h2>
      {contentIcon &&
        contentIcon.map((item, index) => (
          <div key={index} className="flex items-center mb-3 gap-2 text-xs">
            {item.icon}
            <p>{item.title}</p>
          </div>
        ))}
    </div>
  )
}

export const BonusCard = () => {
  return (
    <div className="bonusCard flex w-[300px] medium:w-full">
      <div className="z-[10000001]">
        <Image src={whiteLogo} alt={""} width={100} height={50} />
        <h1 className="text-xl p-0 text-white font-bold ml-1">Africa & Asia</h1>
        <h4 className="text-white font-bold ml-1 text-sm">Store</h4>
        <p className="text-[10px] text-white ml-1">
          Embark on a cultural exploration with our curated selection of African
          and Asian treasures.
        </p>
      </div>
      <div className=" z-[10000001] ">
        <Image
          src={advertWoman}
          alt={""}
          className="medium:mt-[43%] ml-0 rounded-br-2xl"
          width={400}
          height={400}
        />
      </div>
    </div>
  )
}
