import React, { useEffect, useContext, useState } from "react"
import Loader from "react-loader-spinner"
import { withCustomAudio } from "react-soundplayer/addons"
import { Timer } from "react-soundplayer/components"
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../../context/provider"
import PlayButton from "./playButton/PlayButton"
import Progress from "./progress/Progress"
import VolumeControl from "./volume/VolumeControl"
import styles from "./playerStyle.module.css"

const Player = withCustomAudio(props => {
  const state = useContext(GlobalStateContext)
  const dispatch = useContext(GlobalDispatchContext)
  const [loading, setLoading] = useState(false)

  const {
    streamUrl,
    trackTitle,
    currentTime,
    duration,
    playing,
    soundCloudAudio,
  } = props

  useEffect(() => {
    if (!streamUrl) {
      return
    }
    setLoading(true)
    if (!playing) {
      soundCloudAudio.on("canplay", () => {
        setLoading(false)
      })
      setTimeout(() => {
        soundCloudAudio.play({ streamUrl })
        dispatch({ type: "SET_ISPLAYING_TRUE" })
      }, 100)
      return
    }
    soundCloudAudio.play()
  }, [streamUrl])

  useEffect(() => {
    if (!state.isPlaying) {
      soundCloudAudio.pause()
    }
    if (state.isPlaying) {
      soundCloudAudio.play()
    }
  }, [state.isPlaying])

  useEffect(() => {
    dispatch({
      type: "SET_CURRENT_TRACK_POSITION",
      currentTime: (currentTime / duration) * 100,
    })
  }, [currentTime])

  return (
    <div className={styles.container}>
      {loading ? (
        <Loader type="Audio" color="#FFFFFF" height={30} width={30} />
      ) : (
        <div className={styles.play}>
          <PlayButton {...props} />
        </div>
      )}
      <div className={styles.title}>
        <h2>{trackTitle}</h2>
      </div>
      <div className={styles.volume}>
        <VolumeControl {...props} />
      </div>
      <div className={styles.progress}>
        <Progress {...props} />
      </div>
      <div className={styles.time}>
        <Timer {...props} />
      </div>
    </div>
  )
})

export default Player
