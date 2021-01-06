import React, { useState } from "react"
import Collapsible from "react-collapsible"
import styles from "./sidebarContentCollapsibleStyles.module.css"
import { FaCaretRight, FaCaretDown } from "react-icons/fa"

const SidebarContentCollapsible = ({
  category,
  values,
  queryArr,
  setQueryArr,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  function handleCheck(e) {
    const { value: filter, checked } = e.target
    if (checked) {
      setQueryArr(prev => [...prev, filter])
    }
    if (!checked) {
      setQueryArr(prev => prev.filter(item => item !== filter))
    }
  }

  const catWithCaret = (
    <p className={styles.categoryTitle}>
      {category}{" "}
      {isOpen ? (
        <FaCaretDown className={styles.caret} />
      ) : (
        <FaCaretRight className={styles.caret} />
      )}
    </p>
  )

  return (
    <Collapsible
      transitionTime={200}
      className={styles.container}
      trigger={catWithCaret}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
    >
      <div className={styles.contentContainer}>
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
              <p className={styles.contentCategory}>{value}</p>
            </li>
          ))}
        </ul>
      </div>
    </Collapsible>
  )
}

export default SidebarContentCollapsible
