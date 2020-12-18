import React from "react"
import { Link } from "gatsby"
import styles from "../styles/paginatorStyle.module.css"

const Paginator = ({ pageContext }) => {
  const { previousPagePath, nextPagePath } = pageContext
  return (
    <div className={styles.container}>
      <span
        className={
          previousPagePath
            ? "px-4"
            : "pointer-events-none cursor-default px-4 text-gray-400"
        }
      >
        <Link to={previousPagePath}>&larr; Previous</Link>
      </span>

      <span
        className={
          nextPagePath
            ? "px-4"
            : "pointer-events-none cursor-default px-4 text-gray-400"
        }
      >
        <Link to={nextPagePath}>Next &rarr;</Link>
      </span>
    </div>
  )
}

export default Paginator
