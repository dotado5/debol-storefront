import { Label } from "@medusajs/ui"
import React, { useEffect, useImperativeHandle, useState } from "react"

import Eye from "@modules/common/icons/eye"
import EyeOff from "@modules/common/icons/eye-off"
import { IoMdCheckmark } from "react-icons/io"
import { FaXmark } from "react-icons/fa6"

type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
  "placeholder"
> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  topLabel?: string
  component: string
  passValidation?: (pass: boolean) => void
  confirmPassword?: (e: any, label: string) => void
  hasTalinn?: (pass: boolean) => void
}
// changePassword
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      name,
      label,
      touched,
      required,
      topLabel,
      component,
      passValidation,
      confirmPassword,
      hasTalinn,
      ...props
    },
    ref
  ) => {
    const [passRequirements, setPassRequirements] = useState({
      minLength: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasNumber: false,
      hasSpecialChar: false,
    })
    const [isValid, setIsValid] = useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)
    const [validation, setValidation] = useState(false)
    const [estoniaAddress, setEstonia] = useState(true)

    useEffect(() => {
      if (type === "password" && showPassword) {
        setInputType("text")
      }

      if (type === "password" && !showPassword) {
        setInputType("password")
      }
    }, [type, showPassword])

    useImperativeHandle(ref, () => inputRef.current!)

    const validatePassword = async (e: any) => {
      if (confirmPassword) {
        confirmPassword(e, label)
      }
      // Define your password requirements here

      if (component === "register" && label === "Password") {
        let value: string = await e.target.value

        const minLength = 8
        const hasUpperCase = /[A-Z]/.test(value)
        const hasLowerCase = /[a-z]/.test(value)
        const hasNumber = /[0-9]/.test(value)
        const hasSpecialChar = /[!@#$%^&*.,]/.test(value)

        await setPassRequirements({
          ...passRequirements,
          minLength: value.length >= minLength,
          hasUpperCase: hasUpperCase,
          hasLowerCase: hasLowerCase,
          hasNumber: hasNumber,
          hasSpecialChar: hasSpecialChar,
        })

        await setIsValid(
          value.length >= minLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasNumber &&
            hasSpecialChar
        )

        if (passValidation) {
          passValidation(
            value.length >= minLength &&
              hasUpperCase &&
              hasLowerCase &&
              hasNumber &&
              hasSpecialChar
          )
        }
      }

      // if (label === "Confirm Password") {
      //   comparePasswords(e.target.value)
      // }
    }

    function passwordWarning() {
      if (label === "Password" && component === "register") {
        setValidation(!validation)
      }
    }

    function checkInput(event: any, type: string) {
      // console.log("typed", event.target.value)

      const maxLength = event.target.maxLength

      if (type === "number") {
        event.target.value = event.target.value.replace(/[^0-9]/g, "")
        // If the length of the input value exceeds the maximum length
        if (event.target.value.length > maxLength) {
          // Truncate the input value to the maximum length
          event.target.value = event.target.value.slice(0, maxLength)
        }
      }

      if (type === "text") {
        if (
          label === "First name" ||
          label === "Last name" ||
          label === "City"
        ) {
          console.log("here", label)
          event.target.value = event.target.value.replace(/[^a-zA-Z]/g, "")
        }
      }

      if (type === "tel") {
        event.target.value = event.target.value.replace(/[^0-9+]/g, "")
        if (event.target.value.length > maxLength) {
          // Truncate the input value to the maximum length
          event.target.value = event.target.value.slice(0, maxLength)
        }
      }

      // if
    }

    return (
      <div className={`${!estoniaAddress && "relative"} flex flex-col w-full`}>
        {topLabel && (
          <Label className="mb-2 txt-compact-medium-plus">{topLabel}</Label>
        )}

        {validation && (
          <div className="password-popup w-[400px] mt-[-3em]">
            <p className="font-bold">Password must contain:</p>
            <ul>
              <li className="flex items-center gap-2">
                {passRequirements.minLength ? (
                  <IoMdCheckmark className="text-green-600" />
                ) : (
                  <FaXmark className="text-red-600" />
                )}
                <p>Minimum of 8 characters</p>
              </li>
              <li className="flex items-center gap-2 ">
                {passRequirements.hasUpperCase ? (
                  <IoMdCheckmark className="text-green-600" />
                ) : (
                  <FaXmark className="text-red-600" />
                )}
                <p>At least an uppercase character</p>
              </li>
              <li className="flex items-center gap-2 ">
                {passRequirements.hasLowerCase ? (
                  <IoMdCheckmark className="text-green-600" />
                ) : (
                  <FaXmark className="text-red-600" />
                )}
                <p>At least a lowercase character</p>
              </li>
              <li className="flex items-center gap-2 ">
                {passRequirements.hasNumber ? (
                  <IoMdCheckmark className="text-green-600" />
                ) : (
                  <FaXmark className="text-red-600" />
                )}
                <p>At least one digit</p>
              </li>
              <li className="flex items-center gap-2 ">
                {passRequirements.hasSpecialChar ? (
                  <IoMdCheckmark className="text-green-600" />
                ) : (
                  <FaXmark className="text-red-600" />
                )}
                <p>At least one special character from [!@#$%^&*.,]</p>
              </li>
            </ul>
          </div>
        )}
        <div className="flex relative z-0 w-full txt-compact-medium">
          {inputType === "number" ? (
            <input
              type={inputType}
              name={name}
              placeholder=" "
              required={required}
              className="pt-4 pb-1 block w-full h-11 px-4 mt-0 bg-ui-bg-field border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover"
              ref={inputRef}
              onChange={(e) => checkInput(e, "number")}
              minLength={1}
              maxLength={5}
              // {...props}
            />
          ) : inputType === "password" ? (
            <input
              type={inputType}
              name={name}
              placeholder=" "
              required={required}
              className="pt-4 pb-1 block w-full h-11 px-4 mt-0 bg-ui-bg-field border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover"
              ref={inputRef}
              onChange={validatePassword}
              onFocus={passwordWarning}
              onBlur={passwordWarning}
              // {...props}
            />
          ) : inputType === "text" ? (
            name === "shipping_address.address_1" ? (
              <input
                type={inputType}
                name={name}
                placeholder=""
                required={required}
                className="pt-4 pb-1 block w-full h-11 px-4 mt-0 bg-ui-bg-field border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover"
                // {...props}
                ref={inputRef}
              />
            ) : (
              <input
                type={inputType}
                name={name}
                placeholder=" "
                required={required}
                className="pt-4 pb-1 block w-full h-11 px-4 mt-0 bg-ui-bg-field border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover"
                // {...props}
                ref={inputRef}
                onChange={(e) => checkInput(e, "text")}
              />
            )
          ) : inputType === "tel" ? (
            <input
              type={inputType}
              name={name}
              placeholder=" "
              required={required}
              className="pt-4 pb-1 block w-full h-11 px-4 mt-0 bg-ui-bg-field border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover"
              // {...props}
              ref={inputRef}
              onChange={(e) => checkInput(e, "tel")}
              minLength={8}
              maxLength={8}
            />
          ) : inputType === "email" ? (
            <input
              type={inputType}
              name={name}
              placeholder=" "
              required={required}
              className="pt-4 pb-1 block w-full h-11 px-4 mt-0 bg-ui-bg-field border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover"
              {...props}
              ref={inputRef}
              style={{ textTransform: "lowercase" }}
            />
          ) : (
            <input
              type={inputType}
              name={name}
              placeholder=" "
              required={required}
              className="pt-4 pb-1 block w-full h-11 px-4 mt-0 bg-ui-bg-field border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover"
              {...props}
              ref={inputRef}
            />
          )}
          <label
            htmlFor={name}
            onClick={() => inputRef.current?.focus()}
            className="flex items-center justify-center mx-3 px-1 transition-all absolute duration-300 top-3 -z-1 origin-0 text-ui-fg-subtle"
          >
            {label}
            {required && <span className="text-rose-500">*</span>}
          </label>
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-ui-fg-subtle px-4 focus:outline-none transition-all duration-150 outline-none focus:text-ui-fg-base absolute right-0 top-3"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
