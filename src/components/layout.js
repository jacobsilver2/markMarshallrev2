import React from "react"
import PropTypes from "prop-types"

import GlobalContextProvider from "../context/provider"
import Header from "./header"
import Sidebar from "./sidebar"
import Footer from "./footer"
import Searchbar from "./searchbar"

const Layout = ({ children, location }) => {
  return (
    <div className="bg-gray-800 font-sans leading-normal tracking-normal mt-12">
      <GlobalContextProvider>
        <Header />
        <div className="flex flex-col md:flex-row">
          <Sidebar location={location} />
          <div className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
            <Searchbar />
            {children}
          </div>
        </div>
        <Footer />
      </GlobalContextProvider>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
