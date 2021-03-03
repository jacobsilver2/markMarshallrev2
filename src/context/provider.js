import React, { useReducer, createContext } from "react"

export const GlobalStateContext = createContext()
export const GlobalDispatchContext = createContext()

const initialState = {
  currentTrackUrl: "",
  currentTrackTitle: "---",
  currentTime: 0,
  isPlaying: false,
  modalOpen: false,
  modalChild: "",
  flippedPlaylistCard: null,
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_CURRENT_TRACK": {
      return {
        ...state,
        currentTrackUrl: action.url,
        currentTrackTitle: action.title,
      }
    }
    case "SET_CURRENT_TRACK_POSITION": {
      return {
        ...state,
        currentTime: action.currentTime,
      }
    }
    case "SET_ISPLAYING_TRUE": {
      return {
        ...state,
        isPlaying: true,
      }
    }
    case "SET_ISPLAYING_FALSE": {
      return {
        ...state,
        isPlaying: false,
      }
    }
    case "TOGGLE_PLAYING": {
      return {
        ...state,
        isPlaying: !state.isPlaying,
      }
    }
    case "TOGGLE_MODAL": {
      return {
        ...state,
        modalOpen: !state.modalOpen,
      }
    }
    case "MODAL_OFF": {
      return {
        ...state,
        modalOpen: false,
      }
    }
    case "SET_MODAL_CHILD": {
      return {
        ...state,
        modalChild: action.modalChild,
      }
    }
    case "SET_FLIPPED_PLAYLIST_CARD": {
      return {
        ...state,
        flippedPlaylistCard:
          action.id === state.flippedPlaylistCard ? null : action.id,
      }
    }
    default:
      throw new Error("Bad Action Type")
  }
}

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export default GlobalContextProvider
