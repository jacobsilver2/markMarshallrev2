import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql, navigate } from "gatsby"
import tempoCalc from "../../lib/tempoCalc"
import sortArrayAlphabetically from "../../lib/sortArrayAlphabetically"
import useWindowSize from "../../hooks/useWindowSize"
import styles from "./sidebarStyle.module.css"
import CollapsibleContent from "../sidebarContentCollapsible/sidebarContentCollapsible"
import { SlideDown } from "react-slidedown"
import "react-slidedown/lib/slidedown.css"
import bg from "../../images/background.png"
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

  const desktopTitle = ""

  const filters = (
    <>
      <div className={styles.filters}>
        <ul className={styles.filterCategories}>
          <CollapsibleContent
            queryArr={queryArr}
            setQueryArr={setQueryArr}
            category="GENRE"
            values={genresArr}
          />
          <CollapsibleContent
            queryArr={queryArr}
            setQueryArr={setQueryArr}
            category="COMPOSER"
            values={composersArr}
          />
          <CollapsibleContent
            queryArr={queryArr}
            setQueryArr={setQueryArr}
            category="TEMPO"
            values={temposArr}
          />
          <CollapsibleContent
            queryArr={queryArr}
            setQueryArr={setQueryArr}
            category="SOUNDS LIKE"
            values={soundsLikeArr}
          />
          <CollapsibleContent
            queryArr={queryArr}
            setQueryArr={setQueryArr}
            category="INSTRUMENTATION"
            values={instrumentationArr}
          />
          <CollapsibleContent
            queryArr={queryArr}
            setQueryArr={setQueryArr}
            category="MOOD"
            values={moodArr}
          />
        </ul>
        <div className={styles.buttonContainer}>
          <button onClick={handleSearch} className={styles.buttons} type="text">
            Search
          </button>
        </div>
      </div>

      <div className={styles.filterlist}>
        <h2>SELECTED FILTERS</h2>
        <div className={styles.clearButtonContainer}>
          <button
            onClick={() => setQueryArr([])}
            className={styles.clearButton}
            type="text"
          >
            X CLEAR FILTERS
          </button>
        </div>
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
              ""
            )}
          </ul>
        </div>
      </div>
    </>
  )

  return (
    <nav
      style={
        {
          // backgroundImage: `url(${bg})`,
          // objectFit: "none",
          // backgroundSize: "200px",
        }
      }
      className={styles.container}
    >
      <div className={styles.filtersTitle}>
        {size.width < 1024 ? mobileTitleButton : ""}
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
