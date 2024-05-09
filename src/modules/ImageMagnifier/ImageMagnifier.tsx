"use client"

import React, { MouseEvent, useEffect, useState } from "react"
// import sampleImg from "../../public/sample.png"
import Image from "next/image"

const MAGNIFIER_SIZE = 100
const ZOOM_LEVEL = 2.5

const ImageEffect = ({ imgSrc }: { imgSrc: string }) => {
  // State variables
  const [zoomable, setZoomable] = useState(false)
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0, mouseX: 0, mouseY: 0 })

  // Event handlers
  const handleMouseEnter = (e: MouseEvent) => {
    let element = e.currentTarget
    let { width, height } = element.getBoundingClientRect()
    setImageSize({ width, height })
    setZoomable(true)
    updatePosition(e)

    console.log(imageSize)
  }
  const handleMouseLeave = (e: MouseEvent) => {
    setZoomable(false)
    updatePosition(e)
  }
  const handleMouseMove = (e: MouseEvent) => {
    updatePosition(e)
  }
  const updatePosition = (e: MouseEvent) => {
    const { left, top } = e.currentTarget.getBoundingClientRect()
    let x = e.clientX - left
    let y = e.clientY - top
    setPosition({
      x: -x * ZOOM_LEVEL + MAGNIFIER_SIZE / 2,
      y: -y * ZOOM_LEVEL + MAGNIFIER_SIZE / 2,
      mouseX: x - MAGNIFIER_SIZE / 2,
      mouseY: y - MAGNIFIER_SIZE / 2,
    })
  }

  return (
    <div className="flex justify-center items-center">
      <div
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        className="w-80 h-96 relative overflow-hidden"
      >
        <Image className="object-cover z-10" alt="" src={imgSrc} fill />
        <div
          style={{
            backgroundPosition: `${position.x}px ${position.y}px`,
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: `${imageSize.width * ZOOM_LEVEL}px ${
              imageSize.height * ZOOM_LEVEL
            }px`,
            backgroundRepeat: "no-repeat",
            display: zoomable ? "block" : "none",
            top: `${position.mouseY}px`,
            left: `${position.mouseX}px`,
            width: `${MAGNIFIER_SIZE}px`,
            height: `${MAGNIFIER_SIZE}px`,
          }}
          className={`z-50 border-4 rounded-full pointer-events-none absolute border-gray-500`}
        />
      </div>
    </div>
  )
}

export default ImageEffect
