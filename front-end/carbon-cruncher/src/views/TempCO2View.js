import React from "react"
import Visu1 from "../components/Visu1"
import Visu2 from "../components/Visu2"
import Visu3 from "../components/Visu3"

/**
 * View collects temperature and CO2 related visualizations together
 */
export const TempCO2View = () => {
  return (
    <div className="tempCo2View">
      {/* <Visu1 />
      <Visu2 /> */}
      <Visu3 />
    </div>
  )
}
