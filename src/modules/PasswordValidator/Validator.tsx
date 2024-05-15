import React, { useState } from "react"

const PasswordValidation = () => {
  const [password, setPassword] = useState("")
  const [isValid, setIsValid] = useState(false)

  const handleChange = (e: any) => {
    setPassword(e.target.value)
    validatePassword(e.target.value)
  }

  const validatePassword = (value: string) => {
    // Define your password requirements here
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(value)
    const hasLowerCase = /[a-z]/.test(value)
    const hasNumber = /\d/.test(value)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value)

    setIsValid(
      value.length >= minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumber &&
        hasSpecialChar
    )
  }

  return (
    <div>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={handleChange}
      />
      {!isValid && (
        <div style={{ color: "red" }}>
          <p>Password must:</p>
          <ul>
            <li>Be at least 8 characters long</li>
            <li>Contain at least one uppercase letter</li>
            <li>Contain at least one lowercase letter</li>
            <li>Contain at least one number</li>
            <li>Contain at least one special character</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default PasswordValidation
