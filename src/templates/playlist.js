import React from "react"
import { graphql, navigate } from "gatsby"
import PlaylistComponent from "../components/playlist/playlist"

const PlaylistTemplate = ({ data }) => {
  return (
    <>
      <PlaylistComponent playlist={data.playlist} />
    </>
  )
}

export default PlaylistTemplate

export const pageQuery = graphql`
  query($contentful_id: String!) {
    playlist: contentfulPlaylist(contentful_id: { eq: $contentful_id }) {
      contentful_id
      title
      updatedAt
      description {
        raw
      }
      image {
        title
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      songs {
        composer
        contentful_id
        genre
        instrumentation
        mood
        soundsLike
        tempo
        title
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
      }
    }
  }
`
