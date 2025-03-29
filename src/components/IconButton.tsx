/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import React, { ReactNode } from "react"
import { useState } from "react"

interface IconButtonProps {
  onClick: () => void
  icon: ReactNode
  className?: string
  size?: number
  color?: string
  css?: any
  active?: boolean
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon,
  className,
  size = 40,
  color = "white",
  css,
  active = false,
}) => {
  const [isActive, setIsActive] = useState(active)

  const handleClick = () => {
    setIsActive((prev) => !prev)
    onClick()
  }

  return (
    <button
      onClick={handleClick}
      className={className}
      css={[
        buttonBaseStyle(size, isActive ? "yellow" : color), // Change color when active
        css,
      ]}
    >
      {icon}
    </button>
  )
}

export default IconButton

// Default button styles
const buttonBaseStyle = (size: number, color: string) => css`
  width: ${size}px;
  height: ${size}px;
  background-color: ${color};
  border: 1ps solid gray;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgb(165, 204, 246);
  }
`
