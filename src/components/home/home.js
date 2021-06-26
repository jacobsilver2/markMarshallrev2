import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styles from "./homeStyles.module.css"
import Recents from "../recents/recents"
import Img from "gatsby-image"
import bg from "../../images/background.png"

const Home = () => {
  const { recentSongs, recentPlaylists, logo } = useStaticQuery(
    graphql`
      query Recents {
        recentSongs: allContentfulSong(limit: 9) {
          nodes {
            title
            genre
            mood
            tempo
            contentful_id
            audio {
              file {
                url
              }
            }
          }
        }
        recentPlaylists: allContentfulPlaylist(limit: 6) {
          nodes {
            title
            contentful_id
            image {
              fluid {
                ...GatsbyContentfulFluid
              }
            }
            songs {
              contentful_id
              title
              genre
              mood
              tempo
              instrumentation
              audio {
                file {
                  url
                }
              }
            }
          }
        }
        logo: file(name: { eq: "logo" }) {
          id
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  )

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        objectFit: "none",
        backgroundSize: "200px",
      }}
      className={styles.container}
    >
      <div className={styles.title}>
        <h3>imagery through sound</h3>
        <h1>FUTURE RELICS</h1>
        <div className={styles.logoContainer}>
          <div></div>
          <Img fluid={logo.childImageSharp.fluid} />
          <div></div>
        </div>
      </div>
      <div className={styles.recents}>
        <Recents model="songs" items={recentSongs} />
        <Recents model="playlists" items={recentPlaylists} />
      </div>
    </div>
  )
}

export default Home
