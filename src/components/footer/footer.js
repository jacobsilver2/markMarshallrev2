import React from "react"
import Player from "../player/Player"
import styles from "./footerStyle.module.css"
import bg from "../../images/background.png"

const Footer = () => {
  return (
    <footer
      style={{
        backgroundImage: `url(${bg})`,
        objectFit: "none",
        backgroundSize: "200px",
      }}
      className={styles.container}
    >
      <Player />
    </footer>
  )
}

export default Footer
