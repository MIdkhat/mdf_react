/** @jsxImportSource @emotion/react */
import React from "react"
import { css } from "@emotion/react"
import { useMapState } from "../context/MapContext"
import { FindMeIcon } from "./icons/FindMeIcon"
// import FindMeIcon from "../assets/circle.svg";
// import { ReactComponent as FindMeIcon } from "../assets/circle.svg"
// const MyIcon = React.lazy(() => import('../assets/find-me.svg'));

const buttonStyle = css`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  width: 50px;
  height: 50px;
  background-color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color:rgb(165, 204, 246);
  }
`

const FindMeButton = () => {
  const [mapState, setMapState] = useMapState()

  const handleFindMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        setMapState((prevState) => ({
          ...prevState,
          center: [longitude, latitude],
          zoom: 16, // Zoom in when the user is found
        }))
      })
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }
console.log(FindMeIcon)
  return (
    <button onClick={handleFindMe} css={buttonStyle}>
      <FindMeIcon size={40} color="#000"/>
    </button>
  )
}

export default FindMeButton
