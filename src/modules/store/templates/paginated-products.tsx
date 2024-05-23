import {
  getCollectionsList,
  getProductsList,
  getProductsListWithSort,
  getRegion,
} from "@lib/data"
import { Product } from "@medusajs/medusa"
import { Text } from "@medusajs/ui"
import TranslationComponent from "@modules/Translator/component/translation"
import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { cache } from "react"
import { ProductCollectionWithPreviews } from "types/global"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
}

const getCollectionsWithProducts = cache(
  async (
    countryCode: string,
    page?: number,
    sortBy?: SortOptions
  ): Promise<ProductCollectionWithPreviews[] | null> => {
    const { collections } = await getCollectionsList()

    if (!collections) {
      return null
    }

    const collectionIds = collections.map((collection) => collection.id)

    await Promise.all(
      collectionIds.map((id) =>
        getProductsListWithSort({
          page: page,
          queryParams: { collection_id: [id] },
          countryCode,
          sortBy: sortBy,
        })
      )
    ).then((responses) =>
      responses.forEach(({ response, queryParams }) => {
        let collection

        if (collections) {
          collection = collections.find(
            (collection) => collection.id === queryParams?.collection_id?.[0]
          )
        }

        if (!collection) {
          return
        }

        collection.products = response.products as unknown as Product[]
      })
    )

    return collections as unknown as ProductCollectionWithPreviews[]
  }
)

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
  store,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  store: boolean
}) {
  const region = await getRegion(countryCode)

  // console.log(region)

  if (!region) {
    return null
  }

  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  const {
    response: { products, count },
  } = await getProductsListWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  const collectionResponse = await getCollectionsWithProducts(
    countryCode,
    page,
    sortBy
  )

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  // console.log(collectionResponse)

  return (
    <>
      {/* render this if paginated product is called in the All products page */}
      {store &&
        collectionResponse?.map((collection, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex justify-between mb-4 mt-6">
              <Text className="txt-xlarge">{collection.title}</Text>
              <InteractiveLink href={`/collections/${collection.handle}`}>
                <TranslationComponent query={"View all"} />
              </InteractiveLink>
            </div>
            <ul className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
              {collection.products.map((p) => {
                return (
                  <li key={p.id}>
                    <ProductPreview productPreview={p} region={region} />
                  </li>
                )
              })}
            </ul>
          </div>
        ))}

      {/* Render this if it is called in another page */}
      {!store && (
        <ul className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
          {products.map((p) => {
            return (
              <li key={p.id}>
                <ProductPreview productPreview={p} region={region} />
              </li>
            )
          })}
        </ul>
      )}
      {!store && totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} />
      )}
    </>
  )
}
