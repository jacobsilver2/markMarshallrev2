import React from "react"
import { Link } from "gatsby"
import styles from "./paginatorStyle.module.css"

const Paginator = ({ pageContext }) => {
  const { previousPagePath, nextPagePath } = pageContext
  return (
    <div className={styles.container}>
      <span
        className={previousPagePath ? `${styles.active}` : `${styles.inactive}`}
      >
        <Link to={previousPagePath}>&larr; Previous</Link>
      </span>

      <span
        className={nextPagePath ? `${styles.active}` : `${styles.inactive}`}
      >
        <Link to={nextPagePath}>Next &rarr;</Link>
      </span>
    </div>
  )
}

export default Paginator
