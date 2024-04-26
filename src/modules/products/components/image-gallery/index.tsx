import { Image as MedusaImage } from "@medusajs/medusa"
import { Container } from "@medusajs/ui"
import Image from "next/image"

type ImageGalleryProps = {
  images: MedusaImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="flex items-start relative">
      <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
        {images.map((image, index) => {
          return (
            <Container
              key={image.id}
              className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle h-full flex items-center"
              id={image.id}
            >
              {/* <Image
                src={image.url}
                priority={index <= 2 ? true : false}
                className="absolute  rounded-rounded mx-auto my-[20%] "
                alt={`Product image ${index + 1}`}
                // fill
                // sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                style={{
                  objectFit: "contain",
                }}
                width={400}
                height={400}
              /> */}

              <img
                src={image.url}
                alt=""
                className="mx-auto w-[400px] h-auto"
              />
            </Container>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
// my-[20%]
