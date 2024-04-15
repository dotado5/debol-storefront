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

const BannerSlider = ({
  collections,
}: {
  collections: ProductCollectionWithPreviews[]
}) => {
  const slides = [
    {
      image: meat,
      title: "Estonia's Destination",
      description: "for Authentic African Store",
      textColor: "black",
      buttonClassName: "border-white bg-[#FF4C25] text-white",
      buttonContent: "SHOP NOW",
      className: "slider1",
    },
    {
      image: fruits,
      title: "African Delights Await",
      description: "Order Now for Delivery in Estonia",
      textColor: "white",
      buttonClassName: "border-white bg-[#F3D044] text-[#415315]",
      buttonContent: "SHOP NOW",
      className: "slider2",
    },
    {
      image: vegetablesAdSpices,
      title: "SAVOUR THE SPICE",
      description: "Order Now for Delivery in Estonia",
      textColor: "[#FF4C25]",
      buttonClassName: "border-[#E7E9E7] bg-[#A7D3B5] text-[#415315]",
      buttonContent: "Unlock New Tastes",
      className: "slider3",
    },
    {
      image: cassavaFlakes,
      title: "ESTONIA'S GATEWAY",
      description: "TO AFRICAN GASTRONOMY",
      textColor: "white",
      buttonClassName: "border-[#A7D3B5] bg-[#E0D8CC] text-[#415315]",
      buttonContent: "Unlock New Tastes",
      className: "slider4",
    },
    {
      image: legumes,
      title: "IGNITE YOUR TASTE BUDS WITH",
      description: "Authentic African Food in Estonia",
      textColor: "[#FF4C25]",
      buttonClassName: "border-[#E0D8CC] bg-[#F3D044] text-[#415315]",
      buttonContent: "SHOP NOW",
      className: "slider5",
    },
  ]

  // const slides = [
  //   {
  //     image: vegetablesAdSpices,
  //     title: "SAVOUR THE SPICE",
  //     description: "Order Now for Delivery in Estonia",
  //     textColor: "[#FF4C25]",
  //     buttonClassName: "border-[#E7E9E7] bg-[#A7D3B5] text-[#415315]",
  //     buttonContent: "Unlock New Tastes",
  //     className: "slider3",
  //   },
  // ]

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
        className=" h-[300px] md:h-[400px] lg:h-[454px]"
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
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default BannerSlider
