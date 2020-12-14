import React, { useContext } from "react"
import Player from "./Player"
import { GlobalStateContext } from "../context/provider"

const Footer = () => {
  const state = useContext(GlobalStateContext)
  return (
    <footer className="bg-gray-800 shadow-xl h-16 fixed bottom-0 mt-12 z-10 w-full px-12">
      <Player
        streamUrl={state.currentTrackUrl}
        trackTitle={state.currentTrackTitle}
        preloadType="auto"
      />
    </footer>
  )
}

export default Footer
