import React, { useContext } from "react"
import Player from "./Player"
import { GlobalStateContext } from "../context/provider"

const Footer = () => {
  const state = useContext(GlobalStateContext)
  return (
    <footer className="bg-gray-800 shadow-xl px-4 md:px-12 text-gray-200">
      <Player
        streamUrl={state.currentTrackUrl}
        trackTitle={state.currentTrackTitle}
        preloadType="auto"
      />
    </footer>
  )
}

export default Footer
