import React from "react"
import { AuthService, useAuth } from "gatsby-theme-auth0"
import Layout from "../components/layout"

const DashboardPage = () => {
  const { isLoggedIn } = useAuth()
  return (
    <Layout>
      {isLoggedIn ? (
        <button type="button" onClick={AuthService.logout}>
          Logout
        </button>
      ) : (
        <button type="button" onClick={AuthService.login}>
          Login
        </button>
      )}
      {isLoggedIn && <h1>Whats up from the dashboard.</h1>}
    </Layout>
  )
}

export default DashboardPage
