import React from "react"
import { AuthService, useAuth } from "gatsby-theme-auth0"

const DashboardPage = () => {
  const { isLoggedIn } = useAuth()
  return (
    <>
      {isLoggedIn ? (
        ""
      ) : (
        <button type="button" onClick={AuthService.login}>
          Login
        </button>
      )}
    </>
  )
}

export default DashboardPage
