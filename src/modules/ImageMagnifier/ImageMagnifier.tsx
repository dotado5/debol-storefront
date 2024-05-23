import React, { Component } from "react"
import ReactImageMagnify from "react-image-magnify"
import ReactSlick from "react-slick"

import "../../styles/react-slick.css"

interface ComponentProps {
  smallImage: string
  largeImage: string
}

export default class ReactSlickExample extends Component<ComponentProps> {
  render() {
    // const { rimProps, rsProps } = this.props

    const { smallImage, largeImage } = this.props

    return (
      <ReactSlick
        {...{
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
        }}
        // {...rsProps}
      >
        <div>
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "Wristwatch by Ted Baker London",
                isFluidWidth: true,
                src: smallImage,
              },
              largeImage: {
                src: largeImage,
                width: 1129,
                height: 750,
              },
              lensStyle: { backgroundColor: "rgba(0,0,0,.6)" },
            }}
            // className="galleryImage mx-auto h-auto max-h-[300px] object-contain"
          />
        </div>
      </ReactSlick>
    )
  }
}
