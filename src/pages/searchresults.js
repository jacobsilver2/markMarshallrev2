import React from "react"
import { navigate, Link, useStaticQuery, graphql } from "gatsby"
import { useFlexSearch } from "react-use-flexsearch"
import Layout from "../components/layout"
import slugify from "../lib/slugify"

const SearchResults = ({ location }) => {
  // console.log(location.state.query)
  const data = useStaticQuery(graphql`
    query LocalSearchQuery {
      localSearchSongs {
        index
        store
      }
    }
  `)

  const { localSearchSongs } = data
  const { query } = location.state

  const results = useFlexSearch(
    query,
    localSearchSongs.index,
    localSearchSongs.store
  )

  const mappedResults = results.length
    ? results.map(result => (
        <li key={result.id}>
          <Link to={`/music/${slugify(result.title)}`}>{result.title}</Link>
        </li>
      ))
    : ""

  return (
    <Layout>
      <h3>Hello from Search Results</h3>
      <ul>{mappedResults}</ul>
      <button onClick={() => navigate(-1)}>Go back</button>
    </Layout>
  )
}

export default SearchResults
