import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styles from "./homeStyles.module.css"
import Recents from "../recents/recents"

const Home = () => {
  const { recentSongs, recentPlaylists } = useStaticQuery(
    graphql`
      query Recents {
        recentSongs: allContentfulSong(limit: 9) {
          nodes {
            title
            contentful_id
            audio {
              file {
                url
              }
            }
          }
        }
        recentPlaylists: allContentfulPlaylist(limit: 9) {
          nodes {
            title
            contentful_id
            songs {
              contentful_id
              title
              audio {
                file {
                  url
                }
              }
            }
          }
        }
      }
    `
  )
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {/* <h2>mark marshall's</h2> */}
        <h1>FUTURE RELICS</h1>
        <h3>imagery through sound</h3>
      </div>
      <div className={styles.recents}>
        <Recents model="songs" items={recentSongs} />
        <Recents model="playlists" items={recentPlaylists} />
      </div>
    </div>
  )
}

export default Home
