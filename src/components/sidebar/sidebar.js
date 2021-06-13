import React, { useContext } from "react"
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../../context/provider"
import useWindowSize from "../../hooks/useWindowSize"
import styles from "./sidebarStyle.module.css"
import "react-slidedown/lib/slidedown.css"
import { FaCaretDown, FaCaretRight } from "react-icons/fa"
import Filters from "../filters/filters"

const Sidebar = () => {
  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)
  const size = useWindowSize()

  function handleModalOpen() {
    dispatch({ type: "SET_MODAL_CHILD", modalChild: "filters" })
    dispatch({ type: "TOGGLE_MODAL" })
  }

  const mobileTitleButton = (
    <button onClick={handleModalOpen}>
      FILTER
      <span>
        {state.modalOpen && state.modalChild === "filters" ? (
          <FaCaretDown />
        ) : (
          <FaCaretRight />
        )}
      </span>
    </button>
  )

  return (
    <nav className={styles.container}>
      {size.width < 1024 ? (
        <div className={styles.filtersTitle}>{mobileTitleButton}</div>
      ) : (
        <Filters />
      )}
    </nav>
  )
}

export default Sidebar
