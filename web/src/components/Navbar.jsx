import React, { useState } from "react";
import axios from "axios";

const Navbar = () => {
  const [caseName, setCaseName] = useState(""); // Current case name
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup state
  const [inputValue, setInputValue] = useState(""); // Input field value for the popup

  // Function to handle popup submission
  const handleSubmit = () => {
    if (inputValue.trim() === "") {
      alert("Case name cannot be empty!");
      return;
    }

    // Update case name
    setCaseName(inputValue);

    // Make an API call to save the case name to the database
    // axios
    //   .post("http://localhost:5000/api/newcase", { name: inputValue })
    //   .then((response) => {
    //     console.log("Case added successfully:", response.data);
    //     alert("Case added successfully!");
    //   })
    //   .catch((error) => {
    //     console.error("Error adding case:", error);
    //     alert("Error adding case!");
    //   });

    // Close the popup
    setIsPopupOpen(false);
    setInputValue(""); // Reset input field
  };

  return (
    <div className="w-full flex items-center justify-between bg-black p-4 shadow-md">
      {/* Display current case name */}
      <div className="font-semibold text-lg text-white">
        Case: {caseName ? `${caseName}` : "No case selected"}
      </div>

      {/* Search bar and New Case button */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search case..."
          className="border px-4 py-2 rounded-md focus:outline-none bg-gray-800 text-white placeholder-gray-400"
        />
        <button
          onClick={() => setIsPopupOpen(true)} // Open popup
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
        >
          New Case
        </button>
      </div>

      {/* Popup for entering new case name */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-md shadow-md w-96">
            <h2 className="text-lg font-semibold text-white mb-4">Enter New Case Name</h2>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter case name"
              className="border px-4 py-2 rounded-md w-full focus:outline-none bg-gray-800 text-white placeholder-gray-400 mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsPopupOpen(false)} // Close popup
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit} // Submit case name
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;