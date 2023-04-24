import React, { useEffect, useState } from "react"
import { Rnd } from "react-rnd"
import { AuthContext } from "../components/AuthProvider"
import { buttonAssets } from "../assets/Assets"
import IconButton from "../components/IconButton/IconButton"
import Visu1 from "../components/Visu1"
import Visu3 from "../components/Visu3"
import { Visu4 } from "../components/Visu4/Visu4"

//https://github.com/bokuweb/react-rnd

const style = {
  height: "auto",
  width: "auto",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
}

export const UserCustomView = () => {
  const [userVisus, setUserVisus] = useState([])
  const [state, setState] = useState([
    {
      visu: 4,
      width: 200,
      height: 200,
      x: 10,
      y: 10,
    },
    {
      visu: 1,
      width: 200,
      height: 200,
      x: 600,
      y: 10,
    },
  ])
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
    setIsEdit(!isEdit)
  }

  const handleShowSelectedView = () => {}

  const handleSaveCreatedView = () => {}

  return (
    <div className="userCustomView">
      <div className="viewButtons">
        <IconButton buttonAsset={buttonAssets.btnNewCustView} onClick={handleCreateNew} />
        {isEdit ? <IconButton buttonAsset={buttonAssets.btnSaveCustView} /> : null}
        <div style={{ margin: "20px 0px" }} />
        <IconButton buttonAsset={buttonAssets.btnHistTemp} />
        <IconButton buttonAsset={buttonAssets.btnEvoGlobalTemp} />
        <IconButton buttonAsset={buttonAssets.btnAtmCo2} />
        <IconButton buttonAsset={buttonAssets.btnCountryCo2} />
        <IconButton buttonAsset={buttonAssets.btnSectorCo2} />
      </div>
      <div className="savedViews"></div>
      <div className="viewArea">
        {state
          ? state.map((_state, index) => {
              return (
                <Rnd
                  style={style}
                  size={{ width: _state.width, height: _state.height }}
                  position={{ x: _state.x, y: _state.y }}
                  onDragStop={(e, d) => {
                    const changedState = { ..._state, x: d.x, y: d.y }
                    const newState = state.map((s, i) => (i === index ? changedState : s))
                    setState(newState)
                  }}
                  onResizeStop={(e, direction, ref, delta, position) => {
                    const changedState = {
                      ..._state,
                      width: ref.style.width,
                      height: ref.style.height,
                    }
                    const newState = state.map((s, i) => (i === index ? changedState : s))
                    setState(newState)
                  }}
                >
                  {GetVisuByNumber(_state.visu)}
                </Rnd>
              )
            })
          : null}
      </div>
    </div>
  )
}
