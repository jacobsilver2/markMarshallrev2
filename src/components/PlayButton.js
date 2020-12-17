import React from "react"
import { PlayIconSVG, PauseIconSVG } from "./Icons"
import "../styles/soundPlayerButton.css"

const PlayButton = props => {
  const {
    playing,
    soundCloudAudio,
    onTogglePlay,
    seekingIcon,
    seeking,
    streamUrl,
  } = props

  function handleClick(e) {
    if (!playing) {
      soundCloudAudio && soundCloudAudio.play()
    } else {
      soundCloudAudio && soundCloudAudio.pause()
    }

    onTogglePlay && onTogglePlay(e)
  }

  let iconNode

  if (seeking && seekingIcon) {
    iconNode = React.cloneElement(seekingIcon)
  } else if (playing) {
    iconNode = <PauseIconSVG />
  } else {
    iconNode = <PlayIconSVG />
  }

  return (
    <button
      className="sb-soundplayer-btn sb-soundplayer-play-btn"
      type="button"
      disabled={streamUrl ? false : true}
      onClick={handleClick}
    >
      {iconNode}
    </button>
  )
}

export default PlayButton
