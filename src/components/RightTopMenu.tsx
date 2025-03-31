/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useEffect, useRef, useState } from "react"
import { useMapState } from "../context/MapContext"
import {
  ChevronDown,
  ChevronUp,
  CouncilsIcon,
  DroneSpotIcon,
  FindMeIcon,
  InfoIcon,
  SearchIcon,
} from "./Icons"
import { IconButton } from "./Buttons"
import { searchRadiusOptions } from "../constants/defaults"

const RightTopMenu: React.FC = () => {
  const { mapState, mapController } = useMapState()
  const { isPopupOpen } = mapState

  const [isOpen, setIsOpen] = useState(true)

  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const [radiusOpen, setRadiusOpen] = useState(false)
  const radiusRef = useRef<HTMLDivElement>(null)

  const [searchRadius, setSearchRadius] = useState(5)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Close the search dropdown if click is outside
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false)
      }

      // Close the radius dropdown if click is outside
      if (radiusRef.current && !radiusRef.current.contains(event.target as Node)) {
        setRadiusOpen(false)
      }
    }

    // Add event listener when either search or radius dropdown is open
    if (searchOpen || radiusOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [searchOpen, radiusOpen])

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchRef.current?.querySelector("input")?.focus(), 100)
    }
  }, [searchOpen])

  const handleFindMeClick = () => {
    mapController.handleFindMe()
  }

  const handleParksVic = () => {
    console.log("Parks Vic")
    // mapController.handleParksVic
  }

  const handleCouncilsClick = () => {
    console.log("Councils")
    // mapController.handleCouncils
  }

  const handleDroneSpotClick = () => {
    console.log("Drone Spot")
    // mapController.handleDroneSpot
  }
  const handleInfoClick = () => {
    mapController.handleInfoModal(!isPopupOpen)
  }

  const handleSearchClick = () => {
    setSearchOpen(!searchOpen)
    // mapController.handleDroneSpot
  }

  const handleRadiusClick = () => {
    setRadiusOpen(!radiusOpen)
    mapController.handleRadiusUpdate(searchRadius)
  }

  const handleRadiusChange = (radius: number) => {
    setSearchRadius(radius)
    mapController.handleRadiusUpdate(radius)
  }

  return (
    <div css={[menuContainer, isOpen ? openStyle : closedStyle]}>
      {isOpen ? (
        <IconButton icon={<ChevronUp size={40} color="#000" />} onClick={() => setIsOpen(!isOpen)} />
      ) : (
        <IconButton icon={<ChevronDown size={40} color="#000" />} onClick={() => setIsOpen(!isOpen)} />
      )}

      {isOpen && (
        <div css={menuContent}>
          <div ref={searchRef} css={inputContainer}>
            <input
              type="text"
              disabled={!searchOpen}
              css={[searchInput, searchOpen && searchInputVisible]}
              placeholder="Search..."
            />
            <IconButton
              icon={<SearchIcon size={40} color="#000" />}
              css={css`
                z-index: 3;
              `}
              onClick={handleSearchClick}
            />
          </div>
          <IconButton icon={<FindMeIcon size={40} color="#000" />} onClick={handleFindMeClick} />

          {/* <IconButton icon={<ParksVicIcon size={40} color="#000" />} onClick={handleParksVic} /> */}
          <IconButton icon={<CouncilsIcon size={40} color="#000" />} sticky={true} onClick={handleCouncilsClick} />
          <IconButton icon={<DroneSpotIcon size={40} color="#000" />} sticky={true} onClick={handleDroneSpotClick} />

          <div ref={radiusRef} css={inputContainer}>
            <select
              css={[dropdownInput, radiusOpen && radiusInputVisible]}
              value={searchRadius}
              onChange={(e) => handleRadiusChange(Number(e.target.value))}
              disabled={!radiusOpen}
            >
              {searchRadiusOptions.map((radius) => (
                <option key={radius} value={radius}>
                  {radius} km
                </option>
              ))}
            </select>
            <IconButton
              label={`${searchRadius} km`}
              css={css`
                z-index: 3;
              `}
              onClick={handleRadiusClick}
            />
          </div>

          <IconButton
            icon={<InfoIcon size={40} color="#000" />}
            onClick={handleInfoClick}
            css={isPopupOpen && css`
              pointer-events: none;
            `}
          />
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
  display: flex;
  flex-direction: column;
  align-items: center; /* Centers items vertically */
  gap: 10px;
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
  align-items: center; /* Ensure all buttons, including search, are centered */
  gap: 8px;
  margin-top: 10px;
`
const inputContainer = css`
  position: relative;
  display: flex;
  align-items: center; /* Ensures vertical alignment */
  justify-content: center;
  width: 50px; /* Initially, only the button is visible */
`
const searchInput = css`
  position: absolute;
  z-index: 1
  right: 0;
  height: 50px;
  width: 0;
  opacity: 0;
  border: none;
  padding: 0 10px;
  font-size: 16px;
  transition: width 0.3s ease, opacity 0.3s ease;
  border-radius: 5px;
`
const searchInputVisible = css`
  width: 200px;
  opacity: 1;
  right: 65px; /* Push left of button */
  background: white;
  border: 1px solid #ccc;
`
const dropdownInput = css`
  position: absolute;
  right: 0;
  height: 50px;
  width: 0;
  opacity: 0;
  border: none;
  padding: 0 10px;
  font-size: 16px;
  transition: width 0.3s ease, opacity 0.3s ease;
  border-radius: 5px;
`
const radiusInputVisible = css`
  width: 200px;
  opacity: 1;
  right: 65px; /* Push left of button */
  background: white;
  border: 1px solid #ccc;
  padding-right: 30px; /* Adjust this for spacing */
  appearance: none; /* Removes default styling */
  //   /* Custom Chevron style */
  //   &::after {
  //     content: "▼"; /* Use a Unicode character for the chevron */
  //     position: absolute;
  //     right: 10px; /* Position it to the right of the input */
  //     top: 50%;
  //     transform: translateY(-50%); /* Center vertically */
  //     font-size: 20px; /* Adjust the size here */
  //     color: red; /* Chevron color */
  //   }
`
