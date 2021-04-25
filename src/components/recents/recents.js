import React, { useContext, useState } from "react"
import BackgroundImage from "gatsby-background-image"
import styles from "./recentsStyles.module.css"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../context/provider"
import styled from "styled-components"
import { FaPlay, FaPause } from "react-icons/fa"
import renderList from "../../lib/renderList"
import tempoCalc from "../../lib/tempoCalc"


//! using styled components for this task, so hovering over the container will
//! only blur the background  and not the text
const StyledItem = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  font-size: 0.75em;
`

const StyledBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  /* ${StyledItem}:hover & {
    filter: blur(8px);
  } */
`

const StyledButton = styled.button`
  position: relative;
  width: 100%;
  font-size: var(--normal);
  opacity: 75%;
  align-self: flex-start;
  text-align: left;
  padding: 0.5em;
  background: black;
  @media (max-width: 1090px) {
    font-size: var(--smallish);
    padding: 1em;
  }
`

const Recents = ({ model, items }) => {
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)
  const [playlistClickedToggle, setPlaylistClickedToggle] = useState(false)
  const [clickedPlaylist, setClickedPlaylist] = useState({})
  function handlePlayPause(url, title) {
    dispatch({
      type: "SET_CURRENT_TRACK",
      url,
      title,
    })
  }

  function handlePlaylistClick(item) {
    setPlaylistClickedToggle(!playlistClickedToggle)
    setClickedPlaylist(item)
  }

  function renderSongsDataGrid(stuff) {
    return stuff.map(item => (
      <div
        key={item.contentful_id}
        onClick={() => handlePlayPause(item.audio.file.url, item.title)}
        className={styles.recentSongRow}
      >
        <div className={styles.buttonAndTitle}>
          {state.currentTrackUrl &&
          item.audio &&
          state.currentTrackUrl === item.audio.file.url ? (
            <div className={styles.buttonContainer}>
              <FaPause />
            </div>
          ) : (
            <div className={styles.buttonContainer}>
              <FaPlay />
            </div>
          )}
          <p>{item.title}</p>
        </div>
        <div>
          <p>{item.tempo ? tempoCalc(item.tempo) : ""}</p>
        </div>
        <div>
          <p>{item.genre ? renderList(item.genre, false) : ""}</p>
        </div>
        <div>
          <p>{item.mood ? renderList(item.mood, false) : ""}</p>
        </div>
        <div>
          <p>
            {item.instrumentation
              ? renderList(item.instrumentation, false)
              : ""}
          </p>
        </div>
      </div>
    ))
  }

  function renderPlaylistTiles(stuff) {
    if (model === "playlists") {
      return stuff.map(item => (
        <BackgroundImage
          key={item.contentful_id}
          onClick={() => handlePlaylistClick(item)}
          fluid={item.image && item.image.fluid ? item.image.fluid : null}
          className={styles.playlistBackground}
        >
          <StyledItem >
            <StyledButton onClick={() => handlePlaylistClick(item)}>
              <h1>{item.title}</h1>
            </StyledButton>
          </StyledItem>
        </BackgroundImage>
      ))
    }
  }

  return (
    <>
      {model === "songs" && (
        <div className={styles.recentSongsContainer}>
          <div className={styles.title}>RECENT {model.toUpperCase()}</div>
          <div className={styles.songsContainer}>
            <div className={styles.recentSongColumnTitle}>
              <div>
                <h1 className={styles.category}>TITLE</h1>
              </div>
              <div>TEMPO</div>
              <div>GENRES</div>
              <div>MOODS</div>
              <div>INSTRUMENTATION</div>
            </div>
            {renderSongsDataGrid(items.nodes)}
          </div>
        </div>
      )}

      {model === "playlists" && !playlistClickedToggle && (
        <div className={styles.recentSongsContainer}>
          <h1 className={styles.title}>RECENT {model.toUpperCase()}</h1>
          <div className={styles.items}>{renderPlaylistTiles(items.nodes)}</div>
        </div>
      )}
      {model === "playlists" && playlistClickedToggle && (
        <div className={styles.recentSongsContainer}>
          <div className={`${styles.clickedPlaylistTitleBar} ${styles.title}`}>
            <h1 className={styles.clickedPlaylistTitle}>
              {clickedPlaylist.title}
            </h1>
            <button
              className={styles.clickedPlaylistClose}
              onClick={() => setPlaylistClickedToggle()}
            >
              <h1>CLOSE</h1>
            </button>
          </div>
          <div className={styles.songsContainer}>
            <div className={styles.recentSongColumnTitle}>
              <div>
                <h1 className={styles.category}>TITLE</h1>
              </div>
              <div>TEMPO</div>
              <div>GENRES</div>
              <div>MOODS</div>
              <div>INSTRUMENTATION</div>
            </div>
             {clickedPlaylist.songs && renderSongsDataGrid(clickedPlaylist.songs)}
          </div>
        </div>
      )}
    </>
  )
}

export default Recents
