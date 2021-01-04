import React from "react"
import { graphql } from "gatsby"
import SongComponent from "../components/song/song"

const SongTemplate = props => {
  // commenting this next line out while scaffolding to avoid annoying es-lint warnings.
  // const {
  //   audio,
  //   composer,
  //   genre,
  //   instrumentation,
  //   mood,
  //   soundsLike,
  //   tempo,
  //   description,
  //   title,
  //   waveformImage,
  //   contentful_id,
  // } = props.data.song

  return (
    <>
      <SongComponent song={props.data.song} />
    </>
  )
}

export default SongTemplate

export const songQuery = graphql`
  query($contentful_id: String!) {
    song: contentfulSong(contentful_id: { eq: $contentful_id }) {
      audio {
        file {
          url
        }
      }
      waveformImage {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      composer
      contentful_id
      createdAt
      description {
        description
      }
      genre
      instrumentation
      mood
      soundsLike
      tempo
      title
    }
  }
`
