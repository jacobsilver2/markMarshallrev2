import React, { useContext } from "react"
import { Link } from "gatsby"
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../../context/provider"
import tempoCalc from "../../lib/tempoCalc"
import slugify from "../../lib/slugify"
import styles from "./songCardStyle.module.css"
import styled from "styled-components"
import { FaPlay, FaPause } from "react-icons/fa"

const listLength = 3

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

const SongCard = ({ song }) => {
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)
  const {
    tempo,
    soundsLike,
    instrumentation,
    waveformImage,
    audio,
    title,
    composer,
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
    if (
      state.currentTrackUrl &&
      state.currentTrackUrl === audio.file.url &&
      state.isPlaying
    ) {
      dispatch({ type: "SET_ISPLAYING_FALSE" })
    }
    if (
      state.currentTrackUrl &&
      state.currentTrackUrl === audio.file.url &&
      !state.isPlaying
    ) {
      dispatch({ type: "SET_ISPLAYING_TRUE" })
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
            {composer && (
              <li className={styles.subtitle}>
                <b>
                  Composer
                  {composer && composer.length && composer.length > 1
                    ? "s"
                    : ""}
                  :
                </b>{" "}
                {composer && composer.join(", ")}
              </li>
            )}
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
            state.isPlaying ? (
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
                  width={state.currentTime}
                  src={waveformImage.fluid.src}
                />
                {state.currentTrackUrl &&
                  state.currentTrackUrl === audio.file.url && (
                    <StyledOverlayImg
                      width={state.currentTime}
                      src={waveformImage.fluid.src}
                    />
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
