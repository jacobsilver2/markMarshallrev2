import React from "react"
import PlaylistCard from "../playlistCard/playlistCard"
import styles from "./playlistsStyle.module.css"

const Playlists = ({ playlists }) => {
  const playListCards = playlists.map(playlist => (
    <PlaylistCard key={playlist.contentful_id} playlist={playlist} />
  ))

  return <div className={styles.container}>{playListCards}</div>
}

export default Playlists
