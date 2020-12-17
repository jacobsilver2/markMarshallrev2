import React from "react"
import { Link } from "gatsby"
import { AuthService, useAuth } from "gatsby-theme-auth0"
import SearchBar from "./searchbar"

import headerStyles from "../styles/headerStyle.module.css"

const Header = () => {
  const { isLoggedIn, profile } = useAuth()
  const name = profile ? profile.name : ""

  function toggleDD(myDropMenu) {
    document.getElementById(myDropMenu).classList.toggle("invisible")
  }

  return (
    <header className="bg-gray-800">
      <div className={headerStyles.container}>
        <div className={headerStyles.logo}>
          <h1>LOGO</h1>
        </div>
        <div className={headerStyles.searchbar}>
          <SearchBar />
        </div>
        <div className={headerStyles.navlinks}>
          <ul className="list-reset flex justify-between flex-1 md:flex-none">
            <li className="flex-1 md:flex-none md:mr-3">
              <Link
                className="inline-block  px-4 text-white no-underline hover:text-purple-500"
                to="/music"
              >
                Music
              </Link>
            </li>
            <li className="flex-1 md:flex-none md:mr-3">
              <Link
                className="inline-block  px-4 text-white no-underline hover:text-purple-500 hover:text-underline"
                to="/playlists"
              >
                Playlists
              </Link>
            </li>
            <li className="flex-1 md:flex-none md:mr-3">
              <Link
                className="inline-block  px-4 text-white no-underline hover:text-purple-500 hover:text-underline"
                to="/about"
              >
                About
              </Link>
            </li>

            <li className="flex-1 md:flex-none md:mr-3">
              <Link
                className="inline-block  px-4 text-white no-underline hover:text-purple-500 hover:text-underline"
                to="/contact"
              >
                Contact
              </Link>
            </li>

            {isLoggedIn ? (
              <li className="flex-1 md:flex-none md:mr-3">
                <div className="relative inline-block">
                  <button
                    onClick={() => toggleDD("myDropdown")}
                    className="drop-button text-white focus:outline-none"
                  >
                    {" "}
                    <span className="pr-2">
                      <i className="em em-robot_face"></i>
                    </span>{" "}
                    Hi, {name}{" "}
                    <svg
                      className="h-3 fill-current inline"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </button>
                  <div
                    id="myDropdown"
                    className="dropdownlist absolute bg-gray-800 text-white right-0 mt-3 p-3 overflow-auto z-30 invisible"
                  >
                    <Link
                      to="/dashboard"
                      className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"
                    >
                      <i className="fa fa-cog fa-fw"></i> Dashboard
                    </Link>
                    <div className="border border-gray-800"></div>
                    <button
                      onClick={AuthService.logout}
                      className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"
                    >
                      <i className="fas fa-sign-out-alt fa-fw"></i> Log Out
                    </button>
                  </div>
                </div>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header
