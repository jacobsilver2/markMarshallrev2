import React, { useContext, useEffect, forwardRef } from "react"
// import { PlayIconSVG, PauseIconSVG } from "../icons/Icons"
import { FaPlay, FaPause } from "react-icons/fa"
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../../../context/provider"
import styles from "./soundPlayerButton.module.css"

const PlayButton = forwardRef((props, ref) => {
  const state = useContext(GlobalStateContext)
  const dispatch = useContext(GlobalDispatchContext)
  const {
    playing,
    soundCloudAudio,
    onTogglePlay,
    seekingIcon,
    seeking,
    streamUrl,
  } = props

  // if (play) {
  //   soundCloudAudio && soundCloudAudio.play()
  // }

  // if (!play) {
  //   soundCloudAudio && soundCloudAudio.pause()
  // }

  function handleClick(e) {
    if (!playing) {
      soundCloudAudio && soundCloudAudio.play()
      // dispatch({ type: "SET_ISPLAYING_TRUE" })
    } else {
      soundCloudAudio && soundCloudAudio.pause()
      // dispatch({ type: "SET_ISPLAYING_FALSE" })
    }

    onTogglePlay && onTogglePlay(e)
  }

  let iconNode

  if (seeking && seekingIcon) {
    iconNode = React.cloneElement(seekingIcon)
  } else if (playing) {
    iconNode = <FaPause />
  } else {
    iconNode = <FaPlay />
  }

  return (
    <button
      ref={ref}
      className={styles.soundplayerButton}
      type="button"
      disabled={streamUrl ? false : true}
      onClick={handleClick}
    >
      {iconNode}
    </button>
  )
})

export default PlayButton
