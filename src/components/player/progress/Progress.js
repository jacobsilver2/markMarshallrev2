import React from "react"
import styles from "./progressStyle.module.css"

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
    <div onClick={handleSeekTrack} className={styles.container}>
      <div
        style={{ width: `${value ? value : 0}%` }}
        className={styles.progress}
      ></div>
    </div>
  )
}

export default Progress
