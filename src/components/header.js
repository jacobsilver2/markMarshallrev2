import React from "react"
import { Link } from "gatsby"
import { AuthService, useAuth } from "gatsby-theme-auth0"

const Header = ({ siteTitle }) => {
  const { isLoggedIn, profile } = useAuth()
  const name = profile ? profile.name : ""

  function toggleDD(myDropMenu) {
    document.getElementById(myDropMenu).classList.toggle("invisible")
  }

  // function filterDD(myDropMenu, myDropMenuSearch) {
  //   const input = document.getElementById(myDropMenuSearch)
  //   const filter = input.value.toUpperCase()
  //   const div = document.getElementById(myDropMenu)
  //   const a = div.getElementsByTagName("a")
  //   for (const i = 0; i < a.length; i++) {
  //     if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
  //       a[i].style.display = ""
  //     } else {
  //       a[i].style.display = "none"
  //     }
  //   }
  // }

  return (
    <nav className="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">
      <div className="flex flex-wrap items-center">
        {/* <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
          <a href="#">
            <span className="text-xl pl-2">
              <i className="em em-grinning"></i>
            </span>
          </a>
        </div> */}

        <div className="flex w-full pt-2 content-center justify-between md:justify-end">
          <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
            <li className="flex-1 md:flex-none md:mr-3">
              <Link
                className="inline-block py-2 px-4 text-white no-underline hover:text-gray-200 hover:text-underline"
                to="/music"
              >
                Music
              </Link>
            </li>
            <li className="flex-1 md:flex-none md:mr-3">
              <Link
                className="inline-block py-2 px-4 text-white no-underline hover:text-gray-200 hover:text-underline"
                to="/playlists"
              >
                Playlists
              </Link>
            </li>
            <li className="flex-1 md:flex-none md:mr-3">
              <Link
                className="inline-block py-2 px-4 text-white no-underline hover:text-gray-200 hover:text-underline"
                to="/about"
              >
                About
              </Link>
            </li>

            <li className="flex-1 md:flex-none md:mr-3">
              <Link
                className="inline-block py-2 px-4 text-white no-underline hover:text-gray-200 hover:text-underline"
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
    </nav>
  )
}

export default Header
