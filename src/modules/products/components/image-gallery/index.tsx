"use client"

import React, { useEffect } from "react"
import { Image as MedusaImage } from "@medusajs/medusa"
import { Container } from "@medusajs/ui"
import ImageEffect from "@modules/ImageMagnifier/ImageMagnifier"
import Image from "next/image"
import ReactImageMagnify from "react-image-magnify"

type ImageGalleryProps = {
  images: MedusaImage[]
}

// const ImageGallery = ({ images }: ImageGalleryProps) => {
//   return (
//     <div className="flex items-start relative">
//       <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
//         {images.map((image, index) => {
//           return (
//             <Container
//               key={image.id}
// className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle h-full flex items-center"
//               id={image.id}
//             >
//               {/* <img
//                 src={image.url}
//                 alt=""
//                 className="mx-auto w-[300px] h-auto max-h-[300px] object-contain"
//               /> */}
//               {/*
//               <GlassMagnifier
//                 imageSrc="./image.jpg"
//                 imageAlt="Example"
//                 largeImageSrc="./large-image.jpg" // Optional
//               /> */}
//               {/* <ImageEffect imgSrc={image.url} /> */}
//               <ReactImageMagnify
//                 {...{
//                   smallImage: {
//                     alt: "Wristwatch by Ted Baker London",
//                     isFluidWidth: true,
//                     src: image.url,
//                   },
//                   largeImage: {
//                     src: image.url,
//                     width: 1200,
//                     height: 1800,
//                   },
//                 }}
//               />
//             </Container>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="flex items-start relative">
      <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-full h-full aspect-[29/34] flex items-center"
          >
            {/* overflow-hidden bg-ui-bg-subtle w-full h-full aspect-[29/34] flex items-center*/}
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: image.url,
                },
                largeImage: {
                  src: image.url,
                  width: 1129,
                  height: 750,
                },
                enlargedImageContainerDimensions: {
                  width: "200%",
                  height: "100%",
                },
              }}
              className="galleryImage mx-auto h-auto max-h-[300px] object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageGallery
