/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useState } from "react"
import { useMapState } from "../context/MapContext"
import { CouncilsIcon, DroneSpotIcon, FindMeIcon, InfoIcon, ParksVicIcon, SearchIcon } from "./Icons"
import IconButton from "./IconButton"

const RightTopMenu: React.FC = () => {
  const { mapState, mapController } = useMapState()
  const [isOpen, setIsOpen] = useState(true)

  const handleFindMe = () => {
    console.log("Find Me")
    mapController.handleFindMe()
  }

  const handleParksVic = () => {
    console.log("Parks Vic")
    // mapController.handleParksVic
  }

  const handleCouncils = () => {
    console.log("Councils")
    // mapController.handleCouncils
  }

    const handleDroneSpot = () => {
        console.log("Drone Spot")
        // mapController.handleDroneSpot
    }

    const handleInfo = () => {
        console.log("info")
        // mapController.handleDroneSpot
    }

    const handleSearch = () => {
        console.log("info")
        // mapController.handleDroneSpot
    }

  return (
    <div css={[menuContainer, isOpen ? openStyle : closedStyle]}>
      <button onClick={() => setIsOpen(!isOpen)} css={toggleButton}>
        {isOpen ? "Hide" : "Open"}
      </button>

      {isOpen && (
        <div css={menuContent}>

          {/* <IconButton icon={<ParksVicIcon size={40} color="#000" />} onClick={handleParksVic} /> */}
          <IconButton icon={<CouncilsIcon size={40} color="#000" />} onClick={handleCouncils} />
          <IconButton icon={<DroneSpotIcon size={40} color="#000" />} onClick={handleDroneSpot} />
          <IconButton icon={<FindMeIcon size={40} color="#000" />} onClick={handleFindMe} />
          <IconButton icon={<SearchIcon size={40} color="#000" />} onClick={handleSearch} />
          <IconButton icon={<InfoIcon size={40} color="#000" />} onClick={handleInfo} />
        </div>
      )}
    </div>
  )
}

export default RightTopMenu

const menuContainer = css`
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 1000;
  transition: width 0.3s ease, height 0.3s ease;
`

const openStyle = css`
  width: auto;
  height: auto;
`

const closedStyle = css`
  width: 50px;
  height: 40px;
  overflow: hidden;
`

const toggleButton = css`
  width: 100%;
  background: lightgray;
  border: none;
  padding: 5px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 12px;
  &:hover {
    background: gray;
    color: white;
  }
`

const menuContent = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
`
