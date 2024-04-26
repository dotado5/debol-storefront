import { EllipseMiniSolid } from "@medusajs/icons"
import { Label, RadioGroup, Text, clx } from "@medusajs/ui"
import ChevronDown from "@modules/common/icons/chevron-down"
import { ChangeEvent } from "react"
import LocalizedClientLink from "../localized-client-link"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
}: FilterRadioGroupProps) => {
  return (
    <div className="flex gap-x-3 flex-col gap-y-3">
      <LocalizedClientLink
        href="/"
        className="text-small-semi text-ui-fg-base flex items-center gap-x-2 uppercase flex-1 basis-0 ml-[-3em]"
      >
        <ChevronDown className="rotate-90" size={16} />
        <span className="mt-px hidden small:block txt-compact-plus text-ui-fg-subtle hover:text-ui-fg-base ">
          Back
        </span>
        <span className="mt-px block small:hidden txt-compact-plus text-ui-fg-subtle hover:text-ui-fg-base">
          Back
        </span>
      </LocalizedClientLink>
      <Text className="txt-compact-small-plus text-ui-fg-muted">{title}</Text>
      <RadioGroup>
        {items?.map((i) => (
          <div
            key={i.value}
            className={clx("flex gap-x-2 items-center", {
              "ml-[-1.75rem]": i.value === value,
            })}
          >
            {i.value === value && <EllipseMiniSolid />}
            <RadioGroup.Item
              checked={i.value === value}
              onClick={(e) =>
                handleChange(
                  e as unknown as ChangeEvent<HTMLButtonElement>,
                  i.value
                )
              }
              className="hidden peer"
              id={i.value}
              value={i.value}
            />
            <Label
              htmlFor={i.value}
              className={clx(
                "!txt-compact-small !transform-none text-ui-fg-subtle hover:cursor-pointer",
                {
                  "text-ui-fg-base": i.value === value,
                }
              )}
            >
              {i.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup
