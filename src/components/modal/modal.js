import React, { useContext } from "react"
import ReactModal from "react-modal"
import bg from "../../images/background.png"
import { GlobalStateContext } from "../../context/provider"
import NavModal from "../navModal/navModal"
import Filters from "../filters/filters"
import { useDisableBodyScroll } from "../../hooks/useDisableBodyScroll"

const navModalStyles = {
  content: {
    position: "absolute",
    top: "10%",
    left: "10%",
    right: "10%",
    bottom: "10%",
    border: "1px solid #ccc",
    // background: "#1c2938",
    backgroundImage: `url(${bg})`,
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px",
  },
  overlay: {
    zIndex: 1000,
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

const filtersModalStyles = {
  content: {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    border: "1px solid #ccc",
    backgroundColor: "#ecc938",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: 0,
    // padding: "20px",
  },
  overlay: {
    zIndex: 1000,
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    margin: 0,
    padding: 0,
    // backgroundColor: "rgba(28,41,56,0.90)",
  },
}

const Modal = () => {
  const state = useContext(GlobalStateContext)
  useDisableBodyScroll(state.modalOpen)

  let style

  if (state.modalChild === "nav") {
    style = navModalStyles
  }

  if (state.modalChild === "filters") {
    style = filtersModalStyles
  }

  return (
    <ReactModal style={style} isOpen={state.modalOpen}>
      {state.modalChild === "nav" && <NavModal />}
      {state.modalChild === "filters" && <Filters />}
    </ReactModal>
  )
}
export default Modal
