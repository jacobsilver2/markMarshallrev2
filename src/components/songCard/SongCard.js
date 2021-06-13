import React, { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"
import { useAudioPlayer, useAudioPosition } from "react-use-audio-player"
import styled from "styled-components"
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../../context/provider"
import tempoCalc from "../../lib/tempoCalc"
import slugify from "../../lib/slugify"
import styles from "./songCardStyle.module.css"
import { FaPlay, FaPause } from "react-icons/fa"

const listLength = 3

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

const SongCard = ({ song }) => {
  const [barWidth, setBarWidth] = useState("0%")
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)
  const { playing, togglePlayPause } = useAudioPlayer()
  const { percentComplete } = useAudioPosition({
    highRefreshRate: true,
  })
  useEffect(() => {
    setBarWidth(`${percentComplete}%`)
  }, [percentComplete])
  const {
    tempo,
    soundsLike,
    instrumentation,
    waveformImage,
    audio,
    title,
    genre,
    mood,
  } = song

  const renderList = category => {
    const isLarge = category && category.length > listLength
    const remainingCats = isLarge && category.length - listLength
    const truncated =
      isLarge &&
      category.slice(0, listLength).join(", ") +
        ` ...and ${remainingCats} more.`
    const notTruncated = !isLarge && category.join(", ")
    return truncated || notTruncated
  }

  function handlePlayPause() {
    if (state.currentTrackUrl !== audio.file.url) {
      dispatch({
        type: "SET_CURRENT_TRACK",
        url: audio.file.url,
        title,
      })
    }
    if (state.currentTrackUrl && state.currentTrackUrl === audio.file.url) {
      togglePlayPause()
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <h3 className={styles.title}>
            <Link to={`/music/${slugify(title)}`}>{title}</Link>
          </h3>
          <ul className={styles.subtitleWrapper}>
            {genre && (
              <li className={styles.subtitle}>
                <b>
                  Genre{genre && genre.length && genre.length > 1 ? "s" : ""}:
                </b>{" "}
                {genre ? renderList(genre) : ""}
              </li>
            )}
            {tempo && (
              <li className={styles.subtitle}>
                <b>Tempo: </b> {tempo ? tempoCalc(tempo) : ""}
              </li>
            )}
            {instrumentation && (
              <li className={styles.subtitle}>
                <b>Instrumentation: </b>
                {instrumentation ? renderList(instrumentation) : ""}
              </li>
            )}
            {mood && (
              <li className={styles.subtitle}>
                <b>Mood: </b>
                {mood ? renderList(mood) : ""}
              </li>
            )}
            {soundsLike && (
              <li className={styles.subtitle}>
                <b>Sounds Like: </b>
                {soundsLike ? renderList(soundsLike) : ""}
              </li>
            )}
          </ul>
        </div>
        <div className={styles.buttonContainer}>
          <button
            onClick={handlePlayPause}
            type="button"
            className={styles.button}
          >
            {state.currentTrackUrl &&
            state.currentTrackUrl === audio.file.url &&
            playing ? (
              <FaPause />
            ) : (
              <FaPlay />
            )}
          </button>
          <div className={styles.waveform}>
            {waveformImage && (
              <div className={styles.imageWrapper}>
                <StyledImg
                  isCurrent={
                    state.currentTrackUrl &&
                    state.currentTrackUrl === audio.file.url
                  }
                  src={waveformImage.fluid.src}
                />
                {state.currentTrackUrl &&
                  state.currentTrackUrl === audio.file.url && (
                    <ProgressBar position={barWidth} />
                  )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SongCard
