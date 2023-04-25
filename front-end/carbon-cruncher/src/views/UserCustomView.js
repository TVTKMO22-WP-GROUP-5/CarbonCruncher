import React, { useEffect, useState } from "react"
import { AuthContext } from "../components/AuthProvider"
import { buttonAssets } from "../assets/Assets"
import IconButton from "../components/IconButton/IconButton"
import Visu1 from "../components/Visu1"
import Visu2 from "../components/Visu2"
import Visu3 from "../components/Visu3"
import { Visu4 } from "../components/Visu4/Visu4"

export const UserCustomView = () => {
  const [isEdit, setIsEdit] = useState(false)
  const { user, token } = React.useContext(AuthContext)

  useEffect(() => {})

  /**
   * Get visualization element with number
   */
  const GetVisuByNumber = (number) => {
    switch (number) {
      case 1:
        return <Visu1 />
      case 2:
        return <Visu2 />
      case 3:
        return <Visu3 />
      case 4:
        return <Visu4 />
      default:
        return null
    }
  }

  /**
   * Converts config string to component
   * state which can be stored to usestate variable
   * String format: "Temperature visualizations#1|400|200|10|10;CO2 visualizations#4|100|200|200|10;"
   *                "NameOfTheVisualization#Visunumber|Width|Height|xCoordinate|yCoordinate;NextVisu...;NextVisu;etc."
   */
  const SetVisuConfigStringToState = (configString) => {}

  /**
   * Converts component state to config
   * string which can be stored to database
   */
  const SetStateToVisuConfigString = (state) => {}

  /**
   * Handle create new view -click
   */
  const handleCreateNew = () => {
    setIsEdit(true)
  }

  const handleCancelChanges = () => {
    setIsEdit(false)
  }

  const handleShowSelectedView = () => {}

  const handleSaveCreatedView = () => {}

  return (
    <div className="userCustomView">
      <div className="viewButtons">
        {isEdit ? (
          <>
            <IconButton buttonAsset={buttonAssets.btnCancel} onClick={handleCancelChanges} />
            <IconButton buttonAsset={buttonAssets.btnSaveCustView} />
            <div className="radioButtons">
              <span>View columns:</span>
              <label>
                <input type="radio" value="1" name="columnCount" />1 Column
              </label>
              <label>
                <input type="radio" value="2" name="columnCount" />2 Columns
              </label>
            </div>
            <IconButton buttonAsset={buttonAssets.btnHistTemp} />
            <IconButton buttonAsset={buttonAssets.btnEvoGlobalTemp} />
            <IconButton buttonAsset={buttonAssets.btnAtmCo2} />
            <IconButton buttonAsset={buttonAssets.btnCountryCo2} />
            <IconButton buttonAsset={buttonAssets.btnSectorCo2} />
          </>
        ) : (
          <IconButton buttonAsset={buttonAssets.btnNewCustView} onClick={handleCreateNew} />
        )}
      </div>
      <div className="savedViews"></div>
      <div className="viewArea"></div>
    </div>
  )
}
