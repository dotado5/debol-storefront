import { useFormState } from "react-dom"

import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Input from "@modules/common/components/input"
import { logCustomerIn } from "@modules/account/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { GoogleLogin } from "react-google-login"
import { useEffect } from "react"
import { gapi } from "gapi-script"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const clientId =
  "44428971545-rh81erp247fo3p3dali2c052p0psu77l.apps.googleusercontent.com"

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(logCustomerIn, null)

  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({
  //       clientId:
  //         "44428971545-rh81erp247fo3p3dali2c052p0psu77l.apps.googleusercontent.com",
  //       scope: "",
  //     })
  //   }

  //   gapi.load("client:auth2", start)
  // }, [])

  const onFailure = (response: any) => {
    console.log("Google login failure", response)
  }
  const onSuccess = (response: any) => {
    console.log("Google login success", response)
  }

  return (
    <div className="max-w-sm w-full flex flex-col items-center">
      <h1 className="text-large-semi uppercase mb-6">Welcome back</h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-8">
        Sign in to access an enhanced shopping experience.
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            component={"login"}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            component={"login"}
          />
        </div>
        <ErrorMessage error={message} />
        <SubmitButton className="w-full mt-6">Sign in</SubmitButton>
      </form>

      <p className="my-[2em]">OR</p>
      {/* google signin */}

      <GoogleLogin
        clientId="44428971545-rh81erp247fo3p3dali2c052p0psu77l.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        className="font-bold text-black"
      />

      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Not a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
        >
          Join us
        </button>
        .
      </span>
    </div>
  )
}

export default Login
