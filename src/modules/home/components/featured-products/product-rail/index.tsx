import { Region } from "@medusajs/medusa"
import { Text } from "@medusajs/ui"
import TranslationComponent from "@modules/Translator/component/translation"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"
import { ProductCollectionWithPreviews } from "types/global"

export default function ProductRail({
  collection,
  region,
}: {
  collection: ProductCollectionWithPreviews
  region: Region
}) {
  const { products } = collection

  if (!products) {
    return null
  }

  // console.log(products)

  return (
    <div className="content-container py-10 small:py-6">
      <div className="flex justify-between mb-8">
        <Text className="txt-xlarge">
          <TranslationComponent query={collection.title} />
        </Text>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          <TranslationComponent query={"View all"} />
        </InteractiveLink>
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-6 gap-y-7 small:gap-y-10">
        {products &&
          products.slice(0, 4).map((product) => (
            <li key={product.id}>
              <ProductPreview
                productPreview={product}
                region={region}
                isFeatured
              />
            </li>
          ))}
      </ul>
    </div>
  )
}
