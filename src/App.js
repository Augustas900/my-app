import React from 'react';
import AdForm from './components/AdForm'; // Adjust based on your structure
import AdList from './components/AdList'; // Adjust based on your structure


const App = () => {
    const categories = [
        "Item for Sale or Rent",
        "Vehicle for Sale or Rent",
        "House for Sale or Rent"
    ];

    return (
        <div>
            <h1></h1>
            <AdForm categories={["Category1", "Category2"]} /> {/* Pass categories as props */}
            <AdList />
            
        </div>
    );
};

export default App;
