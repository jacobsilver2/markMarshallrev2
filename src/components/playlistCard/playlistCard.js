import React from "react"
import { Link } from "gatsby"
import styles from "./playlistCardStyles.module.css"
import slugify from "../../lib/slugify"

const playlistColors = [
  styles.darkAvo,
  styles.darkGrey,
  styles.lightAvo,
  styles.forestGreen,
  styles.brown,
]

const PlaylistCard = ({ playlist }) => {
  const descObj =
    playlist && playlist.description && playlist.description.raw
      ? JSON.parse(playlist.description.raw)
      : null

  const desc = descObj ? descObj.content[0].content[0].value : null

  return (
    <div
      className={`${styles.container} ${
        playlistColors[Math.floor(Math.random() * playlistColors.length)]
      }`}
    >
      <Link to={`/playlists/${slugify(playlist.title)}`}>
        <div className={styles.card}>
          <div className={styles.innerBox}>
            <div className={styles.title}>
              <h1>{playlist.title}</h1>
            </div>
            <div className={styles.description}>{desc && <p>{desc}</p>}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default PlaylistCard
