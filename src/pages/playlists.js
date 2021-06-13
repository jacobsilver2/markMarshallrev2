import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import PlaylistsComponent from "../components/playlists/playlists"

const PlaylistsPage = ({ data }) => {
  const { nodes } = data.playlists
  return (
    <>
      <SEO title="playlists" />
      <PlaylistsComponent playlists={nodes} />
    </>
  )
}

export default PlaylistsPage

export const playlistData = graphql`
  query allPlaylists {
    playlists: allContentfulPlaylist(sort: { fields: title, order: ASC }) {
      nodes {
        contentful_id
        title
        image {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
        description {
          raw
        }
        songs {
          id
          title
          audio {
            file {
              url
            }
          }
        }
        updatedAt
      }
    }
  }
`
