import React, { useContext } from "react"
import ReactModal from "react-modal"
import Header from "../header/header"
import Sidebar from "../sidebar/sidebar"
import Footer from "../footer/footer"
import Modal from "../modal/modal"

import bg from "../../images/background.png"
import style from "./layoutStyle.module.css"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const Layout = ({ children }) => {
  ReactModal.setAppElement("#___gatsby")
  return (
    <div className={style.layoutMain}>
      <Modal />
      <Header />
      <Sidebar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
