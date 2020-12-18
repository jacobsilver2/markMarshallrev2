import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Song from "../components/SongCard"
import Paginator from "../components/Paginator"
import Sort from "../components/Sort"
import styles from "../styles/musicPageStyle.module.css"

const Music = ({ data, pageContext, location }) => {
  const { nodes } = data.allSongs

  return (
    <Layout location={location}>
      <SEO title="Music" />
      <div className={styles.container}>
        <div className={styles.topbar}>
          <Sort />
          <Paginator pageContext={pageContext} />
        </div>
        <ul>
          {nodes.map(song => (
            <li key={song.contentful_id}>
              <Song song={song} />
            </li>
          ))}
        </ul>
        <div className={styles.bottombar}>
          <Sort hidden={true} />
          <Paginator pageContext={pageContext} />
        </div>
      </div>
    </Layout>
  )
}

export default Music

export const musicData = graphql`
  query allSongsPaginatedData($skip: Int!, $limit: Int!) {
    allSongs: allContentfulSong(
      sort: { fields: title, order: ASC }
      skip: $skip
      limit: $limit
    ) {
      nodes {
        contentful_id
        tempo
        soundsLike
        instrumentation
        waveformImage {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
        audio {
          file {
            url
          }
        }
        title
        description {
          internal {
            content
          }
        }
        composer
        createdAt
        genre
        mood
      }
    }
  }
`
