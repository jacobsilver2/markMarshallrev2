import React from "react"
import { navigate } from "gatsby"
import { AuthService, useAuth } from "gatsby-theme-auth0"

const LoginPage = () => {
  const { isLoggedIn } = useAuth()
  return (
    <>
      {isLoggedIn ? (
        navigate("/")
      ) : (
        <button type="button" onClick={AuthService.login}>
          Login
        </button>
      )}
    </>
  )
}

export default LoginPage
