import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useFlexSearch } from "react-use-flexsearch"
import SearchResultsComponent from "../components/searchResults/searchResults"

const SearchResults = ({ location }) => {
  const data = useStaticQuery(graphql`
    query LocalSearchQuery {
      localSearchSongs {
        index
        store
      }
    }
  `)

  const { localSearchSongs } = data
  const { query } = location.state ? location.state : ""

  const results = useFlexSearch(
    query,
    localSearchSongs.index,
    localSearchSongs.store
  )

  console.log(results)

  return (
    <>
      <SearchResultsComponent results={results} />
    </>
  )
}

export default SearchResults
