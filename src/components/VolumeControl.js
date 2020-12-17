import React from "react"
import { VolumeIconLoudSVG, VolumeIconMuteSVG } from "./Icons"
import "../styles/soundPlayerVolume.css"
import "../styles/soundPlayerButton.css"

const VolumeControl = props => {
  const {
    onVolumeChange,
    onToggleMute,
    soundCloudAudio,
    isMuted,
    volume,
  } = props

  function handleVolumeChange(e) {
    const xPos = e.target.value / 100
    const mute = xPos <= 0 && !isMuted

    if (soundCloudAudio && !isNaN(soundCloudAudio.audio.volume)) {
      soundCloudAudio.audio.volume = xPos
      soundCloudAudio.audio.muted = mute
    }

    if (mute !== isMuted) {
      onToggleMute && onToggleMute.call(this, mute, e)
    }

    onVolumeChange && onVolumeChange.call(this, xPos, e)
  }

  function handleMute(e) {
    if (soundCloudAudio && !isNaN(soundCloudAudio.audio.muted)) {
      soundCloudAudio.audio.muted = !soundCloudAudio.audio.muted
    }

    onToggleMute && onToggleMute.call(this, !this.props.isMuted, e)
  }

  let value = volume * 100 || 0

  if (value < 0 || isMuted) {
    value = 0
  }

  if (value > 100) {
    value = 100
  }

  return (
    <div className="sb-soundplayer-volume">
      <button
        onClick={handleMute}
        className="sb-soundplayer-btn sb-soundplayer-volume-btn"
      >
        {isMuted ? <VolumeIconMuteSVG /> : <VolumeIconLoudSVG />}
      </button>
      <div>
        <input
          className="sb-soundplayer-volume-range"
          type="range"
          min="0"
          max="100"
          step="1"
          value={value}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  )
}

export default VolumeControl
