import React from "react"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import MusicComponent from "../components/music/music"

const Music = ({ data, pageContext, location }) => {
  const { nodes: songs } = data.allSongs

  return (
    <>
      <SEO title="Music" />
      <MusicComponent songs={songs} pageContext={pageContext} />
    </>
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
