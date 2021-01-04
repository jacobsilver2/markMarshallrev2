import React from "react"
import SongCard from "../songCard/SongCard"
import { navigate } from "gatsby"
import styles from "./searchResultsStyles.module.css"

const SearchResults = ({ results }) => {
  const mappedResults = results.length
    ? results.map(result => {
        return <SongCard key={result.id} song={result} />
      })
    : ""
  return (
    <div className={styles.container}>
      {results.length ? (
        <p>
          {`Found ${results.length} match${results.length > 1 ? "es" : ""}.`}
        </p>
      ) : (
        <p>No matches found!</p>
      )}
      <div className={styles.results}>{mappedResults}</div>
      <button className={styles.back} onClick={() => navigate(-1)}>
        &#8592; Back
      </button>
    </div>
  )
}

export default SearchResults
