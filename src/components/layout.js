import React from "react"
import PropTypes from "prop-types"

import GlobalContextProvider from "../context/provider"
import Header from "./header"
import Sidebar from "./sidebar"
import Footer from "./footer"
import Searchbar from "./searchbar"

import layoutStyles from "../styles/layoutStyle.module.css"

const Layout = ({ children, location }) => {
  return (
    <>
      <GlobalContextProvider>
        <div className={layoutStyles.layoutMain}>
          <Header />
          <Sidebar location={location} />
          <main>{children}</main>
          <Footer />
        </div>
      </GlobalContextProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
