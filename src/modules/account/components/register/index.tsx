"use client"

import { useFormState } from "react-dom"

import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import { signUp } from "@modules/account/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useEffect, useState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(signUp, null)
  const [validationPassed, setValidationPassed] = useState(false)
  const [notEqual, setNotEqual] = useState(false)
  const [passwords, setPasswords] = useState({ original: "", confirm: "" })
  const [disabled, setDisabled] = useState(true)

  // console.log(formAction)

  useEffect(() => {
    if (passwords.confirm !== passwords.original) {
      setNotEqual(true)
    } else {
      setNotEqual(false)
    }

    if (passwords.confirm === passwords.original && validationPassed) {
      setDisabled(false)
      // console.log(disabled)
      // console.log(notEqual)
    } else {
      setDisabled(true)
      // console.log(disabled)
      // console.log(notEqual)
    }
  }, [passwords.confirm, passwords.original, validationPassed])

  const comparePasswords = async (e: any, label: string) => {
    const { value } = e.target

    // console.log(value, label)
    if (label === "Password") {
      await setPasswords({ ...passwords, original: value })
    } else if (label === "Confirm Password") {
      await setPasswords({ ...passwords, confirm: value })
    }
  }

  return (
    <div className="max-w-sm flex flex-col items-center">
      <h1 className="text-large-semi uppercase mb-6">
        Become a Debol&apos;s Store Member
      </h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-4">
        Create your Debol&apos;s Store Member profile, and get access to an
        enhanced shopping experience.
      </p>
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-2 relative">
          <Input
            label="First name"
            name="first_name"
            required
            autoComplete="given-name"
            component={"register"}
          />
          <Input
            label="Last name"
            name="last_name"
            required
            autoComplete="family-name"
            component={"register"}
          />
          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            component={"register"}
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            component={"register"}
          />
          <Input
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            component={"register"}
            passValidation={setValidationPassed}
            confirmPassword={comparePasswords}
          />
          <Input
            label="Confirm Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            component={"register"}
            confirmPassword={comparePasswords}
          />
          {notEqual && (
            <div className="absolute bottom-[-1.5em] text-red-600 z-[100001] text-sm">
              Passwords do not match!
            </div>
          )}
        </div>
        <ErrorMessage error={message} />
        <span className="text-center text-ui-fg-base text-small-regular mt-6">
          By creating an account, you agree to Debol&apos;s Store&apos;s
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline"
          >
            {" "}
            Privacy Policy
          </LocalizedClientLink>
          and{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline"
          >
            Terms of Use
          </LocalizedClientLink>
          .
        </span>
        <SubmitButton className="w-full mt-6" disabled={disabled}>
          Join
        </SubmitButton>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Already a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Sign in
        </button>
        .
      </span>
    </div>
  )
}

export default Register
