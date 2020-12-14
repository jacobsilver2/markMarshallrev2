import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import slugify from "../lib/slugify"

const PlaylistsPage = ({ data }) => {
  const { nodes } = data.playlists
  return (
    <Layout>
      <SEO title="playlists" />
      Hello from the playlists page
      <ul>
        {nodes.map(node => (
          <li key={node.contentful_id}>
            <Link to={slugify(node.title)}>{node.title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default PlaylistsPage

export const playlistData = graphql`
  query allPlaylists {
    playlists: allContentfulPlaylist(sort: { fields: title, order: ASC }) {
      nodes {
        contentful_id
        title
        updatedAt
      }
    }
  }
`
