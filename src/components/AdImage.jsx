import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdImage({ adId }) {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        // Fetch ad data, which contains the image URL
        axios.get(`http://localhost:8081/ads/${adId}`)
            .then(response => {
                const ad = response.data;
                setImageUrl(ad.imageUrl);  // Assuming API returns the image URL
            })
            .catch(error => {
                console.error("Error fetching ad:", error);
            });
    }, [adId]);

    return (
        <div>
            {imageUrl ? (
                <img src={imageUrl} alt="Ad" style={{ width: '300px', height: 'auto' }} />
            ) : (
                <p>No image available</p>
            )}
        </div>
    );
}

export default AdImage;
