/**
 * Generate a color from a string
 */
export const GenerateColorFromName = (name) => {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  let color = "#"
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff
    color += ("00" + value.toString(16)).substr(-2)
  }
  return color
}

/**
 * Capitalize first letter of a string
 */
export const CapitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Add space between capitalized words in a string
 */
export const AddSpaceBetweenCapitalizedWords = (string) => {
  return string.replace(/([A-Z])/g, " $1").trim()
}
