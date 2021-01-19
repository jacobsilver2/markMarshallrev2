import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql, navigate } from "gatsby"
import tempoCalc from "../../lib/tempoCalc"
import sortArrayAlphabetically from "../../lib/sortArrayAlphabetically"
import useWindowSize from "../../hooks/useWindowSize"
import styles from "./sidebarStyle.module.css"
import CollapsibleContent from "../sidebarContentCollapsible/sidebarContentCollapsible"
import { SlideDown } from "react-slidedown"
import "react-slidedown/lib/slidedown.css"
import { FaCaretDown, FaCaretRight } from "react-icons/fa"

const Sidebar = () => {
  const [queryArr, setQueryArr] = useState([])
  const [dropdown, setDropdown] = useState(false)
  const size = useWindowSize()

  useEffect(() => {
    size.width > 1024 ? setDropdown(true) : setDropdown(false)
  }, [size.width])

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

  const mobileTitleButton = (
    <button onClick={() => setDropdown(prev => !prev)}>
      FILTER
      <span>{dropdown ? <FaCaretDown /> : <FaCaretRight />}</span>
    </button>
  )

  const desktopTitle = <h1>FILTER</h1>

  const filters = (
    <>
      <div className={styles.filters}>
        <ul className={styles.filterCategories}>
          <CollapsibleContent
            queryArr={queryArr}
            setQueryArr={setQueryArr}
            category="Genre"
            values={genresArr}
          />
          <CollapsibleContent
            queryArr={queryArr}
            setQueryArr={setQueryArr}
            category="Composer"
            values={composersArr}
          />
          <CollapsibleContent
            queryArr={queryArr}
            setQueryArr={setQueryArr}
            category="Tempo"
            values={temposArr}
          />
          <CollapsibleContent
            queryArr={queryArr}
            setQueryArr={setQueryArr}
            category="Sounds Like"
            values={soundsLikeArr}
          />
          <CollapsibleContent
            queryArr={queryArr}
            setQueryArr={setQueryArr}
            category="Instrumentation"
            values={instrumentationArr}
          />
          <CollapsibleContent
            queryArr={queryArr}
            setQueryArr={setQueryArr}
            category="Mood"
            values={moodArr}
          />
        </ul>
      </div>

      <div className={styles.filterlist}>
        <p>Selected Filters:</p>
        <div>
          <ul className={styles.selectedFilters}>
            {queryArr.length ? (
              <>
                {queryArr.map(q => (
                  <li key={q}>
                    {q}
                    <button onClick={() => removeFilter(q)}>(remove)</button>
                  </li>
                ))}
              </>
            ) : (
              <li>---</li>
            )}
          </ul>
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={handleSearch} className={styles.buttons} type="text">
            Search
          </button>
          <button
            onClick={() => setQueryArr([])}
            className={styles.buttons}
            type="text"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </>
  )

  return (
    <nav className={styles.container}>
      <div className={styles.filtersTitle}>
        {size.width < 1024 ? mobileTitleButton : desktopTitle}
      </div>
      {dropdown ? (
        <>{size.width < 1024 ? <SlideDown>{filters}</SlideDown> : filters}</>
      ) : (
        ""
      )}
    </nav>
  )
}

export default Sidebar
