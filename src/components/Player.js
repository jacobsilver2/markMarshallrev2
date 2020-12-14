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
    <div className="p-2 border mt-1 mb-3 flex justify-center rounded">
      <PlayButton {...props} />
      <div className="flex-auto">
        <h2 className="flex-no-wrap capitalize m-0">{trackTitle}</h2>
        <div className="flex justify-center">
          <VolumeControl {...props} />
          <Progress {...props} />
          <Timer {...props} />
        </div>
      </div>
    </div>
  )
})

export default Player
