import React from "react"

const Progress = props => {
  const { onSeekTrack, soundCloudAudio, currentTime, duration } = props
  let { value } = props
  function handleSeekTrack(e) {
    const xPos =
      (e.pageX - e.currentTarget.getBoundingClientRect().left) /
      e.currentTarget.offsetWidth
    if (soundCloudAudio && !isNaN(soundCloudAudio.audio.duration)) {
      soundCloudAudio.audio.currentTime = xPos * soundCloudAudio.audio.duration
    }
    onSeekTrack && onSeekTrack.call(this, xPos, e)
  }

  if (!value && currentTime && duration) {
    value = (currentTime / duration) * 100 || 0
  }
  if (value < 0) {
    value = 0
  }
  if (value > 100) {
    value = 100
  }

  return (
    <div
      onClick={handleSeekTrack}
      className="bg-white-100 w-1/2 h-4 cursor-pointer overflow-hidden my-1 border rounded"
    >
      <div
        className="bg-yellow-50 h-full rounded-l"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  )
}

export default Progress
