import React, { useState } from 'react';
import { createAd, uploadImage } from '../api'; // Ensure these API functions are defined
import './AdForm.css'; // Import the CSS file

const AdForm = ({ categories }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [customCategory, setCustomCategory] = useState(''); // For custom category input
    const [isCustomCategory, setIsCustomCategory] = useState(false); // Toggle for custom category
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null); // State for image
    const [listingType, setListingType] = useState('RENT'); // Default to Rent
    const [loading, setLoading] = useState(false); // State for loading

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true

        try {
            // Upload the image first
            let imageUrl = '';
            if (image) {
                const formData = new FormData();
                formData.append('file', image);
                const uploadResponse = await uploadImage(formData);
                imageUrl = uploadResponse.data; // Adjust this based on your API response
            }

            // Use custom category if provided, otherwise use the selected category
            const adCategory = isCustomCategory ? customCategory : category;

            // Create the ad
            const ad = { title, description, category: adCategory, price, listingType, imageUrl };
            await createAd(ad);
            // Clear the form
            setTitle('');
            setDescription('');
            setCategory('');
            setCustomCategory('');
            setPrice('');
            setImage(null);
        } catch (error) {
            console.error("Error uploading image or creating ad", error);
            // Handle error (show an alert or set an error state)
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    return (
        <div className="ad-form">
            <h2>Post an Ad</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows="4"
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    {isCustomCategory ? (
                        <input
                            type="text"
                            className="form-control"
                            value={customCategory}
                            onChange={(e) => setCustomCategory(e.target.value)}
                            placeholder="Enter custom category"
                            required
                        />
                    ) : (
                        <select
                            className="form-control"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    )}
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={isCustomCategory}
                            onChange={() => setIsCustomCategory(!isCustomCategory)}
                        />
                        <label className="form-check-label">Add custom category</label>
                    </div>
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Upload Image</label>
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div className="form-group">
                    <label>Listing Type</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="RENT"
                                checked={listingType === 'RENT'}
                                onChange={() => setListingType('RENT')}
                            /> Rent
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="SALE"
                                checked={listingType === 'SALE'}
                                onChange={() => setListingType('SALE')}
                            /> For Sale
                        </label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Ad'}
                </button>
            </form>
        </div>
    );
};

export default AdForm;
