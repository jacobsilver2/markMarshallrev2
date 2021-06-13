import React from "react"
import { graphql, navigate } from "gatsby"
import Song from "../songCard/SongCard"
import styles from "./playlistStyle.module.css"

const PlaylistComponent = ({ playlist }) => {
  const descObj =
    playlist.description && playlist.description.raw
      ? JSON.parse(playlist.description.raw)
      : ""
  const drill = descObj.content ? descObj.content[0] : ""
  const drill2 = drill && drill.content ? drill.content[0] : ""
  const desc = drill2 && drill2.value ? drill2.value : ""
  return (
    <div className={styles.container}>
      <div className={styles.titleBar}>{playlist.title}</div>
      {desc && <div className={styles.description}>{desc}</div>}
      <ul>
        {playlist.songs &&
          playlist.songs.map(song => (
            <li key={song.contentful_id}>
              <Song song={song} />
            </li>
          ))}
      </ul>
      <button type="button" onClick={() => navigate(-1)}>
        Go back
      </button>
    </div>
  )
}

export default PlaylistComponent
