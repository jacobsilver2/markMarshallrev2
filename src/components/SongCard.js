import React, { useContext } from "react"
import { Link } from "gatsby"
import { GlobalStateContext, GlobalDispatchContext } from "../context/provider"
import Img from "gatsby-image"
import Pause from "../assets/svg/pause"
import Play from "../assets/svg/play"
import PlayButton from "../assets/svg/PlayButton.svg"
import slugify from "../lib/slugify"

const SongCard = ({ song }) => {
  const dispatch = useContext(GlobalDispatchContext)
  const {
    contentful_id,
    tempo,
    soundsLike,
    instrumentation,
    waveformImage,
    audio,
    title,
    description,
    composer,
    createAt,
    genre,
    mood,
  } = song

  function handlePlayPause() {
    dispatch({
      type: "SET_CURRENT_TRACK",
      url: audio.file.url,
      title,
    })
  }

  return (
    <div className="bg-white shadow-lg rounded-lg mb-2">
      <div className="flex w-full">
        <div className="w-full p-8">
          <div className="flex justify-between">
            <div>
              <Link to={`/music/${slugify(song.title)}`}>
                <h3 className="text-2xl text-grey-darkest font-medium">
                  {song.title}
                </h3>
              </Link>
              <p className="text-sm text-grey mt-1">
                {composer && composer.join(", ")}
              </p>
            </div>
          </div>
          <div className="flex outline-none justify-between items-center mt-8">
            <button
              onClick={handlePlayPause}
              type="button"
              className="text-white p-8 rounded-full bg-red-500 hover:bg-red-700 shadow-lg"
            >
              <Pause />
              {/* <PlayButton className="text-white-100" /> */}
            </button>
            <div className="flex-grow pl-8">
              {waveformImage && <Img fluid={waveformImage.fluid} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SongCard
