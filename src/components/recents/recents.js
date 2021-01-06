import React, { useContext, useState } from "react"
import { Link } from "gatsby"
import styles from "./recentsStyles.module.css"
import slugify from "../../lib/slugify"
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../../context/provider"

const Recents = ({ model, items }) => {
  const dispatch = useContext(GlobalDispatchContext)
  const [playlistClickedToggle, setPlaylistClickedToggle] = useState(false)
  const [clickedPlaylist, setClickedPlaylist] = useState({})
  // console.log(model)

  function handlePlayPause(url, title) {
    dispatch({
      type: "SET_CURRENT_TRACK",
      url,
      title,
    })
    dispatch({
      type: "TOGGLE_PLAYING",
    })
  }

  function handlePlaylistClick(item) {
    setClickedPlaylist(item)
    setPlaylistClickedToggle(prev => !prev)
    // console.log("playlist click")
  }

  const mappedItems = items.nodes.map(item => {
    return (
      <div key={item.contentful_id} className={styles.item}>
        <button
          onClick={
            model === "songs"
              ? () => handlePlayPause(item.audio.file.url, item.title)
              : () => handlePlaylistClick(item)
          }
        >
          <h1>{item.title}</h1>
        </button>
      </div>
    )
  })

  return (
    <div>
      <div className={styles.title}>
        {!playlistClickedToggle ? (
          <h1>RECENT {model.toUpperCase()}</h1>
        ) : (
          <div className={styles.clickedPlaylistTitleBar}>
            <div></div>
            <h1>{clickedPlaylist.title}</h1>
            <button
              className={styles.clickedPlaylistClose}
              onClick={() => setPlaylistClickedToggle()}
            >
              <h1>CLOSE</h1>
            </button>
          </div>
        )}
      </div>
      <div className={styles.container}>
        {model === "songs" && <div className={styles.items}>{mappedItems}</div>}
        {model === "playlists" && !playlistClickedToggle && (
          <div className={styles.items}>{mappedItems}</div>
        )}
        {model === "playlists" && playlistClickedToggle && (
          <div className={styles.items}>
            <RecentClickedPlaylist playlist={clickedPlaylist} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Recents

const RecentClickedPlaylist = ({ playlist }) => {
  const dispatch = useContext(GlobalDispatchContext)
  function handlePlayPause(url, title) {
    dispatch({
      type: "SET_CURRENT_TRACK",
      url,
      title,
    })
    dispatch({
      type: "TOGGLE_PLAYING",
    })
  }
  return (
    <div className={styles.clickedPlaylistContainer}>
      {playlist.songs.map(song => (
        <div key={song.contentful_id} className={styles.item}>
          <button
            onClick={() => handlePlayPause(song.audio.file.url, song.title)}
          >
            <h1>{song.title}</h1>
          </button>
        </div>
      ))}
    </div>
  )
}