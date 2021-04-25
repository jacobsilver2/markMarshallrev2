import React, { useState, useRef } from "react"
import { AuthService, useAuth } from "gatsby-theme-auth0"
import { Link } from "gatsby"
import styles from "./navLinkStyle.module.css"
import navLinksArr from "../../lib/navLinksArr"
import useOutsideClick from "../../hooks/useOutsideClick"

const mappedNavLinks = navLinksArr.map(navLink => (
  <li className={styles.link} key={navLink.name}>
    <Link to={navLink.route}>{navLink.name.toUpperCase()}</Link>
  </li>
))

const rebuildSite = () => {
  fetch("https://api.netlify.com/build_hooks/6067993b10cbab20a171dca8", {
    method: "post",
  })
}

const Navlinks = () => {
  const ref = useRef()
  const [isToggled, setIsToggled] = useState(true)
  const { isLoggedIn } = useAuth()

  useOutsideClick(ref, () => {
    setIsToggled(true)
  })

  return (
    <>
      <li className={styles.link}>
        <Link to="/music">MUSIC</Link>
      </li>
      <li className={styles.link}>
        <Link to="/playlists">PLAYLISTS</Link>
      </li>
      <li className={styles.link}>
        <Link to="/about">ABOUT</Link>
      </li>
      <li className={styles.link}>
        <Link to="/contact">CONTACT</Link>
      </li>
      {isLoggedIn ? (
        <li ref={ref}>
          <div className={styles.link}>
            <button onClick={() => setIsToggled(prev => !prev)}>
              DASHBOARD
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
              <Link
                onClick={() => setIsToggled(true)}
                to="/waveformGenerator"
                className={styles.link}
              >
                Generate Waveform Image
              </Link>
              <button onClick={() => rebuildSite()} className={styles.link}>
                Rebuild Site
              </button>
              <div className={styles.space}></div>
              <button onClick={AuthService.logout} className={styles.link}>
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
