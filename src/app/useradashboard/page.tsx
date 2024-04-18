"use client"

import React, { useState } from "react"
import axios from "axios"

const UserAPage = () => {
  const [companyName, setCompanyName] = useState("")
  const [numOfUsers, setNumOfUsers] = useState("")
  const [numOfProducts, setNumOfProducts] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const token = localStorage.getItem("token")
    try {
      const response = await axios.post(
        "http://localhost:5000/data/submit",
        {
          companyName,
          numOfUsers: parseInt(numOfUsers),
          numOfProducts: parseInt(numOfProducts),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log(response)

      setSuccessMessage("Data submitted successfully!")
    } catch (error) {
      setErrorMessage("Failed to submit data. Please try again.")
    }
  }

  return (
    <div>
      <h1>USER A Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Company Name:
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </label>
        <label>
          Number of Users:
          <input
            type="number"
            value={numOfUsers}
            onChange={(e) => setNumOfUsers(e.target.value)}
          />
        </label>
        <label>
          Number of Products:
          <input
            type="number"
            value={numOfProducts}
            onChange={(e) => setNumOfProducts(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  )
}

export default UserAPage
