import React, { useContext } from "react"
import Loader from "react-loader-spinner"
import { GlobalStateContext } from "../../context/provider"
import { useAudioPlayer } from "react-use-audio-player"
import PlayButton from "./playButton/PlayButton"
import Progress from "./progress/progress"
import Timer from "./timer/timer"
import VolumeControl from "./volume/VolumeControl"
import styles from "./playerStyle.module.css"

const Player = () => {
  const state = useContext(GlobalStateContext)

  const { togglePlayPause, loading, playing } = useAudioPlayer({
    autoplay: true,
    src: state.currentTrackUrl,
    html5: true,
    format: ["mp3"],
  })

  return (
    <div className={styles.container}>
      {loading && state.currentTrackUrl ? (
        <Loader type="Audio" color="#FFFFFF" height={30} width={30} />
      ) : (
        <div className={styles.play}>
          <PlayButton togglePlayPause={togglePlayPause} playing={playing} />
        </div>
      )}
      <div className={styles.title}>
        <h2>{state.currentTrackTitle}</h2>
      </div>
      <div className={styles.volume}>
        <VolumeControl />
      </div>
      <div className={styles.progress}>
        <Progress className="playBar__seek" />
      </div>
      <div className={styles.time}>
        <Timer />
      </div>
    </div>
  )
}

export default Player
