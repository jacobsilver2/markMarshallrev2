import React, { useContext } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import { AuthService, useAuth } from "gatsby-theme-auth0"
import { GlobalDispatchContext } from "../../context/provider"
import navLinksArr from "../../lib/navLinksArr"
import styles from "./navModalStyle.module.css"

const NavModal = () => {
  const { isLoggedIn } = useAuth()
  const dispatch = useContext(GlobalDispatchContext)

  const mappedNavLinks = navLinksArr.map(navLink => (
    <li className={styles.link} key={navLink.name}>
      <Link
        onClick={() => dispatch({ type: "TOGGLE_MODAL" })}
        to={navLink.route}
      >
        {navLink.name}
      </Link>
    </li>
  ))

  const data = useStaticQuery(graphql`
    query modalImgQuery {
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
  return (
    <div className={styles.container}>
      <button
        className={styles.close}
        onClick={() => dispatch({ type: "TOGGLE_MODAL" })}
      >
        CLOSE
      </button>
      <ul className={styles.list}>
        <li className={`${styles.link} ${styles.logo}`}>
          <Link onClick={() => dispatch({ type: "TOGGLE_MODAL" })} to="/">
            <div style={{ width: "75px" }}>
              <Img fluid={data.file.childImageSharp.fluid} />
            </div>
          </Link>
        </li>
        {mappedNavLinks}
        {isLoggedIn ? (
          <>
            <li className={styles.link}>
              <Link
                onClick={() => dispatch({ type: "TOGGLE_MODAL" })}
                to="/waveformGenerator"
              >
                Waveform
              </Link>
            </li>
            <li className={styles.link}>
              <button onClick={AuthService.logout}>Log Out</button>
            </li>
          </>
        ) : (
          ""
        )}
      </ul>
    </div>
  )
}

export default NavModal
