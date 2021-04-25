import React, { useContext, useEffect, useState } from "react"
import { navigate } from "gatsby"
import styled from "styled-components"
import { FaPlay, FaPause } from "react-icons/fa"
import { useAudioPlayer, useAudioPosition } from "react-use-audio-player"
import styles from "./songStyles.module.css"
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../../context/provider"

const StyledImg = styled.img`
  position: relative;
  height: 100%;
  width: 100%;
`

const ProgressBar = styled.div`
  background: var(--highlight);
  opacity: 75%;
  border-radius: 2px;
  position: absolute;
  height: 100%;
  width: 5px;
  bottom: 0;
  left: ${props => props.position};
`

const Song = ({ song }) => {
  const [barWidth, setBarWidth] = useState("0%")
  const { playing, togglePlayPause } = useAudioPlayer()
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)
  const { percentComplete } = useAudioPosition({
    highRefreshRate: true,
  })
  useEffect(() => {
    setBarWidth(`${percentComplete}%`)
  }, [percentComplete])

  function handlePlayPause() {
    if (state.currentTrackUrl !== song.audio.file.url) {
      dispatch({
        type: "SET_CURRENT_TRACK",
        url: song.audio.file.url,
        title: song.title,
      })
    }
    if (
      state.currentTrackUrl &&
      state.currentTrackUrl === song.audio.file.url
    ) {
      togglePlayPause()
    }
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
            <b className={styles.subject}>
              Composer{song.composer.length > 1 ? "s" : ""}:{" "}
            </b>
            {song.composer.join(", ")}
          </div>
        )}
        {song.description && (
          <div className={styles.description}>
            <p>
              <b className={styles.subject}>Description: </b>
              {song.description.description}
            </p>
          </div>
        )}
        {song.tempo && (
          <div className={styles.tempo}>
            <p>
              <b className={styles.subject}>Tempo: </b>
              {song.tempo} bpm
            </p>
          </div>
        )}
        {song.instrumentation && (
          <div className={styles.instrumentation}>
            <p>
              <b className={styles.subject}>Instrumentation: </b>
              {song.instrumentation.join(", ")}
            </p>
          </div>
        )}
        {song.genre && (
          <div className={styles.genre}>
            <p>
              <b className={styles.subject}>
                Genre{song.genre.length > 1 ? "s" : ""}:{" "}
              </b>
              {song.genre.join(", ")}
            </p>
          </div>
        )}
        {song.mood && (
          <div className={styles.mood}>
            <p>
              <b className={styles.subject}>
                Mood{song.mood.length > 1 ? "s" : ""}:{" "}
              </b>
              {song.mood.join(", ")}
            </p>
          </div>
        )}
        {song.soundsLike && (
          <div className={styles.soundsLike}>
            <p>
              <b className={styles.subject}>Sounds Like: </b>
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
            {state.currentTrackUrl === song.audio.file.url && playing ? (
              <FaPause />
            ) : (
              <FaPlay />
            )}
          </button>
          {song.waveformImage && (
            <div className={styles.waveformImage}>
              <div className={styles.imageWrapper}>
                <StyledImg
                  isCurrent={state.currentTrackUrl === song.audio.file.url}
                  width={barWidth}
                  src={song.waveformImage.fluid.src}
                />
                {state.currentTrackUrl &&
                  state.currentTrackUrl === song.audio.file.url && (
                    <ProgressBar position={barWidth} />
                  )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Song
