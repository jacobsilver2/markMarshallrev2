import React from "react"
import { AuthService, useAuth } from "gatsby-theme-auth0"

const DashboardPage = () => {
  const { isLoggedIn } = useAuth()
  return (
    <>
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
    </>
  )
}

export default DashboardPage
