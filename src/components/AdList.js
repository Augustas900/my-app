import React, { useEffect, useState } from 'react';
import { getAllAds } from '../api'; 
import AdFilter from './AdFilter';
import './AdList.css'; 

const AdList = () => {
    const [ads, setAds] = useState([]); // Initialize as an empty array
    const [selectedCategory, setSelectedCategory] = useState('');
    const [listingType, setListingType] = useState('RENT'); // Default to Rent

    const categories = [
        "item for sale or rent",
        "vehicle for sale or rent",
        "house for sale or rent"
    ];

    // Fetch ads based on selected category and listing type
    useEffect(() => {
        const fetchAds = async () => {
            try {
                // Apply both category and listing type filters
                const categoryQuery = selectedCategory ? `category=${selectedCategory}` : '';
                const listingTypeQuery = `listingType=${listingType}`;
                const queryString = `?${[categoryQuery, listingTypeQuery].filter(Boolean).join('&')}`;
                
                const response = await getAllAds(queryString);
                console.log('API Response:', response.data); // Log the response to check its structure

                // Ensure response.data is an array before setting it to state
                if (Array.isArray(response.data)) {
                    setAds(response.data);
                } else {
                    console.error('Expected an array but got:', response.data);
                    setAds([]); // Reset to an empty array if the data isn't valid
                }
            } catch (error) {
                console.error('Error fetching ads:', error);
                setAds([]); // Reset to an empty array on error
            }
        };

        fetchAds();
    }, [selectedCategory, listingType]); // Rerun fetch when category or listing type changes

    return (
        <div className="ad-list">
            {/* Filter component for categories */}
            <AdFilter
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            {/* Buttons to toggle between Rent and Sale */}
            <div className="listing-type-buttons">
                <button
                    className={listingType === 'RENT' ? 'active' : ''}
                    onClick={() => setListingType('RENT')}
                >
                    Rent
                </button>
                <button
                    className={listingType === 'SALE' ? 'active' : ''}
                    onClick={() => setListingType('SALE')}
                >
                    Sale
                </button>
            </div>

            <h2>Ad Listings</h2>
            <ul>
                {ads.length > 0 ? (
                    ads.map((ad) => (
                        <li key={ad.id} className="ad-item">
                            <h3>{ad.title}</h3>
                            <p>{ad.description}</p>
                            <p>Category: {ad.category}</p>
                            <p>Price: {ad.price !== null ? `$${ad.price.toFixed(2)}` : 'N/A'}</p>
                            {ad.imageUrl && (
                                <img src={ad.imageUrl} alt={ad.title} className="ad-image" />
                            )}
                        </li>
                    ))
                ) : (
                    <p>No ads available.</p> // Message to show when no ads are found
                )}
            </ul>
        </div>
    );
};

export default AdList;
