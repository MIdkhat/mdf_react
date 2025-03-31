/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import React, { ReactNode } from "react"
import { useState } from "react"

interface IconButtonProps {
  onClick: () => void
  icon?: ReactNode
  label?: string
  className?: string
  size?: number
  color?: string
  css?: any
  sticky?: boolean
  active?: boolean
}

export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon,
  label,
  className,
  size = 40,
  color = "white",
  css,
  sticky = false,
  active = false,
}) => {
  const [isActive, setIsActive] = useState(active)

  const handleClick = () => {
    if (sticky )setIsActive((prev) => !prev)
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
      {label ? <span css={labelStyle}>{label}</span> : icon}
    </button>
  )
}

// Default button styles
const buttonBaseStyle = (size: number, color: string) => css`
  width: ${size}px;
  height: ${size}px;
  padding: 2px;
  background-color: ${color};
  border: 1ps solid gray;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgb(165, 204, 246);
  }
`
const labelStyle = css`
  font-size: 16px;
  color: black;
`
