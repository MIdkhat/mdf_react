/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react"
import { css } from '@emotion/react';
import Modal from "react-modal"
import { useMapState } from "../context/MapContext"
import { InfoContent } from "../constants/InfoContent"

const InfoModal: React.FC = () => {
    const { mapState, mapController } = useMapState();

    // Close the modal by calling the controller's method
    const closeModal = () => {
      mapController.handleInfoModal(false);
    };

    useEffect(() => {
      // Set up event listener for clicking outside the modal to close it
      const handleClickOutside = (event: MouseEvent) => {
        const modalElement = document.getElementById("info-modal");
        if (modalElement && !modalElement.contains(event.target as Node)) {
          closeModal();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [mapState.isPopupOpen]);

    if (!mapState.isPopupOpen) return null;

    return (
      <Modal
        id="info-modal"
        isOpen={mapState.isPopupOpen}
        onRequestClose={closeModal}
        ariaHideApp={false} // For accessibility
        style={{
          content: {
            width: "600px", // Modal width
            height: "auto",
            maxWidth: "90%", // Responsive width
            margin: "auto",
            borderRadius: "12px", // Rounded corners
            padding: "20px", // Padding inside the modal
            backgroundColor: "#fff", // Background color
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Shadow for a little lift effect
            position: "relative", // Ensure the modal content can position the button
            overflowY: "auto", // Scrollable content
            maxHeight: "80vh", // Limit max height of the modal
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay dark background
          },
        }}
      >
        <button onClick={closeModal} css={closeButtonStyle}>
          X
        </button>
        <InfoContent />
      </Modal>
    );
  };

export default InfoModal

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
