import Visu1 from "../components/Visu1"
import Visu2 from "../components/Visu2"
import Visu3 from "../components/Visu3"
import { Visu4 } from "../components/Visu4/Visu4"
import Visu5 from "../components/Visu5"

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

/**
 * Get grid element with 1 or two columns
 */
export const GetColumnGrid = (view) => {
  if (view.columnCount === 1) {
    return (
      <div className="viewArea" style={{ gridTemplateColumns: "100%" }}>
        {view.visus.map((v, i) => (
          <div className="viewItem" key={i}>
            {GetVisuByNumber(v)}
          </div>
        ))}
      </div>
    )
  } else if (view.columnCount === 2) {
    return (
      <div className="viewArea" style={{ gridTemplateColumns: "50% 50%" }}>
        {view.visus.map((v, i) => (
          <div className="viewItem" key={i}>
            {GetVisuByNumber(v)}
          </div>
        ))}
      </div>
    )
  } else return null
}

/**
 * Get visualization element with number
 */
export const GetVisuByNumber = (number) => {
  switch (number) {
    case 1:
      return <Visu1 />
    case 2:
      return <Visu2 />
    case 3:
      return <Visu3 />
    case 4:
      return <Visu4 />
    case 5:
      return <Visu5 />
    default:
      return null
  }
}

/**
 * Converts config string to component
 * state which can be stored to usestate variable
 * String format: "Temperature visualizations#1|1|2|3;CO2 visualizations#2|4|4|4|4|5;etc...
 *                "NameOfTheVisualization#ColumnCount|Visunumber|Visunumber|Visunumber
 */
export const ConfigStringToVisu = (configString) => {
  const viewName = configString.split("#")[0]
  const columnCount = parseInt(configString.split("#")[1].split("|")[0])
  const visus = configString
    .split("#")[1]
    .split("|")
    .slice(1)
    .map((v) => parseInt(v))
  const view = {
    viewName,
    columnCount,
    visus,
  }
  return view
}

/**
 * Converts component state to config
 * string which can be stored to database
 */
export const VisuToConfigString = (viewName, view) => {
  const returnString = `${viewName}#${view.columnCount}|${view.visus.join("|")};`
  return returnString
}

/**
 * Add fill zeros to year reading so that the length is 4 charachters
 * Example (4) => "0004", (12) => "0012"
 */
export const AddPaddingZeroesToYear = (year) => {
  let stringyear = `${year}`
  while (stringyear.length < 4) {
    stringyear = "0" + stringyear
  }
  return stringyear
}

/**
 * Format year number with BC when negative year and AD when positive year
 */
export const FormatYearsAgoLabel = (yearsAgo) => {
  const year = parseFloat(yearsAgo)
  if (year < 0) {
    return `${Math.abs(year).toLocaleString()} BC`
  } else if (year > 0) {
    return `${year.toLocaleString()} AD`
  } else return year
}
