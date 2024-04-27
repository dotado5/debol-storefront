"use client"

import React, { useState } from "react"

const ImageMagnifier = ({
  src,
  alt,
  zoom,
}: {
  src: string
  alt: string
  zoom: number
}) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [showMagnifier, setShowMagnifier] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: any) => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = ((e.pageX - left) / width) * 100
    const y = ((e.pageY - top) / height) * 100
    setOffset({ x, y })
    setCursorPosition({ x: e.pageX - left, y: e.pageY - top })
  }

  return (
    <div
      className="magnifier-container"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
    >
      <div className="magnifier-image-container">
        <img
          src={src}
          alt={alt}
          style={{ objectPosition: `${offset.x}% ${offset.y}%` }}
        />
      </div>
      {showMagnifier && (
        <div
          style={{
            position: "absolute",
            left: `${cursorPosition.x - 50}px`,
            top: `${cursorPosition.y - 50}px`,
            pointerEvents: "none",
          }}
        >
          <div
            className="magnifier-image"
            style={{
              backgroundImage: `url(${src})`,
              backgroundPosition: `${offset.x}% ${offset.y}%`,
              //   backgroundPosition: `-${offset.x * zoom}px -${offset.y * zoom}px`,
            }}
          />
        </div>
      )}
    </div>
  )
}

export default ImageMagnifier
