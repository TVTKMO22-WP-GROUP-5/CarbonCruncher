import React from "react"
import { Visu4 } from "../components/Visu4/Visu4"
import  Visu5  from "../components/Visu5"

/**
 * View collects visualizations for CO2 data
 */
export const EmissionsView = () => {
  return (
    <div className="emissionView">
      <Visu4 />
      <Visu5 />
    </div>
  )
}
