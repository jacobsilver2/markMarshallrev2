import React, { useState } from "react"
import Select from "react-select"

const options = [
  { value: "chocolate", label: "Title, A-Z" },
  { value: "strawberry", label: "Title, Z-A" },
]

function handleChange(e) {
  console.log(e)
}

const Sort = () => {
  return (
    <div className="col-span-1">
      <Select
        onChange={handleChange}
        placeholder="Sort By..."
        className=""
        options={options}
      />
    </div>
  )
}

export default Sort
