import React from "react"
import Img from "gatsby-image"
import styles from "./aboutStyle.module.css"
const About = ({ img }) => {
  return (
    <div className={styles.container}>
      <div style={{ color: "white" }}>
        <p style={{ padding: "1em 0" }}>
          Brooklyn-based Mark Marshall has taken his years of experience and
          expertise -- a bootcamp spent touring as a guitarist and recording
          with notable musicians in many genres -- and has dedicated his
          creative output to composition projects that wield instruments, tape
          machines, samplers, and microphones in the same way an artist uses
          paint, charcoal and ink. For Marshall, composition is an experimental
          adventure.
        </p>
        <p style={{ padding: "1em 0", fontStyle: "italic" }}>
          “Sound has to evoke emotion. So the creation of sound is very much
          about finding exactly how to conjure that emotion.”
        </p>
        <p style={{ padding: "1em 0" }}>
          Mark Marshall’s obsessive interest in the creation of sound to
          properly express and shape emotion has taken his work to new heights.
          Marshall’s unique approach to composition, instrument choice,
          recording technique, and mixing options harkens back to his refusal to
          fit neatly in a box, coupled with his time-tested talent and
          experience on the road and in the studio.
        </p>
        <details style={{ paddingBottom: "1em" }}>
          <summary style={{ cursor: "pointer" }}>EXPERIENCE</summary>
          <p style={{ paddingTop: "1em", paddingLeft: "1em" }}>
            On the road, Marshall has played major music festivals, including
            Mountain Jam and New Orleans Jazz Fest; toured internationally and
            recorded on the BBC; performed at both Lincoln Center Outdoors and
            Lincoln Center Jazz; shared the stage with Phil Lesh and Levon Helm;
            toured with Sister Sparrow and Amy Helm; and performs regularly as
            one-half of Fife and Drom, a political blues project. In the studio,
            he produced Jenna Nicholls{" "}
            <a
              href="https://open.spotify.com/album/6a6dSVDgT3fTJ5HZCP7iQ2"
              target="_blank"
              rel="noreferrer noopener"
            >
              Radio Parade
            </a>{" "}
            record; was both producer/session musician on Jenna Torres’ Thinking
            with my Heart; stepped in seamlessly to sessions with pop icon Sara
            Bareillies; and most recently produced, recorded and mixed Abby
            Ahmad’s{" "}
            <a
              href="https://smarturl.it/teawithshadows"
              target="_blank"
              rel="noreferrer noopener"
            >
              Tea with Shadows
            </a>
            , a long awaited follow-up to Curriculum, the album which bonded the
            two in work and in life. With the support of numerous corporate
            music endorsements, he spent years writing for{" "}
            <a
              href="https://www.premierguitar.com/u/mark_marshall"
              target="_blank"
              rel="noreferrer noopener"
            >
              Premier Guitar
            </a>{" "}
            Magazine on guitar technique and philosophy; authored a book on
            music theory,{" "}
            <a
              href="https://www.anatomyofguitartone.com/store/practice-makes-progress"
              target="_blank"
              rel="noreferrer noopener"
            >
              Practice Makes Progress
            </a>
            ; created a video series on recording, mixing, and producing
            electric guitar for{" "}
            <a
              href="https://theproaudiofiles.com/producing-and-recording-electric-guitar/"
              target="_blank"
              rel="noreferrer noopener"
            >
              The Pro Audio Files
            </a>
            ; and managed a guitar blog called{" "}
            <a
              href="https://www.anatomyofguitartone.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Anatomy of Guitar Tone
            </a>
            .
          </p>
        </details>
        <details style={{ paddingBottom: "1em" }}>
          <summary style={{ cursor: "pointer" }}>APPROACH</summary>
          <p
            style={{
              paddingTop: "1em",
              paddingBottom: "1em",
              paddingLeft: "1em",
            }}
          >
            The vast majority of music Marshall makes is with real instruments,
            not sample libraries, which includes everything from grand piano,
            actual mellotrons, analog synths, amplified guitars, and traditional
            drum kits, which means everything he makes has its own character and
            doesn’t feel canned or clinical.
          </p>
          <p style={{ paddingBottom: "1em", paddingLeft: "1em" }}>
            Some of Marshall’s compositions time travel by referencing a
            specific era to evoke feelings of nostalgia or forge place-based
            associations. He has a deep understanding of compositional and sonic
            choices: “It’s essential for an 80’s-style song to not only use 80's
            motifs but also feel like it was recorded in the '80s.”
          </p>
          <p style={{ paddingBottom: "1em", paddingLeft: "1em" }}>
            Along with this ability came a broad taste of musical styles:
            “Instead of mimicking a musical style, my goal is to embody it --
            similar to, say, method acting. When I'm composing a minimalist
            piece, I'm not the person who also has a deep knowledge of delta
            blues (unless, for instance, I want to combine the styles). I live
            in character. This is what has allowed me to write in a range of
            genres with an expert’s flair.”
          </p>
          <p style={{ paddingBottom: "1em", paddingLeft: "1em" }}>
            This kind of range in composition allows Marshall, with his
            abilities and sensibilities, to jump through genres, convincingly,
            like a chameleon or a speaker of several languages. His “feeling
            before theory” approach makes room for collaborators to express the
            needs of a project with either concrete or abstract descriptors
            (“make it sound more green” or “can it sound like the desert?”) from
            which Marshall is able to make meaning and music.
          </p>
          <p style={{ paddingLeft: "1em" }}>
            Marshall is wildly creative and experimental, but is also skillful
            collaborator, meeting strict deadlines, taking direction where
            appropriate and is wholly organized -- down to the expansive sound
            library he’s recently created called “Future Relics”.
          </p>
        </details>
        <details style={{ paddingBottom: "1em" }}>
          <summary style={{ cursor: "pointer" }}>
            WHAT IS <b>FUTURE RELICS</b>
          </summary>
          <p style={{ paddingTop: "1em", paddingLeft: "1em" }}>
            With his heart gravitating to the past and his mind looking towards
            the future, Marshall believes everything that is new will someday
            become a relic. Although the music he makes is rooted in the most
            vintage of vibes, it is also ahead of its time and therefore, part
            of the future. For those that want to time travel with Marshall
            through eras of music history while making something completely new,
            Future Relics is a storehouse of possibilities and a library for
            those who care to dream.
          </p>
        </details>
      </div>
      <Img fadeIn fluid={img} />
    </div>
  )
}

export default About
