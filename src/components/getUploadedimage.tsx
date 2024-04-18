"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

function ImageGallery() {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/data/images', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(response.data)
        setImageUrls(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Failed to fetch images');
        setLoading(false);
      }
    };

    fetchImages();

    // Clean-up function (optional) to handle component unmounting
    return () => {
      // Clean up any resources if needed
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Image Gallery</h2>
      {loading ? (
        <p className="text-center text-gray-600">Loading images...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
        {imageUrls.map((imageUrl, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* <img src={imageUrl} alt={`Image ${index}`} className="rounded-lg shadow-md" /> */}
            <Image
      src={imageUrl}
      width={500}
      height={500}
      alt="Picture of the author"
    />
            <p className="mt-2 text-center">Image {index + 1}</p>
            <p>{imageUrl}</p>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}

export default ImageGallery;


