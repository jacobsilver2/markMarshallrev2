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
    <div className="bg-yellow-50 p-4 shadow text-2xl text-white">
      <div className="flex flex-1 justify-center  text-white px-2">
        <span className="inline relative w-full md:w-2/3">
          <form onSubmit={handleSubmit}>
            <input
              className="w-3/4 bg-transparent text-black transition border border-gray-300 focus:outline-none focus:border-gray-400 rounded py-3 px-2 pl-10 appearance-none leading-normal"
              type="search"
              placeholder="search"
              value={query}
              onChange={e => {
                setQuery(e.target.value)
              }}
              name="query"
            />
            <button className="text-black px-4" type="submit">
              Search
            </button>
          </form>
        </span>
      </div>
    </div>
  )
}

export default SearchBar
