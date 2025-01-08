import React, { useState } from "react";
import axios from "axios";

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  setUploadedFile(file);

  // Prepare FormData
  const formData = new FormData();
  formData.append("file", file);

  // Upload the file
  axios
    .post("http://localhost:5000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted); // Update the progress bar
      },
    })
    .then((response) => {
      console.log(response.data.message);
      setShowModal(true); // Show confirmation modal
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
    });
};

const EvidenceImport = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    setUploadedFile(file); // Set the file in state
    simulateUpload(file); // Simulate the upload process
  };

  const simulateUpload = (file) => {
    let progress = 0;
    const interval = setInterval(() => {
      if (progress < 100) {
        progress += 10; // Increment progress
        setUploadProgress(progress);
      } else {
        clearInterval(interval);
        setShowModal(true); // Show the confirmation modal
        setUploadProgress(0); // Reset the progress
      }
    }, 300); // Simulate upload speed
  };

  const handleImportClick = () => {
    document.getElementById("fileInput").click(); // Trigger file input click
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold text-green-500">Evidence Import</h1>
      <div className="mt-6 p-4 bg-gray-800 border border-gray-700 rounded-md">
        <h2 className="text-lg font-semibold text-white">Automated Data Collection</h2>
        <p className="text-sm mt-2 text-gray-300">
          Import RAW images and other formats using disk imaging tools.
        </p>
        <button
          onClick={handleImportClick}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Import Evidence
        </button>
        <input
          id="fileInput"
          type="file"
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>
      <div className="mt-6 p-4 bg-gray-800 border border-gray-700 rounded-md">
        <h2 className="text-lg font-semibold text-white">Supported Formats</h2>
        <p className="text-sm mt-2 text-gray-300">RAW images, E01, AFF, DD, and more.</p>
      </div>
      {uploadedFile && (
        <div className="mt-6 p-4 bg-green-600 border border-green-500 rounded-md">
          <h2 className="text-lg font-semibold text-white">Uploading Evidence</h2>
          <div className="mt-2 bg-gray-700 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full transition-all"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm mt-2 text-white">{uploadProgress}%</p>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-md">
            <h2 className="text-lg font-semibold text-green-500">Upload Complete</h2>
            <p className="text-sm mt-2 text-white">
              The file <strong>{uploadedFile?.name}</strong> has been successfully uploaded
              and stored in the "Evidence" folder on your desktop.
            </p>
            <button
              onClick={handleCloseModal}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvidenceImport;





