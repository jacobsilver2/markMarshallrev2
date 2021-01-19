import React from "react"
import GlobalContextProvider from "./src/context/provider"
import Layout from "./src/components/layout/layout"
import "tailwindcss/base.css"
import "tailwindcss/components.css"
import "tailwindcss/utilities.css"
import "./src/assets/tailwind.css"

export const wrapRootElement = ({ element, props }) => {
  return (
    <GlobalContextProvider>
      <Layout {...props}>{element}</Layout>
    </GlobalContextProvider>
  )
}
