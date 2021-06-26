import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import AboutComponent from "../components/about/about"

const AboutPage = ({ data }) => {
  const { fluid } = data.file.childImageSharp
  return (
    <>
      <SEO title="about" />
      <AboutComponent img={fluid} />
    </>
  )
}

export default AboutPage

export const bioPicQuery = graphql`
  query bioPicQuery {
    file(name: { eq: "bioPic" }) {
      id
      childImageSharp {
        fluid(maxWidth: 1200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
