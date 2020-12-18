import React, { useState } from "react"
import { AuthService, useAuth } from "gatsby-theme-auth0"
import SearchBar from "./searchbar"
import Hamburger from "hamburger-react"
import useWindowSize from "../hooks/useWindowSize"
import styles from "../styles/headerStyle.module.css"
import Navlinks from "./navlinks"

const Header = () => {
  const [isOpen, setOpen] = useState(false)
  const size = useWindowSize()
  const { isLoggedIn, profile } = useAuth()

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>LOGO</h1>
        </div>
        <div className={styles.searchbar}>
          <SearchBar />
        </div>
        <div className={styles.navlinks}>
          <ul>
            {size.width > 1080 ? (
              <Navlinks isLoggedIn={isLoggedIn} logout={AuthService.logout} />
            ) : (
              <li className={styles.burger}>
                <Hamburger toggled={isOpen} toggle={setOpen} />
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header
