import React, { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import {
  Image,
  Audio,
  CloudinaryContext,
  Transformation,
} from "cloudinary-react"
import styles from "./uploadSongStyles.module.css"

const UploadSong = () => {
  const [waveformImages, setWaveformImages] = useState([])
  const [audioFiles, setAudioFiles] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const onDrop = useCallback(acceptedFiles => {
    // console.log(acceptedFiles)

    acceptedFiles.forEach(async acceptedFile => {
      const formData = new FormData()
      formData.append("file", acceptedFile)
      formData.append("upload_preset", "mark-marshall")

      const response = await fetch(process.env.GATSBY_CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      setAudioFiles(old => [...old, data])
      // console.log(data)
      await createWaveformImage(data.url)
    })
  }, [])

  const createWaveformImage = async url => {
    const newUrl = url
      .replace(
        "http://res.cloudinary.com/dplx6jxxo/video/upload/",
        "https://res.cloudinary.com/dplx6jxxo/video/upload/fl_waveform,co_grey,b_transparent/"
      )
      .replace("mp3", "png")
    setIsLoading(true)
    const response = await fetch(newUrl)
    // console.log(response)
    // const data = await response.json()
    // console.log(data)
    setWaveformImages(old => [...old, response])
    setIsLoading(false)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "audio/*",
    multiple: false,
  })

  return (
    <div className={styles.container}>
      <div
        {...getRootProps()}
        className={`${styles.dropzone} ${isDragActive ? styles.active : null}`}
      >
        <input {...getInputProps()} />
        Drag an audio file into here generate a waveform image.
      </div>
      {/* <CloudinaryContext cloudName={process.env.GATSBY_CLOUDINARY_PUBLIC_ID}>
        {audioFiles &&
          audioFiles.map(file => (
            <div key={file.public_id}>
              <Audio controls publicId={file.public_id} />
            </div>
          ))}
      </CloudinaryContext> */}
      {isLoading && <p>Generating Waveform Image</p>}
      {waveformImages &&
        waveformImages.map(wfImg => <img key={wfImg.url} src={wfImg.url} />)}
    </div>
  )
}

export default UploadSong
