import React, { useState } from "react"
import { navigate } from "gatsby"

const SearchBar = () => {
  const [query, setQuery] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
    if (query) {
      navigate(`/searchresults?query=${query}`, { state: { query } })
    }
  }

  return (
    <div className="shadow text-2xl text-white">
      <div className="flex text-white">
        <span className="relative w-full">
          <form className="flex" onSubmit={handleSubmit}>
            <input
              className="w-full bg-transparent text-white transition border border-gray-300 focus:outline-none focus:border-gray-400 rounded py-3 px-2 pl-10 appearance-none leading-normal"
              type="search"
              placeholder="Search..."
              value={query}
              onChange={e => {
                setQuery(e.target.value)
              }}
              name="query"
            />
            <div
              className="absolute search-icon"
              style={{ top: "1.7rem", left: ".8rem" }}
            >
              <svg
                className="fill-current pointer-events-none text-gray-400 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
              </svg>
            </div>
            {/* <div className="text-center">
              <button
                className="text-black hover:text-purple-500 p-2 my-2"
                type="submit"
              >
                Search
              </button>
            </div> */}
          </form>
        </span>
      </div>
    </div>
  )
}

export default SearchBar
