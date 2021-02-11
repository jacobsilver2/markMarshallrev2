import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Home from "../components/home/home"

const IndexPage = ({ data }) => {
  return (
    <>
      <SEO title="Home" />
      <Home />
    </>
  )
}

export default IndexPage

export const coverQuery = graphql`
  query coverQuery {
    file(name: { eq: "cover" }) {
      id
      childImageSharp {
        fluid(maxHeight: 500) {
          ...GatsbyImageSharpFluid
        }
      }
      publicURL
    }
  }
`
