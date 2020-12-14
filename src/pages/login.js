import React from "react"
import { navigate } from "gatsby"
import { AuthService, useAuth } from "gatsby-theme-auth0"
import Layout from "../components/layout"

const LoginPage = () => {
  const { isLoggedIn } = useAuth()
  return (
    <Layout>
      {isLoggedIn ? (
        navigate("/")
      ) : (
        <button type="button" onClick={AuthService.login}>
          Login
        </button>
      )}
    </Layout>
  )
}

export default LoginPage
