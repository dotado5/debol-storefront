"use client"

import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { ProductCollectionWithPreviews } from "types/global"
import meat from "assets/slidesImages/meat.svg"
import fruits from "assets/slidesImages/fruits.svg"
import vegetablesAdSpices from "assets/slidesImages/vegetablesAndSpices.svg"
import cassavaFlakes from "assets/slidesImages/cassaveFlakes.svg"
import legumes from "assets/slidesImages/legumes.svg"
import SliderBox from "./sliderBox"
import TranslationComponent from "@modules/Translator/component/translation"

const BannerSlider = ({
  collections,
}: {
  collections: ProductCollectionWithPreviews[]
}) => {
  const slides = [
    {
      image: meat,
      title: <TranslationComponent query={"Estonia's Destination"} />,
      description: (
        <TranslationComponent query={"for Authentic African Store"} />
      ),
      textColor: "black",
      buttonClassName: "border-white bg-[#FF4C25] text-white",
      buttonContent: <TranslationComponent query={"SHOP NOW"} />,
      className: "slider1",
      path: "/collections/frozen_foods",
    },
    {
      image: fruits,
      title: <TranslationComponent query={"African Delights Await"} />,
      description: (
        <TranslationComponent query={"Order Now for Delivery in Estonia"} />
      ),
      textColor: "white",
      buttonClassName: "border-white bg-[#F3D044] text-[#415315]",
      buttonContent: <TranslationComponent query={"SHOP NOW"} />,
      className: "slider2",
      path: "/collections/fruits_vegetables",
    },
    {
      image: vegetablesAdSpices,
      title: <TranslationComponent query={"SAVOUR THE SPICE"} />,
      description: (
        <TranslationComponent query={"Order Now for Delivery in Estonia"} />
      ),
      textColor: "[#FF4C25]",
      buttonClassName: "border-[#E7E9E7] bg-[#A7D3B5] text-[#415315]",
      buttonContent: <TranslationComponent query={"Unlock New Tastes"} />,

      className: "slider3",
      path: "/collections/seasoning_spices",
    },
    {
      image: cassavaFlakes,
      title: <TranslationComponent query={"ESTONIA'S GATEWAY"} />,
      description: <TranslationComponent query={"TO AFRICAN GASTRONOMY"} />,
      textColor: "white",
      buttonClassName: "border-[#A7D3B5] bg-[#E0D8CC] text-[#415315]",
      buttonContent: <TranslationComponent query={"Unlock New Tastes"} />,
      className: "slider4",
      path: "/collections/tubers_plantains",
    },
    {
      image: legumes,
      title: <TranslationComponent query={"IGNITE YOUR TASTE BUDS WITH"} />,
      description: (
        <TranslationComponent query={"Authentic African Food in Estonia"} />
      ),
      textColor: "[#FF4C25]",
      buttonClassName: "border-[#E0D8CC] bg-[#F3D044] text-[#415315]",
      buttonContent: <TranslationComponent query={"SHOP NOW"} />,
      className: "slider5",
      path: "/collections/beans_grains",
    },
  ]

  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        loop={true}
        className=" h-[300px] md:h-[400px] lg:h-[454px] lg:w-[400px] medium:w-auto"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <SliderBox
              image={slide.image}
              description={slide.description}
              title={slide.title}
              textColor={slide.textColor}
              buttonClassName={slide.buttonClassName}
              buttonContent={slide.buttonContent}
              className={slide.className}
              path={slide.path}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default BannerSlider
