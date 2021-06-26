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
          fontSize: "clamp(3vw, 3.5vw, 4vw)",
        }}
      >
        <p style={{ paddingBottom: "1em" }}>
          For more info about licensing or an original score for film, tv, or
          video games, please contact me at:
        </p>
        <p>futurerelicsmusic at gmail.com</p>
        <p>646-715-6538</p>
      </div>
    </>
  )
}

export default ContactPage
