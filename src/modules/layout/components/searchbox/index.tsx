"use client"

import { useRouter } from "next/navigation"
import React, { useState } from "react"

const Index = ({}) => {
  const [query, setQuery] = useState<string>()
  const router = useRouter()

  async function onSubmit(e: any) {
    e.preventDefault()
    await router.push(`/products/${query}`)
  }

  //   console.log(params)

  return (
    <div>
      <form action="" onSubmit={onSubmit}>
        <input
          type="search"
          name=""
          id=""
          className="bg-[#F7F6FB] w-[450px] h-[40px] border p-4"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  )
}

export default Index
