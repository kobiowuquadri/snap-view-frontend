"use client"

import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [file, setFile] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleFileChange = (event :any) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);

    const token = localStorage.getItem("token")

    try {
      const response = await axios.post('http://localhost:5000/data/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }
      });
      console.log('Uploaded image path:', response.data);
      setSuccessMessage("Image successfully uploaded!")
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrorMessage("Failed to submit data. Please try again.")

    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}

export default ImageUpload;
