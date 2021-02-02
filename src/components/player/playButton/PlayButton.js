import React, { useContext } from "react"
import { FaPlay, FaPause } from "react-icons/fa"
import { GlobalStateContext } from "../../../context/provider"
import styles from "./soundPlayerButton.module.css"

const PlayButton = props => {
  const state = useContext(GlobalStateContext)

  const iconNode = props.playing ? <FaPause /> : <FaPlay />
  return (
    <button
      className={styles.soundplayerButton}
      type="button"
      disabled={state.currentTrackUrl ? false : true}
      onClick={props.togglePlayPause}
    >
      {iconNode}
    </button>
  )
}

export default PlayButton
