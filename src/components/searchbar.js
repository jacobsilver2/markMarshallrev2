import React, { useState } from "react"
import { navigate } from "gatsby"
import styles from "../styles/searchBarStyle.module.css"

const SearchBar = () => {
  const [query, setQuery] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
    if (query) {
      navigate(`/searchresults?query=${query}`, { state: { query } })
    }
  }

  return (
    <div className={styles.container}>
      <span className={styles.search}>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="search"
            placeholder="Search..."
            value={query}
            onChange={e => {
              setQuery(e.target.value)
            }}
            name="query"
          />
          <div className={styles.searchIcon}>
            <svg
              // className="fill-current pointer-events-none text-gray-400 w-4 h-4"
              className={styles.svg}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
            </svg>
          </div>
        </form>
      </span>
    </div>
  )
}

export default SearchBar
