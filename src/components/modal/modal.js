import React, { useContext } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import { AuthService, useAuth } from "gatsby-theme-auth0"
import ReactModal from "react-modal"
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../../context/provider"
import styles from "./modalStyle.module.css"
import navLinksArr from "../../lib/navLinksArr"

const customStyles = {
  content: {
    position: "absolute",
    top: "10%",
    left: "10%",
    right: "10%",
    bottom: "10%",
    border: "1px solid #ccc",
    background: "#1c2938",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px",
  },
  overlay: {
    zIndex: 2,
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(28,41,56,0.90)",
    // opacity: "50%",
    // margin: "1%",
  },
}

const Modal = () => {
  const { isLoggedIn } = useAuth()
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
  const state = useContext(GlobalStateContext)
  const dispatch = useContext(GlobalDispatchContext)

  const data = useStaticQuery(graphql`
    query modalLogoQuery {
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
    <ReactModal style={customStyles} isOpen={state.modalOpen}>
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
          {mappedNavLinks}{" "}
          {isLoggedIn ? (
            <>
              <li className={styles.link}>
                <Link
                  onClick={() => dispatch({ type: "TOGGLE_MODAL" })}
                  to="/dashboard"
                >
                  Dashboard
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
    </ReactModal>
  )
}
export default Modal
