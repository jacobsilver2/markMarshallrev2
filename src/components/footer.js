import React, { useContext } from "react"
import Player from "./Player"
import { GlobalStateContext } from "../context/provider"
import styles from "../styles/footerStyle.module.css"

const Footer = () => {
  const state = useContext(GlobalStateContext)
  return (
    <footer className={styles.container}>
      <Player
        streamUrl={state.currentTrackUrl}
        trackTitle={state.currentTrackTitle}
        preloadType="auto"
      />
    </footer>
  )
}

export default Footer
