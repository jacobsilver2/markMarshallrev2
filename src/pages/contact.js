import React from "react"
import SEO from "../components/seo"

const ContactPage = () => {
  return (
    <>
      <SEO title="contact" />
      <div
        style={{
          color: "white",
          display: "grid",
          height: "100%",
          padding: "0 2em",
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
        }}
      >
        For more info about licensing or an original score for film, tv, or
        video games, please email me at futurerelicsmusic at gmail.com
      </div>
    </>
  )
}

export default ContactPage
