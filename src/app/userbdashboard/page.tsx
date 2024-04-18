'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ImageUpload from '@/components/UploadImage'

function UserBPage () {
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token')

      try {
        const response = await axios.get('http://localhost:5000/data/recent', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const userData = response.data

        setUserData(userData)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchData()

    return () => {}
  }, [])

  return (
    <div>
      <h2>User B Dashboard</h2>
      {userData ? (
        <div>
          <p>Comapny Name: {userData.companyName}</p>
          <p>Number of users: {userData.numOfUsers}</p>
          <p>Number of products: {userData.numOfUsers}</p>
          <p>Percentage {userData.percentage}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <div>
        <ImageUpload/>
      </div>
    </div>
  )
}

export default UserBPage
