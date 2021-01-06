import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Home from "../components/home/home"
// import styles from "../styles/homepageStyle.module.css"
// import bg from "../images/background.png"

const IndexPage = ({ data }) => {
  return (
    <>
      <SEO title="Home" />
      <Home />
      {/* <Img
        style={{ height: "100%", width: "100%" }}
        imgStyle={{ objectFit: "contain" }}
        fluid={data.file.childImageSharp.fluid}
      /> */}
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
