import React, { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Image, CloudinaryContext, Transformation } from "cloudinary-react"
import styles from "./uploadSongStyles.module.css"

const UploadSong = () => {
  const [audioFiles, setAudioFiles] = useState([])
  const onDrop = useCallback(acceptedFiles => {
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
    })
  }, [])

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
      <CloudinaryContext cloudName={process.env.GATSBY_CLOUDINARY_PUBLIC_ID}>
        {audioFiles &&
          audioFiles.map(file => (
            <div key={file.public_id}>
              <Image
                publicId={`${file.public_id}.png`}
                resourceType="video"
                cloudName="dplx6jxxo"
              >
                <Transformation
                  flags="waveform"
                  color="grey"
                  background="transparent"
                />
              </Image>
            </div>
          ))}
      </CloudinaryContext>
    </div>
  )
}

export default UploadSong
