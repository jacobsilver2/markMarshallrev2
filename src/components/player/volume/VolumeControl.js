import React, { useState, useEffect } from "react"
import { useAudioPlayer } from "react-use-audio-player"
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa"
import volumeStyles from "./soundPlayerVolume.module.css"

const VolumeControl = () => {
  const { mute } = useAudioPlayer()
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    mute(muted)
  }, [muted, mute])

  return (
    <div className={volumeStyles.volume}>
      <button
        className={`${volumeStyles.soundplayerButton}`}
        onClick={() => setMuted(prev => !prev)}
      >
        {muted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
    </div>
  )
}

export default VolumeControl
