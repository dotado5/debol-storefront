// import { instantMeiliSearch } from "@meilisearch/instant-meilisearch"

// const endpoint =
//   process.env.NEXT_PUBLIC_SEARCH_ENDPOINT || "https://ms-d6ea248bf727-9074.lon.meilisearch.io"

// const apiKey = process.env.NEXT_PUBLIC_SEARCH_API_KEY || "7e23e38d919c5d45b7a92928f7d324e01b9e28ab88da6e3851afe17373de9719"

// export const searchClient = instantMeiliSearch(endpoint, apiKey)

// export const SEARCH_INDEX_NAME =
//   process.env.NEXT_PUBLIC_INDEX_NAME || "products"


import algoliasearch from "algoliasearch/lite"

const appId = process.env.NEXT_PUBLIC_SEARCH_APP_ID || "XW9MAXN0ZF"

const apiKey = process.env.NEXT_PUBLIC_SEARCH_API_KEY || "dc457a4dcf89bcabd831456b1322a759"

export const searchClient = algoliasearch(appId, apiKey)

export const SEARCH_INDEX_NAME =
  process.env.NEXT_PUBLIC_INDEX_NAME || "products"


// If you want to use Algolia instead then uncomment the following lines, and delete the above lines
// you should also install algoliasearch - yarn add algoliasearch

// import algoliasearch from "algoliasearch/lite"

// const appId = process.env.NEXT_PUBLIC_SEARCH_APP_ID || "test_app_id"

// const apiKey = process.env.NEXT_PUBLIC_SEARCH_API_KEY || "test_key"

// export const searchClient = algoliasearch(appId, apiKey)

// export const SEARCH_INDEX_NAME =
//   process.env.NEXT_PUBLIC_INDEX_NAME || "products"
