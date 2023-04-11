import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

/**
 * Error message page which takes user back to previous page with 2 second delay
 */
export const NotFoundPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate(-1)
    }, 2000)
  }, [])

  return (
    <div>
      <h1>404 Not found</h1>
      <p>Returning to previous page in two seconds</p>
    </div>
  )
}
