import React, { useCallback, useState, useEffect } from "react"
import { useAudioPlayer } from "react-use-audio-player"
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa"
import volumeStyles from "./soundPlayerVolume.module.css"

const VolumeControl = () => {
  const { volume, mute } = useAudioPlayer()
  const [muted, setMuted] = useState(false)

  const handleChange = useCallback(
    slider => {
      const volValue = parseFloat(
        (Number(slider.target.value) / 100).toFixed(2)
      )
      return volume(volValue)
    },
    [volume]
  )

  useEffect(() => {
    mute(muted)
  }, [muted, mute])

  return (
    <div className={volumeStyles.volume}>
      <button
        className={`${volumeStyles.soundplayerButton} ${volumeStyles.volumeRange}`}
        onClick={() => setMuted(prev => !prev)}
      >
        {muted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
      <div className={volumeStyles.inputContainer}>
        <input
          className={volumeStyles.volumeControl__icon}
          type="range"
          min={0}
          max={100}
          step={1}
          onChange={handleChange}
          defaultValue={100}
        />
      </div>
    </div>
  )
}

export default VolumeControl
