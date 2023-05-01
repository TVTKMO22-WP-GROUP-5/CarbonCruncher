/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../components/AuthProvider"
import { buttonAssets } from "../assets/Assets"
import IconButton from "../components/IconButton/IconButton"
import { imageAssets } from "../assets/Assets"
import Visu1 from "../components/Visu1"
import Visu2 from "../components/Visu2"
import Visu3 from "../components/Visu3"
import { Visu4 } from "../components/Visu4/Visu4"
import { FRONT_BASE_URL, VISUALIZATION_URL } from "../utilities/Config"

const emptyView = {
  urlHeader: null,
  view: {
    viewName: null,
    columnCount: 1,
    visus: [],
  },
}

export const UserCustomView = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [reload, setReload] = useState(false) // change state to trigger user view reload
  const [isSaved, setIsSaved] = useState(false)
  const [currentView, setCurrentView] = useState(emptyView)
  const [userViews, setUserViews] = useState([])
  const { user, token } = React.useContext(AuthContext)

  // Load users saved visualizations and place the to the state
  useEffect(() => {
    const getData = async () => {
      // Set authentication config
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      // Get users saved views and parse the in the state
      try {
        const res = await axios.get(VISUALIZATION_URL, config)
        if (res.data === 0) {
          return
        }
        let loadedUserViews = []
        res.data[0].forEach((cs) => {
          const urlHeader = cs.urlHeader
          const view = ConfigStringToVisu(cs.visuConfig)
          const loadedUserView = {
            urlHeader,
            view,
          }
          loadedUserViews.push(loadedUserView)
        })
        setUserViews(loadedUserViews)
        setCurrentView(loadedUserViews[0])
      } catch (error) {
        console.log(error)
      }
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload])

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
   * String format: "Temperature visualizations#1|1|2|3;CO2 visualizations#2|4|4|4|4|5;etc...
   *                "NameOfTheVisualization#ColumnCount|Visunumber|Visunumber|Visunumber
   */
  const ConfigStringToVisu = (configString) => {
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
  const VisuToConfigString = (viewName, view) => {
    console.log(view)
    const returnString = `${viewName}#${view.columnCount}|${view.visus.join("|")};`
    return returnString
  }

  /**
   * Handle create new view -click
   */
  const HandleCreateNew = () => {
    setIsEdit(true)
    setCurrentView(emptyView)
  }

  /**
   * Handle canceling of new view creating
   */
  const HandleCancelChanges = () => {
    if (isEdit && !isSaved) {
      if (confirm(`You have unsaved edits in custom view. Confirm cancel with OK.`)) {
        setCurrentView(userViews[0])
        setIsEdit(false)
      }
    }
  }

  /**
   * Handle new visu adding to the view in edit mode
   */
  const HandleAddVisu = (visuNo) => {
    let newCurrentView = currentView.view
    newCurrentView.visus.push(visuNo)
    setIsSaved(false)
    setCurrentView({ ...currentView, view: newCurrentView })
  }

  /**
   * Get grid element with 1 or two columns
   */
  const GetColumnGrid = (view) => {
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
   * Handle view save
   */
  const handleSaveCreatedView = async () => {
    // Check that there is something to save
    if (!(currentView.view.visus.length > 0)) {
      alert("You do not have any visualizations in the view. Saving is canceled")
      return
    }

    // Ask name for saved view
    let viewname
    do {
      viewname = ""
      viewname = prompt("Give name to your custom view")
      if (viewname.length === 0) {
        alert("Name can not be empty!")
      }
    } while (viewname.length <= 0)

    // Parse visu state to configstring and save it to the database
    const databaseString = VisuToConfigString(viewname, currentView.view)
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
      await axios.post(VISUALIZATION_URL, databaseString, config)
      setIsEdit(false)
      //let newCurrentView = currentView.view
      //newCurrentView.viewName = viewname
      //setCurrentView({ ...currentView, view: newCurrentView })
      setReload(!reload)
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Handle column radiobutton change
   */
  const handleRadioButtonChange = (value) => {
    let newCurrentView = currentView.view
    newCurrentView.columnCount = value
    setCurrentView({ ...currentView, view: newCurrentView })
  }

  const handleViewDelete = async () => {
    if (!confirm(`Are you sure that you want to delete this view? Press OK to confirm.`)) {
      return
    }

    // Authorization config
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }

    // Delete current view
    try {
      await axios.delete(`${VISUALIZATION_URL}/${currentView.urlHeader}`, config)
      setReload(!reload)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCopyUrlToClipboard = () => {
    //onClick={() => {navigator.clipboard.writeText(this.state.textToCopy)}}
    navigator.clipboard.writeText(FRONT_BASE_URL + "/" + currentView.urlHeader)
    alert("View URL copied to clipboard")
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
                handleRadioButtonChange(parseInt(e.target.value))
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
          <>
            <IconButton buttonAsset={buttonAssets.btnNewCustView} onClick={HandleCreateNew} />
            {!isEdit
              ? userViews.map((v, i) => (
                  <IconButton onClick={() => setCurrentView(userViews[i])} buttonAsset={{ ...buttonAssets.btnCustom, buttonText: v.view.viewName }} no={i + 1} />
                ))
              : null}
          </>
        )}
      </div>
      <div className="viewTitle">
        {!currentView || !currentView.view.viewName ? (
          <h1>New view (unsaved)</h1>
        ) : (
          <>
            <img src={imageAssets.icon.clipboard} alt="clipboard" onClick={handleCopyUrlToClipboard} />
            <h1>{currentView.view.viewName}</h1>
            <img src={imageAssets.icon.deleteIcon} alt="delete" onClick={handleViewDelete} />
          </>
        )}
      </div>
      {GetColumnGrid(currentView.view)}
    </div>
  )
}
