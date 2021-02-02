import React from "react"
import GlobalContextProvider from "./src/context/provider"
import { AudioPlayerProvider } from "react-use-audio-player"
import Layout from "./src/components/layout/layout"
import "tailwindcss/base.css"
import "tailwindcss/components.css"
import "tailwindcss/utilities.css"
import "./src/assets/tailwind.css"

export const wrapRootElement = ({ element, props }) => {
  return (
    <GlobalContextProvider>
      <AudioPlayerProvider>
        <Layout {...props}>{element}</Layout>
      </AudioPlayerProvider>
    </GlobalContextProvider>
  )
}
