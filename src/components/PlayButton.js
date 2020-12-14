import React from "react"
import { PlayIconSVG, PauseIconSVG } from "./Icons"

const PlayButton = props => {
  const { playing, soundCloudAudio, onTogglePlay, seekingIcon, seeking } = props

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
      className="flex-none text-white-100 mr-2 outline-white ease-in-out bg-orange-400 w-8 h-8 relative align-middle"
      type="button"
      onClick={handleClick}
    >
      {iconNode}
    </button>
  )
}

export default PlayButton
