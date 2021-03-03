import React, { useContext, useState } from "react"
import styles from "./recentsStyles.module.css"
import { GlobalDispatchContext } from "../../context/provider"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"

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

//! using styled components for this task, so hovering over the container will
//! only blur the background  and not the text
const StyledItem = styled.div`
  position: relative;
  display: flex;
  font-size: 0.75em;
`

const StyledBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  ${StyledItem}:hover & {
    filter: blur(8px);
  }
`

const StyledButton = styled.button`
  font-size: var(--normal);
  position: relative;
  align-self: flex-start;
  text-align: left;
  padding: 0.5em;
  @media (max-width: 1090px) {
    font-size: var(--smallish);
    padding: 1em;
  }
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

const PlaylistItem = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 0.75em;
`

const PlaylistBackground = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  ${PlaylistItem}:hover & {
    filter: blur(8px);
  }
`

const PlaylistButton = styled.button`
  position: relative;
  padding: 0.5em;
  /* align-self: center; */
  /* text-align: left; */
`

const RecentClickedPlaylist = ({ playlist, color }) => {
  const dispatch = useContext(GlobalDispatchContext)
  function handlePlayPause(url, title) {
    dispatch({
      type: "SET_CURRENT_TRACK",
      url,
      title,
    })
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={`${styles.clickedPlaylistContainer}`}
    >
      {playlist.songs.map(song => (
        <PlaylistItem variants={item} key={song.contentful_id}>
          <PlaylistBackground
            className={color}
            onClick={() => handlePlayPause(song.audio.file.url, song.title)}
          />
          <PlaylistButton
            className={styles.item}
            onClick={() => handlePlayPause(song.audio.file.url, song.title)}
          >
            <h1>{song.title}</h1>
          </PlaylistButton>
        </PlaylistItem>
      ))}
    </motion.div>
  )
}
