import React, {
  useContext,
  useRef,
  useEffect,
  useImperativeHandle,
} from "react"
import { Link } from "gatsby"
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../../context/provider"
import Img from "gatsby-image"
import Pause from "../../assets/svg/pause"
import tempoCalc from "../../lib/tempoCalc"
// import Play from "../assets/svg/play"
// import PlayButton from "../assets/svg/PlayButton.svg"
import slugify from "../../lib/slugify"
import styles from "./songCardStyle.module.css"
import styled from "styled-components"
// import PlayComponent from "../player/playButton/PlayButton"
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
  // const ref = useRef()
  const {
    contentful_id,
    tempo,
    soundsLike,
    instrumentation,
    waveformImage,
    audio,
    title,
    description,
    composer,
    createAt,
    genre,
    mood,
  } = song

  // useEffect(() => {
  //   console.log(ref.current)
  // })

  // console.log(state.currentTime)

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

  const truncateParagraph = paragraph => {
    const arr = paragraph.split(".")
    if (arr.length > 1) {
      return arr.slice(0, 1) + "..."
    }

    return paragraph
  }

  function handlePlayPause() {
    dispatch({
      type: "SET_CURRENT_TRACK",
      url: audio.file.url,
      title,
    })
    dispatch({
      type: "TOGGLE_PLAYING",
    })
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
            {state.currentTrackUrl === audio.file.url && state.isPlaying ? (
              <FaPause />
            ) : (
              <FaPlay />
            )}
          </button>
          <div className={styles.waveform}>
            {waveformImage && (
              <div className={styles.imageWrapper}>
                <StyledImg
                  isCurrent={state.currentTrackUrl === audio.file.url}
                  width={state.currentTime}
                  src={waveformImage.fluid.src}
                />
                {state.currentTrackUrl === audio.file.url && (
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
