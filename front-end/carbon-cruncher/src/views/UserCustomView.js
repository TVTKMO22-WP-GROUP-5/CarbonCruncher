import React, { useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../components/AuthProvider"
import { buttonAssets } from "../assets/Assets"
import IconButton from "../components/IconButton/IconButton"
import Visu1 from "../components/Visu1"
import Visu2 from "../components/Visu2"
import Visu3 from "../components/Visu3"
import { Visu4 } from "../components/Visu4/Visu4"
import { VISUALIZATION_URL } from "../utilities/Config"

export const UserCustomView = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [columns, setColumns] = useState(1)
  const [visus, setVisus] = useState([])
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
      case 5:
      default:
        return null
    }
  }

  /**
   * Converts config string to component
   * state which can be stored to usestate variable
   * String format: "Temperature visualizations#1|1|2|3
   *                "NameOfTheVisualization#ColumnCount|Visunumber|Visunumber|Visunumber
   */
  const SetVisuConfigStringToState = (configString) => {
    const columnCount = parseInt(configString.split("#")[1].split("|")[0])
    setColumns(columnCount)
    let visus = []
    configString
      .split("#")[1]
      .split("|")
      .forEach((element, i) => {
        if (i === 0) {
          return
        }
        visus.push(parseInt(element))
      })
    setVisus(visus)
  }

  /**
   * Converts component state to config
   * string which can be stored to database
   */
  const SetStateToVisuConfigString = (visuname, columns, visus) => {
    const returnString = `${visuname}#${columns}|${visus.join("|")};`
    return returnString
  }

  /**
   * Handle create new view -click
   */
  const HandleCreateNew = () => {
    setIsEdit(true)
  }

  /**
   * Handle canceling of new view creating
   */
  const HandleCancelChanges = () => {
    if (isEdit && !isSaved) {
      // eslint-disable-next-line no-restricted-globals
      if (confirm(`You have unsaved edits in custom view. Confirm cancel with OK.`)) {
        setVisus([])
        setIsEdit(false)
        setColumns(1)
      }
    }
  }

  /**
   * Handle visu adding to the view in edit mode
   */
  const HandleAddVisu = (visuNo) => {
    setIsSaved(false)
    setVisus([...visus, visuNo])
  }

  const GetColumnGrid = (no) => {
    if (no === 1) {
      return (
        <div className="viewArea" style={{ gridTemplateColumns: "100%" }}>
          {visus.map((v, i) => (
            <div className="viewItem" key={i}>
              {GetVisuByNumber(v)}
            </div>
          ))}
        </div>
      )
    } else if (no === 2) {
      return (
        <div className="viewArea" style={{ gridTemplateColumns: "50% 50%" }}>
          {visus.map((v, i) => (
            <div className="viewItem" key={i}>
              {GetVisuByNumber(v)}
            </div>
          ))}
        </div>
      )
    } else return null
  }

  const handleShowSelectedView = () => {}

  const handleSaveCreatedView = async () => {
    // Check that there is something to save
    if (!(visus.length > 0)) {
      alert("You do not have any visualizations in the view. Saving is canceled")
      return
    }

    // Ask name for saved visualization
    let visuname
    do {
      visuname = ""
      visuname = prompt("Give name to your custom view")
      if (visuname.length === 0) {
        alert("Name can not be empty!")
      }
    } while (visuname.length <= 0)

    // Parse visu state to configstring and save it to the database
    const databaseString = SetStateToVisuConfigString(visuname, columns, visus)
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
      const res = await axios.post(VISUALIZATION_URL, databaseString, config)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="userCustomView">
      <div className="viewButtons">
        {isEdit ? (
          <>
            <IconButton buttonAsset={buttonAssets.btnCancel} onClick={HandleCancelChanges} />
            <IconButton buttonAsset={buttonAssets.btnSaveCustView} onClick={handleSaveCreatedView} />
            <div
              className="radioButtons"
              onChange={(e) => {
                setColumns(parseInt(e.target.value))
              }}
            >
              <span>View columns:</span>
              <label>
                <input type="radio" value={1} name="columnCount" defaultChecked={true} />1 Column
              </label>
              <label>
                <input type="radio" value={2} name="columnCount" />2 Columns
              </label>
            </div>
            <IconButton onClick={() => HandleAddVisu(1)} buttonAsset={buttonAssets.btnHistTemp} />
            <IconButton onClick={() => HandleAddVisu(2)} buttonAsset={buttonAssets.btnEvoGlobalTemp} />
            <IconButton onClick={() => HandleAddVisu(3)} buttonAsset={buttonAssets.btnAtmCo2} />
            <IconButton onClick={() => HandleAddVisu(4)} buttonAsset={buttonAssets.btnCountryCo2} />
            <IconButton onClick={() => HandleAddVisu(5)} buttonAsset={buttonAssets.btnSectorCo2} />
          </>
        ) : (
          <IconButton buttonAsset={buttonAssets.btnNewCustView} onClick={HandleCreateNew} />
        )}
      </div>
      <div className="savedViews"></div>
      {GetColumnGrid(columns, visus)}
    </div>
  )
}
