import React, { useContext, useEffect } from "react"
import Player from "../player/Player"
import { GlobalStateContext } from "../../context/provider"
import styles from "./footerStyle.module.css"

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
