import React from "react"

interface SubCategoryProps {
  name: string
  subCategories?: string[]
}

const SubCategory: React.FC<SubCategoryProps> = ({ name, subCategories }) => {
  return (
    <div>
      <h3 className="w-[300px] text-xl border-b border-b-black pb-1 mb-[20px]">
        {name}
      </h3>
      <ul>
        {subCategories &&
          subCategories.map((item, index) => (
            <li key={index} className="text-base m-3 items">
              {item}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default SubCategory
