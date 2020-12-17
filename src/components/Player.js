import React, { useContext } from "react"
import { Timer, Icons } from "react-soundplayer/components"
import PlayButton from "./PlayButton"
import Progress from "./Progress"
import VolumeControl from "./VolumeControl"
import { withCustomAudio } from "react-soundplayer/addons"

const Player = withCustomAudio(props => {
  const {
    streamUrl,
    trackTitle,
    volume,
    currentTime,
    duration,
    playing,
    seeking,
    soundCloudAudio,
  } = props

  return (
    <div className="h-full col-span-2 flex justify-between items-center rounded">
      <PlayButton {...props} />
      <h2 className="">{trackTitle}</h2>
      <VolumeControl {...props} />
      <Progress {...props} />
      <Timer {...props} />
    </div>
  )
})

export default Player
