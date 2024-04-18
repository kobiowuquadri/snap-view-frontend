'use client'

import React, { useState } from 'react'
import firebase from '../../firebase/firebase'
import 'firebase/compat/auth'

const Page = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleRegister = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
            setError(null)
      setEmail('')
      setPassword('')


      window.location.href = '/login'
      setError(null)
    } catch (error: any) {
      console.error('Error signing up:', error.message)
      setError(error.message)
    }
  }

  return (
    <div className="bg-green-600 flex flex-col gap-5 p-5 w-auto max-w-sm mx-auto rounded-lg shadow-lg">
      <h2 className="text-white text-2xl font-bold mb-5">Sign Up</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 border border-gray-300 rounded"
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 border border-gray-300 rounded"
        placeholder="Password"
      />
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      <button
        onClick={handleRegister}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none"
      >
        Sign Up
      </button>
    </div>
  )
}

export default Page
