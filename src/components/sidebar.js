import React, { useState } from "react"
import { useStaticQuery, graphql, navigate } from "gatsby"
import tempoCalc from "../lib/tempoCalc"
import GimmeTippy from "./sidebarContent"
import sortArrayAlphabetically from "../lib/sortArrayAlphabetically"

const Sidebar = () => {
  const [queryArr, setQueryArr] = useState([])
  const data = useStaticQuery(graphql`
    query sidebarQuery {
      songs: allContentfulSong {
        nodes {
          contentful_id
          tempo
          soundsLike
          instrumentation
          composer
          genre
          mood
        }
      }
    }
  `)
  const { nodes: allSongs } = data.songs

  const genresSet = new Set()
  const composersSet = new Set()
  const temposSet = new Set()
  const soundsLikeSet = new Set()
  const instrumentationSet = new Set()
  const moodSet = new Set()

  allSongs.forEach(song => {
    const { genre, composer, tempo, soundsLike, instrumentation, mood } = song
    genre && genre.forEach(genre => genresSet.add(genre))
    composer && composer.forEach(composer => composersSet.add(composer))
    tempo && tempo.forEach(tempo => temposSet.add(tempoCalc(tempo)))
    soundsLike && soundsLike.forEach(sound => soundsLikeSet.add(sound))
    instrumentation &&
      instrumentation.forEach(instrument => instrumentationSet.add(instrument))
    mood && mood.forEach(mood => moodSet.add(mood))
  })
  // all this crazy shit with sets is to get rid of duplicates
  const genresArr = sortArrayAlphabetically([...genresSet])
  const composersArr = sortArrayAlphabetically([...composersSet])
  const temposArr = [...temposSet]
  const soundsLikeArr = sortArrayAlphabetically([...soundsLikeSet])
  const instrumentationArr = sortArrayAlphabetically([...instrumentationSet])
  const moodArr = sortArrayAlphabetically([...moodSet])

  function handleSearch() {
    if (queryArr.length > 0) {
      navigate(`/searchresults?query=${queryArr.join()}`, {
        state: { query: queryArr.join() },
      })
    }
  }
  function removeFilter(f) {
    setQueryArr(prev => prev.filter(q => q !== f))
  }
  return (
    <div className="bg-gray-800 shadow-xl h-16 fixed  mt-12 md:relative md:h-screen z-10 w-full md:w-48 hidden md:inline">
      <div className="md:mt-16 md:w-48 md:fixed md:left-0 md:top-0 flex  flex-col content-center md:content-start text-left justify-between">
        <div className="pb-1 md:pb-0 text-xs md:text-base md:text-white block">
          <h1 className="text-center">FILTER</h1>
        </div>

        <ul className="list-reset flex flex-row md:flex-col py-0 md:py-10  px-1 md:px-2 text-center">
          <GimmeTippy
            queryArr={queryArr}
            setQueryArr={setQueryArr}
            category="Genre"
            values={genresArr}
          />
          <GimmeTippy
            queryArr={queryArr}
            setQueryArr={setQueryArr}
            category="Composer"
            values={composersArr}
          />
          <GimmeTippy
            queryArr={queryArr}
            setQueryArr={setQueryArr}
            category="Tempo"
            values={temposArr}
          />
          <GimmeTippy
            queryArr={queryArr}
            setQueryArr={setQueryArr}
            category="Sounds Like"
            values={soundsLikeArr}
          />
          <GimmeTippy
            queryArr={queryArr}
            setQueryArr={setQueryArr}
            category="Instrumentation"
            values={instrumentationArr}
          />
          <GimmeTippy
            queryArr={queryArr}
            setQueryArr={setQueryArr}
            category="Mood"
            values={moodArr}
          />
        </ul>

        {/* buttons */}

        {/* filter list */}

        <div className="flex-grow flex flex-col justify-between	p-8 bg-gray-700 text-white">
          <div>
            <p>Selected Filters:</p>
          </div>
          <div>
            {queryArr.length ? (
              <ul className="text-center text-xs">
                {queryArr.map(q => (
                  <li key={q}>
                    {q}
                    <button onClick={() => removeFilter(q)}>(remove)</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center">---</p>
            )}
          </div>
          <div>
            <div className="text-white text-center py-4 ">
              <button
                onClick={handleSearch}
                className="w-3/4 border border-white hover:bg-white hover:text-gray-800"
                type="text"
              >
                Search
              </button>
            </div>
            <div className="text-white text-center py-4">
              <button
                onClick={() => setQueryArr([])}
                className="w-3/4 border border-white hover:bg-white hover:text-gray-800"
                type="text"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
