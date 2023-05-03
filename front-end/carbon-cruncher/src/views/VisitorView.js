import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { VISUALIZATION_URL } from "../utilities/Config"
import { Spinner } from "../components/Spinner/Spinner"
import { ConfigStringToVisu, GetColumnGrid } from "../utilities/Utilities"

/**
 * Visitor view to watch shared url charts as non-authenticated user
 */
export const VisitorView = () => {
  const [view, setView] = useState(null)
  const { stringId } = useParams()

  // Load url related view
  useEffect(() => {
    const getData = async () => {
      // Get url view and parse the in the state
      try {
        const res = await axios.get(VISUALIZATION_URL + "/" + stringId)
        const viewData = res.data
        const loadedView = {
          urlHeader: viewData.urlHeader,
          view: ConfigStringToVisu(viewData.visuConfig),
        }
        setView(loadedView)
      } catch (error) {
        console.log(error)
        if (error.response.status === 404) {
          const view = {
            view: {
              viewName: "404 not found",
            },
          }
          setView(view)
        }
      }
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Show loading indicator while data is being loaded from API
  if (!view) {
    return (
      <div>
        <Spinner msg={"Loading data..."} />
      </div>
    )
  }

  return (
    <div className="visitorView">
      <h1>{view.view.viewName}</h1>
      <div>{GetColumnGrid(view.view)}</div>
    </div>
  )
}
