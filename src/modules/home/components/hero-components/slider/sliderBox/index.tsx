import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

const SliderBox = ({
  image,
  title,
  description,
  textColor,
  buttonClassName,
  buttonContent,
  className,
  path,
}: {
  image: any
  description: any
  title: any
  textColor: string
  buttonClassName: string
  buttonContent: any
  className: string
  path: string
}) => {
  const Router = useRouter()

  const Redirect = (path: string) => {
    Router.push(path)
  }
  // console.log(textColor)
  return (
    <div className={`${className} rounded-lg before:rounded-lg`}>
      <div className="absolute z-[1000000001] flex flex-col items-start w-[350px] md:w-[450px] top-[20%] gap-2 ml-[3em] md:ml-[6em]">
        <h1
          className={` text-${textColor} text-2xl medium:text-6xl text-left font-bold`}
        >
          {title}
        </h1>
        <h2
          className={`z-[10000001] text-[16px] medium:text-2xl font-semibold text-${textColor}`}
        >
          {description}
        </h2>
        <button
          className={`${buttonClassName} border-r-4 border-b-4 z-[10000001] text-xl medium:text-3xl py-2 px-9`}
          onClick={(e) => {
            e.preventDefault()
            Redirect(path)
          }}
        >
          {buttonContent}
        </button>
      </div>
      <Image
        src={image}
        alt={""}
        className="absolute z-[10000001] right-0 bottom-0 w-[250px] h-[250px] medium:w-[500px] medium:h-[500px]"
        // width={500}
        // height={500}
      />
    </div>
  )
}

export default SliderBox
