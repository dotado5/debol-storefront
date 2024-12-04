import { useFormState } from "react-dom"

import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Input from "@modules/common/components/input"
import {
  logCustomerIn,
  logCustomerInByGoogleAuth,
} from "@modules/account/actions"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { useState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const clientId =
  "44428971545-rh81erp247fo3p3dali2c052p0psu77l.apps.googleusercontent.com"

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(logCustomerIn, null)
  const [userEmail, setUserEmail] = useState<string>()
  const [news, googleFormAction] = useFormState(logCustomerInByGoogleAuth, null)

  const onFailure = (response: any) => {
    console.log("Google login failure", response)
  }
  const onSuccess = (response: any) => {
    console.log("Google login success", response)
  }

  function googleLogin(email: string) {
    googleFormAction(email)
    console.log(news)
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
      {/* <p className="my-[2em]">OR</p>
      <a
        type="button"
        href={`http://localhost:9000/admin/auth/google?returnAccessToken=true`}
        className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
      >
        <svg
          className="mr-2 -ml-1 w-4 h-4"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
        Sign in with Google
      </a> */}

      {/* <GoogleLogin
        clientId="44428971545-rh81erp247fo3p3dali2c052p0psu77l.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        className="font-bold text-black"
      /> */}
      {/* <GoogleLogin
        onSuccess={(credentialResponse) => {
          const responseDecoded = jwtDecode(
            credentialResponse.credential ? credentialResponse.credential : ""
          )
          // console.log(responseDecoded.email)
          googleLogin(responseDecoded.email)
        }}
        onError={() => {
          console.log("Login Failed")
        }}
      /> */}

      <ErrorMessage error={news} />

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
