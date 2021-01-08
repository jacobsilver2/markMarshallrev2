import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import ReactSlider from "react-slider"

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 25px;
`

const StyledThumb = styled.div`
  height: 25px;
  line-height: 25px;
  width: 25px;
  text-align: center;
  background-color: #000;
  color: #fff;
  border-radius: 50%;
  cursor: grab;
`

const Thumb = (props, state) => (
  <StyledThumb {...props}>{state.valueNow}</StyledThumb>
)

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${props =>
    props.index === 2 ? "#f00" : props.index === 1 ? "#0f0" : "#ddd"};
  border-radius: 999px;
`

const Track = (props, state) => <StyledTrack {...props} index={state.index} />

const StyledContainer = styled.div`
  resize: horizontal;
  overflow: auto;
  width: 50%;
  max-width: 100%;
  padding-right: 8px;
`

const ResizableSlider = () => {
  const containerRef = React.useRef()
  const sliderRef = React.useRef()
  React.useEffect(() => {
    if (typeof ResizeObserver === "undefined") {
      return
    }

    const resizeObserver = new ResizeObserver(() => {
      sliderRef.current.resize()
    })
    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.unobserve(containerRef.current)
    }
  })

  return (
    <StyledContainer ref={containerRef}>
      <StyledSlider
        ref={sliderRef}
        defaultValue={[50, 75]}
        renderTrack={Track}
        renderThumb={Thumb}
      />
      {/* <StyledSlider
        className="vertical-slider"
        markClassName="example-mark"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        defaultValue={[0, 50, 100]}
        marks={25}
        ariaLabel={["Lowest thumb", "Middle thumb", "Top thumb"]}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        orientation="vertical"
        invert
        pearling
        minDistance={10}
      /> */}
    </StyledContainer>
  )
}

export default ResizableSlider
