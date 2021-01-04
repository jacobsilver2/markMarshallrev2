import React from "react"
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"
import styles from "./tippyStyle.module.css"

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
        className={styles.tippy}
        placement="auto-end"
        popperOptions={{ strategy: "fixed" }}
        interactive
        content={
          <div className={styles.container}>
            <ul>
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
                  <p className={styles.tippyCat}>{value}</p>
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <li className={styles.tippyLi}>
          <h1 className={styles.tippyName}>{category}</h1>
        </li>
      </Tippy>
    </>
  )
}

export default GimmyTippy
