import React, { useState, useContext } from "react"
import styles from "./playlistCardStyles.module.css"
import BackgroundImage from "gatsby-background-image"
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../../context/provider"
import { motion } from "framer-motion"

const playlistColors = [
  styles.darkAvo,
  styles.darkGrey,
  styles.lightAvo,
  styles.forestGreen,
  styles.brown,
]

const PlaylistCard = ({ playlist }) => {
  const [flip, setFlip] = useState(false)
  const state = useContext(GlobalStateContext)
  const dispatch = useContext(GlobalDispatchContext)

  const descObj =
    playlist && playlist.description && playlist.description.raw
      ? JSON.parse(playlist.description.raw)
      : null

  const desc = descObj ? descObj.content[0].content[0].value : null

  function handleFlip() {
    dispatch({
      type: "SET_FLIPPED_PLAYLIST_CARD",
      id: playlist.contentful_id,
    })
  }

  return (
    <div
      // Tag="section"
      // fluid={playlist.image.fluid}
      className={`${styles.container} ${
        playlistColors[Math.floor(Math.random() * playlistColors.length)]
      }`}
    >
      <motion.div
        className={`${styles.flipCard} ${
          state.flippedPlaylistCard === playlist.contentful_id && styles.flip
        }`}
        onClick={handleFlip}
        whileHover={{ scale: 1.1 }}
      >
        <div className={styles.flipCardInner}>
          <div className={styles.flipCardFront}>
            <div className={styles.title}>
              <h1>{playlist.title}</h1>
            </div>
            <div className={styles.description}>{desc && <p>{desc}</p>}</div>
          </div>
          <div className={styles.flipCardBack}>
            <h1>Songs:</h1>
            <ul>
              {playlist.songs &&
                playlist.songs.map(song => (
                  <li key={song.id}>
                    <button
                      onClick={() =>
                        dispatch({
                          type: "SET_CURRENT_TRACK",
                          url: song.audio.file.url,
                          title: song.title,
                        })
                      }
                    >
                      {song.title}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default PlaylistCard
