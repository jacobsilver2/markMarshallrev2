import React from "react"
import PlaylistCard from "../playlistCard/playlistCard"
import styles from "./playlistsStyle.module.css"

const Playlists = ({ playlists }) => {
  const playListCards = playlists.map(playlist => (
    <PlaylistCard key={playlist.contentful_id} playlist={playlist} />
  ))

  return <motion className={styles.container}>{playListCards}</motion>
}

export default Playlists
