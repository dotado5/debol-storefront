import Image from "next/image"
import React from "react"

const index = ({
  image,
  title,
  description,
  textColor,
  buttonClassName,
  buttonContent,
  className,
}: {
  image: any
  description: string
  title: string
  textColor: string
  buttonClassName: string
  buttonContent: string
  className: string
}) => {
  // console.log(textColor)
  return (
    <div className={`${className}`}>
      <div className="absolute z-[10000001] flex flex-col items-start w-[450px] top-[20%] gap-2 ml-[6em]">
        <h1 className={` text-${textColor} text-6xl text-left`}>{title}</h1>
        <h2
          className={`z-[10000001]text-[16px] medium:text-2xl font-semibold text-${textColor}`}
        >
          {description}
        </h2>
        <button
          className={`${buttonClassName} border-r-4 border-b-4 z-[10000001] text-3xl py-2 px-9`}
        >
          {buttonContent}
        </button>
      </div>
      <Image
        src={image}
        alt={""}
        className="absolute z-[10000001] right-0 bottom-0 w-[200px] h-[200px] medium:w-[500px] medium:h-[500px]"
        // width={500}
        // height={500}
      />
    </div>
  )
}

export default index
