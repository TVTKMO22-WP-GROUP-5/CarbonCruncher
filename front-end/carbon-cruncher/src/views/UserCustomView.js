/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../components/AuthProvider"
import { buttonAssets } from "../assets/Assets"
import IconButton from "../components/IconButton/IconButton"
import { imageAssets } from "../assets/Assets"
import { GetColumnGrid, VisuToConfigString, ConfigStringToVisu } from "../utilities/Utilities"
import { FRONT_BASE_URL, VISUALIZATION_URL } from "../utilities/Config"

const GetEmptyView = () => {
  return {
    urlHeader: null,
    view: {
      viewName: null,
      columnCount: 1,
      visus: [],
    },
  }
}

export const UserCustomView = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [reload, setReload] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [currentView, setCurrentView] = useState(GetEmptyView())
  const [userViews, setUserViews] = useState([])
  const { token } = React.useContext(AuthContext)

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

      // Get users saved views and parse them in the state
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
        if (loadedUserViews.length > 0) {
          setUserViews(loadedUserViews)
          setCurrentView(loadedUserViews[0])
        } else {
          setUserViews([])
          setCurrentView(GetEmptyView())
        }
      } catch (error) {
        console.log(error)
      }
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload])

  /**
   * Handle create new view -click
   */
  const HandleCreateNew = () => {
    setIsEdit(true)
    setCurrentView(GetEmptyView())
  }

  /**
   * Handle canceling of new view creating
   */
  const HandleCancelChanges = () => {
    if (isEdit && !isSaved) {
      if (confirm(`You have unsaved edits in custom view. Confirm cancel with OK.`)) {
        if (!userViews.length === 0) {
          setCurrentView(userViews[0])
        } else {
          setCurrentView(GetEmptyView())
        }
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
   * Handle view save
   */
  const handleSaveCreatedView = async () => {
    // Check that there is something to save
    if (!(currentView.view.visus.length > 0)) {
      alert("You do not have any visualizations in the view. Saving is canceled")
      return
    }

    // Ask name for saved view
    let viewname = ""
    let nameOk = false
    do {
      viewname = prompt("Give viewname between 1-16 characters")
      if (viewname === null) {
        alert("Saving canceled")
        return
      }
      if (viewname.length <= 0 || viewname.length > 16) {
        alert("Name length does not match criteria")
      } else nameOk = true
    } while (!nameOk)

    // Remove possible split characters from name and parse visu state to configstring and save it to the database.
    const databaseString = VisuToConfigString(viewname.replace("#", "").replace("|", "").replace(";", ""), currentView.view)
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
      await axios.post(VISUALIZATION_URL, databaseString, config)
      setIsEdit(false)
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

  /**
   * Handle view delete
   */
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

  /**
   * Handle copying the view url to user clipboard
   */
  const handleCopyUrlToClipboard = () => {
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
                  <IconButton onClick={() => setCurrentView(userViews[i])} buttonAsset={{ ...buttonAssets.btnCustom, buttonText: v.view.viewName }} no={i + 1} key={i} />
                ))
              : null}
          </>
        )}
      </div>
      <div className="viewTitle">
        {!currentView.view.viewName && isEdit ? (
          <h1>New view (unsaved)</h1>
        ) : !currentView.view.viewName && !isEdit ? null : (
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
