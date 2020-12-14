import React, { useReducer, createContext } from "react"

export const GlobalStateContext = createContext()
export const GlobalDispatchContext = createContext()

const initialState = {
  currentTrackUrl: "",
  currentTrackTitle: "No track selected",
  currentTrackPosition: 0,
  isPlaying: false,
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
        currentTrackPosition: action.position,
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
