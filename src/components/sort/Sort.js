import React, { useState } from "react"
import Select from "react-select"
import styles from "./sortStyle.module.css"

const options = [
  { value: "asc", label: "Title, A-Z" },
  { value: "desc", label: "Title, Z-A" },
]

function handleChange(e) {
  console.log(e)
}

const Sort = ({ hidden = false }) => {
  return (
    <div className={`${styles.container} ${hidden ? styles.hidden : ""}`}>
      <Select
        onChange={handleChange}
        placeholder="Sort..."
        className=""
        options={options}
      />
    </div>
  )
}

export default Sort
