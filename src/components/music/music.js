import React from "react"
import Song from "../songCard/SongCard"
import Paginator from "../paginator/Paginator"
import styles from "./musicPageStyle.module.css"

const Music = ({ songs, pageContext }) => {
  return (
    <div className={styles.container}>
      <div className={styles.topbar}>
        <Paginator pageContext={pageContext} />
      </div>
      <ul>
        {songs.map(song => (
          <li key={song.contentful_id}>
            <Song song={song} />
          </li>
        ))}
      </ul>
      <div className={styles.bottombar}>
        <Paginator pageContext={pageContext} />
      </div>
    </div>
  )
}

export default Music
