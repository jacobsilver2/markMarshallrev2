import React from "react"
import { graphql, navigate } from "gatsby"

const PlaylistTemplate = props => {
  // commenting this crap out while I scaffold to avoid ESList warnings
  // const {
  //   description,
  //   title,
  //   image,
  //   songs,
  //   contentful_id,
  // } = props.data.playlist
  return (
    <>
      <div>Hi from playlist {props.data.playlist.title}</div>
      <button type="button" onClick={() => navigate(-1)}>
        Go back
      </button>
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
        audio {
          file {
            url
          }
        }
      }
    }
  }
`
