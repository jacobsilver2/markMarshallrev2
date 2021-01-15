import React from "react"
import { AuthService, useAuth } from "gatsby-theme-auth0"
import GenerateWaveform from "../components/uploadSong/uploadSong"

const WaveformGenerator = () => {
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
      {isLoggedIn && <GenerateWaveform />}
    </>
  )
}

export default WaveformGenerator
