import React from "react"
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"

const GimmyTippy = ({ category, values, queryArr, setQueryArr }) => {
  function handleCheck(e) {
    const { value: filter, checked } = e.target
    if (checked) {
      setQueryArr(prev => [...prev, filter])
    }
    if (!checked) {
      setQueryArr(prev => prev.filter(item => item !== filter))
    }
  }


  return (
    <>
      <Tippy
        placement="auto-end"
        popperOptions={{ strategy: "fixed" }}
        interactive
        content={
          <div className="p-2 text-left text-white max-h-80 min-w-min overflow-auto sidebar-styles">
            <ul className="list-none">
              {values.map(value => (
                <li key={value}>
                  <label htmlFor={value}></label>
                  <input
                    id={value}
                    onChange={handleCheck}
                    type="checkbox"
                    name={value}
                    value={value}
                    checked={queryArr && queryArr.includes(value)}
                  />
                  <p className="pl-2 inline">{value}</p>
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <li className="py-2">
          <h1 className="cursor-pointer text-white border-b-2 border-gray-800 hover:border-purple-500">
            {category}
          </h1>
        </li>
      </Tippy>
    </>
  )
}

export default GimmyTippy
