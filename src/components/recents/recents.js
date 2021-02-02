import React, { useContext, useState } from "react"
import styles from "./recentsStyles.module.css"
import { GlobalDispatchContext } from "../../context/provider"
import styled from "styled-components"

const songColors = [
  styles.lightGreen,
  styles.lightBlue,
  styles.purple,
  styles.darkBlue,
  styles.orange,
  styles.red,
]

const playlistColors = [
  styles.darkAvo,
  styles.darkGrey,
  styles.lightAvo,
  styles.forestGreen,
  styles.brown,
]

// using styled components for this task, so hovering over the container will
// only blur the background  and not the text
const StyledItem = styled.div`
  position: relative;
  display: flex;
  font-size: 0.75em;
  /* &:before {
    content: "";
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  } */
`

const StyledBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  ${StyledItem}:hover & {
    filter: blur(4px);
  }
`

const StyledButton = styled.button`
  position: relative;
  align-self: flex-start;
  text-align: left;
  padding: 0.5em;
`

const Recents = ({ model, items }) => {
  const dispatch = useContext(GlobalDispatchContext)
  const [playlistClickedToggle, setPlaylistClickedToggle] = useState(false)
  const [clickedPlaylist, setClickedPlaylist] = useState({})
  const [clickedPlaylistColor, setClickedPlaylistColor] = useState("")

  function handlePlayPause(url, title) {
    dispatch({
      type: "SET_CURRENT_TRACK",
      url,
      title,
    })
  }

  function handlePlaylistClick(item, color) {
    setClickedPlaylist(item)
    setClickedPlaylistColor(color)
    setPlaylistClickedToggle(prev => !prev)
  }

  const mappedItems = items.nodes.map(item => {
    const randomColor =
      model === "songs"
        ? songColors[Math.floor(Math.random() * songColors.length)]
        : playlistColors[Math.floor(Math.random() * playlistColors.length)]

    return (
      <StyledItem key={item.contentful_id}>
        <StyledBackground
          onClick={
            model === "songs"
              ? () => handlePlayPause(item.audio.file.url, item.title)
              : () => handlePlaylistClick(item, randomColor)
          }
          className={`${randomColor}`}
        />
        <StyledButton
          onClick={
            model === "songs"
              ? () => handlePlayPause(item.audio.file.url, item.title)
              : () => handlePlaylistClick(item, randomColor)
          }
        >
          <h1>{item.title}</h1>
        </StyledButton>
      </StyledItem>
    )
  })

  return (
    <>
      {model === "songs" && (
        <div>
          <div className={styles.title}>RECENT {model.toUpperCase()}</div>
          <div className={styles.items}>{mappedItems}</div>
        </div>
      )}

      {model === "playlists" && !playlistClickedToggle && (
        <div>
          <h1 className={styles.title}>RECENT {model.toUpperCase()}</h1>
          <div className={styles.items}>{mappedItems}</div>
        </div>
      )}
      {model === "playlists" && playlistClickedToggle && (
        <div>
          <div className={`${styles.clickedPlaylistTitleBar} ${styles.title}`}>
            <h1 className={styles.clickedPlaylistTitle}>
              {clickedPlaylist.title}
            </h1>
            {/* <div></div> */}
            <button
              className={styles.clickedPlaylistClose}
              onClick={() => setPlaylistClickedToggle()}
            >
              <h1>CLOSE</h1>
            </button>
          </div>
          <div className={styles.items}>
            <RecentClickedPlaylist
              playlist={clickedPlaylist}
              color={clickedPlaylistColor}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Recents

const RecentClickedPlaylist = ({ playlist, color }) => {
  const dispatch = useContext(GlobalDispatchContext)
  function handlePlayPause(url, title) {
    dispatch({
      type: "SET_CURRENT_TRACK",
      url,
      title,
    })
  }
  return (
    <div className={`${styles.clickedPlaylistContainer} ${color}`}>
      {playlist.songs.map(song => (
        <button
          key={song.contentful_id}
          className={styles.item}
          onClick={() => handlePlayPause(song.audio.file.url, song.title)}
        >
          <h1>{song.title}</h1>
        </button>
      ))}
    </div>
  )
}
