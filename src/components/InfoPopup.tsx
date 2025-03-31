/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from "react"
import { css } from "@emotion/react"
import { useMapState } from "../context/MapContext"
import { InfoContent } from "../constants/InfoContent"

const InfoModal: React.FC = () => {
  const { mapState, mapController } = useMapState()
  const modalRef = useRef<HTMLDivElement>(null)

  const closeModal = () => {
    mapController.handleInfoModal(false)
  }

  // Close the modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (!mapState.isPopupOpen) return null

  return (
    <div ref={modalRef} css={modalStyle}>
      <button onClick={closeModal} css={closeButtonStyle}>
        X
      </button>
      <InfoContent />
    </div>
  )
}

export default InfoModal

const modalStyle = css`
  width: 600px;
  height: auto;
  max-width: 90%;
  margin-top: 3vh;
  margin-left: auto;
  margin-right: auto;
  border-radius: 12px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow-y: auto;
  max-height: 85vh;
`;

const closeButtonStyle = css`
  position: absolute;
  top: 10px; /* Distance from the top */
  right: 10px; /* Distance from the right */
  background-color: transparent;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 50%; /* Circular button for style */
  color: #f44336; /* Close button color */
  font-size: 18px; /* Font size for the close icon */
`
