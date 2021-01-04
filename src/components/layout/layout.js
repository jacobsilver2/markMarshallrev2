import React, { useContext } from "react"
import ReactModal from "react-modal"
import GlobalContextProvider from "../../context/provider"
import Header from "../header/header"
import Sidebar from "../sidebar/sidebar"
import Footer from "../footer/footer"
import Modal from "../modal/modal"

import bg from "../../images/background.png"
import style from "./layoutStyle.module.css"

const Layout = ({ children }) => {
  ReactModal.setAppElement("#___gatsby")
  return (
    <div className={style.layoutMain}>
      <Modal />
      <Header />
      <Sidebar />
      <main
        style={{
          backgroundImage: `url(${bg})`,
          objectFit: "none",
          backgroundSize: "200px",
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
