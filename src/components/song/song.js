import React, { useContext } from "react"
import { navigate } from "gatsby"
import Img from "gatsby-image"
import { FaPlay, FaPause, FaBackward } from "react-icons/fa"
import styles from "./songStyles.module.css"
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../../context/provider"
import styled from "styled-components"

const StyledImg = styled.img`
  position: relative;
  height: 100%;
  width: 100%;
  clip-path: ${({ width, isCurrent }) =>
    isCurrent ? `inset(0 0 0 ${width}% )` : ""};
`

const StyledOverlayImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: ${({ width }) => `inset(0 ${100 - width}% 0 0 )`};
  filter: opacity(0.5) drop-shadow(0 0 0 var(--main-bg-color));
`

const Song = ({ song }) => {
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)
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
            {state.currentTrackUrl === song.audio.file.url &&
            state.isPlaying ? (
              <FaPause />
            ) : (
              <FaPlay />
            )}
          </button>
          {song.waveformImage && (
            <div className={styles.waveformImage}>
              {/* <Img
                imgStyle={{ objectFit: "contain" }}
                fluid={song.waveformImage.fluid}
              /> */}
              <div className={styles.imageWrapper}>
                <StyledImg
                  isCurrent={state.currentTrackUrl === song.audio.file.url}
                  width={state.currentTime}
                  src={song.waveformImage.fluid.src}
                />
                {state.currentTrackUrl === song.audio.file.url && (
                  <StyledOverlayImg
                    width={state.currentTime}
                    src={song.waveformImage.fluid.src}
                  />
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
