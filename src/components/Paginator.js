import React from "react"
import { Link } from "gatsby"

const Paginator = ({ pageContext }) => {
  const { previousPagePath, nextPagePath } = pageContext
  return (
    <div className="col-start-3 col-span-2 md:col-span-1 md:col-start-2  flex justify-between items-center md:justify-center">
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
