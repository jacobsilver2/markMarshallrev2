import React from "react"
import { AuthService, useAuth } from "gatsby-theme-auth0"
import UploadSong from "../components/uploadSong/uploadSong"

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
      {/* {isLoggedIn && <UploadSong />} */}
    </>
  )
}

export default DashboardPage
