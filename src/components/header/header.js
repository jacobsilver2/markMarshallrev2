import React, { useContext } from "react"
import { AuthService, useAuth } from "gatsby-theme-auth0"
import { Link, graphql, useStaticQuery } from "gatsby"
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../../context/provider"
import SearchBar from "../search/searchbar"
import Hamburger from "hamburger-react"
import useWindowSize from "../../hooks/useWindowSize"
import styles from "./headerStyle.module.css"
import Navlinks from "../navlinks/navlinks"
import Img from "gatsby-image"
import bg from "../../images/background.png"

const Header = () => {
  const size = useWindowSize()
  const { isLoggedIn } = useAuth()
  const state = useContext(GlobalStateContext)
  const dispatch = useContext(GlobalDispatchContext)

  const data = useStaticQuery(graphql`
    query logoQuery {
      file(name: { eq: "logo" }) {
        id
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  function handleBurgerToggle() {
    dispatch({ type: "SET_MODAL_CHILD", modalChild: "nav" })
    dispatch({ type: "TOGGLE_MODAL" })
  }

  return (
    <header
      style={{
        backgroundImage: `url(${bg})`,
        objectFit: "none",
        backgroundSize: "200px",
      }}
    >
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">
            <div style={{ width: "75px" }}>
              <Img fluid={data.file.childImageSharp.fluid} />
            </div>
          </Link>
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
                <Hamburger
                  toggled={state.modalOpen && state.modalChild === "nav"}
                  toggle={handleBurgerToggle}
                />
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header
