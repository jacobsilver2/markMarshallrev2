import React from "react"
import { navigate, Link, useStaticQuery, graphql } from "gatsby"
import { useFlexSearch } from "react-use-flexsearch"
import SearchResultsComponent from "../components/searchResults/searchResults"

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

  return (
    <>
      <SearchResultsComponent results={results} />
    </>
  )
}

export default SearchResults
