import React, { useState } from "react"
import { Link } from "gatsby"
import styles from "../styles/navLinkStyle.module.css"

const Navlinks = ({ isLoggedIn, logout }) => {
  const [isToggled, setIsToggled] = useState(true)
  return (
    <>
      <li>
        <Link className={styles.link} to="/music">
          Music
        </Link>
      </li>
      <li>
        <Link className={styles.link} to="/playlists">
          Playlists
        </Link>
      </li>
      <li>
        <Link className={styles.link} to="/about">
          About
        </Link>
      </li>

      <li>
        <Link className={styles.link} to="/contact">
          Contact
        </Link>
      </li>

      {isLoggedIn ? (
        <li>
          <div className={styles.link}>
            <button onClick={() => setIsToggled(prev => !prev)}>
              Dashboard
              <svg
                className="h-3 fill-current inline"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>
            <div
              className={`${styles.dropdown} ${isToggled ? styles.toggle : ""}`}
            >
              <Link to="/dashboard" className={styles.link}>
                Dashboard
              </Link>
              <div className={styles.space}></div>
              <button onClick={logout} className={styles.link}>
                Log Out
              </button>
            </div>
          </div>
        </li>
      ) : null}
    </>
  )
}

export default Navlinks
