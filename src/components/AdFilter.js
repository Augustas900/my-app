import React from 'react';

const AdFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
        <div>
            <h3>Filter by Category</h3>
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default AdFilter;
