import axios from 'axios';

const API_URL = 'http://localhost:8081/api/ads'; // Adjust the URL as needed

export const uploadImage = async (formData) => {
    return axios.post(`${API_URL}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const createAd = async (ad) => {
    return await axios.post(API_URL, ad);
};

export const deleteAd = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};

export const getAdById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};

export const getAllAds = async (category = '') => {
    return await axios.get(`${API_URL}${category}`); // Adjusted to append category
};

export const searchAds = async (searchTerm) => {
    return await axios.get(`${API_URL}?search=${searchTerm}`);
};

export const updateAd = async (id, ad) => {
    return await axios.patch(`${API_URL}/${id}`, ad);
};
