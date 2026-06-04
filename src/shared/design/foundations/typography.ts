import { type TextStyle } from "react-native"

import { muted as mutedColor } from "./colors"

const baseSize = 16

export const normal: TextStyle = {
  fontSize: baseSize,
}

export const large: TextStyle = {
  fontSize: baseSize * 1.25,
}

export const muted: TextStyle = {
  fontSize: baseSize,
  color: mutedColor,
}

export const label: TextStyle = {
  fontSize: baseSize * 0.875,
  fontWeight: "bold",
}

export const title: TextStyle = {
  fontSize: baseSize * 2,
}
