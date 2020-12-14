import React from "react"

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
    <div className="relative">
      <button className=""></button>
      <div className="w-8">
        <input className="" />
      </div>
    </div>
  )
}

export default VolumeControl
