import React, { useContext } from "react"
import { navigate } from "gatsby"
import Img from "gatsby-image"
import { FaPlay, FaPause, FaBackward } from "react-icons/fa"
import styles from "./songStyles.module.css"
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../../context/provider"

const Song = ({ song }) => {
  const dispatch = useContext(GlobalDispatchContext)
  // console.log(song)

  function handlePlayPause() {
    dispatch({
      type: "SET_CURRENT_TRACK",
      url: song.audio.file.url,
      title: song.title,
    })
    dispatch({
      type: "TOGGLE_PLAYING",
    })
  }

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        <h3>&#8592; Back</h3>
      </button>
      <div className={styles.card}>
        <div className={styles.title}>
          <h1>{song.title}</h1>
        </div>
        {song.composer && (
          <div className={styles.composer}>
            <b>Composer{song.composer.length > 1 ? "s" : ""}: </b>
            {song.composer.join(", ")}
          </div>
        )}
        {song.description && (
          <div className={styles.description}>
            <p>
              <b>Description: </b>
              {song.description.description}
            </p>
          </div>
        )}
        {song.tempo && (
          <div className={styles.tempo}>
            <p>
              <b>Tempo: </b>
              {song.tempo} bpm
            </p>
          </div>
        )}
        {song.instrumentation && (
          <div className={styles.instrumentation}>
            <p>
              <b>Instrumentation: </b>
              {song.instrumentation.join(", ")}
            </p>
          </div>
        )}
        {song.genre && (
          <div className={styles.genre}>
            <p>
              <b>Genre{song.genre.length > 1 ? "s" : ""}: </b>
              {song.genre.join(", ")}
            </p>
          </div>
        )}
        {song.mood && (
          <div className={styles.mood}>
            <p>
              <b>Mood{song.mood.length > 1 ? "s" : ""}: </b>
              {song.mood.join(", ")}
            </p>
          </div>
        )}
        {song.soundsLike && (
          <div className={styles.soundsLike}>
            <p>
              <b>Sounds Like: </b>
              {song.soundsLike.join(", ")}
            </p>
          </div>
        )}
        <div className={styles.buttonContainer}>
          <button
            onClick={handlePlayPause}
            type="button"
            className={styles.button}
          >
            {/* <Pause /> */}
            <FaPlay />
          </button>
          {song.waveformImage && (
            <div className={styles.waveformImage}>
              <Img
                imgStyle={{ objectFit: "contain" }}
                fluid={song.waveformImage.fluid}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Song
