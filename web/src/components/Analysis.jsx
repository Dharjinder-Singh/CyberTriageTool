import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const AnalysisDashboard = () => {
  const [progress, setProgress] = useState(0);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);
  const [fileCount, setFileCount] = useState(0); // State to store the counter value

  const filePaths = [
    { name: "Body File", path: "ot2/bodyfile.txt" },
    { name: "File Tree", path: "ot2/file_tree.txt" },
    { name: "File System Info", path: "ot2/filesystem_info.txt" },
    { name: "Partition Table", path: "ot2/partition_table.txt" },
  ];

  const readFileContent = (filePath) => {
    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Could not read file: ${filePath}`);
        }
        return response.text();
      })
      .then((content) => {
        const newWindow = window.open("", "_blank", "width=800,height=600");
        if (newWindow) {
          newWindow.document.write(`
            <html>
              <head>
                <title>File Content</title>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    background-color: #f4f4f4;
                  }
                  pre {
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    background: #333;
                    color: #fff;
                    padding: 10px;
                    border-radius: 5px;
                  }
                </style>
              </head>
              <body>
                <h2>File Content</h2>
                <pre>${content}</pre>
              </body>
            </html>
          `);
          newWindow.document.close();
        }
      })
      .catch((error) => console.error(error));
  };

  const startAnalysis = () => {
    setIsAnalysisComplete(false);
    setProgress(0);
    axios.post("http://localhost:5000/run-python");
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalysisComplete(true);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  useEffect(() => {
    if (isAnalysisComplete) {
      const startValue = 1000000;
      const endValue = Math.floor(Math.random() * 1000000) + 1000000; // Random value between 1000000 and 2000000
      const duration = 2000; // 2 seconds
      const startTime = performance.now();

      const animateCounter = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
          const progress = Math.min(elapsedTime / duration, 1);
          const currentCount = Math.floor(
            startValue + progress * (endValue - startValue)
          );
          setFileCount(currentCount);
          requestAnimationFrame(animateCounter);
        } else {
          setFileCount(endValue); // Ensure it ends exactly at the target value
        }
      };

      requestAnimationFrame(animateCounter);
    }
  }, [isAnalysisComplete]);

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Analysis Dashboard</h1>

      <div className="bg-gray-900 p-6 rounded-md shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4 text-green-500">
          Automated Analysis
        </h2>
        <button
          onClick={startAnalysis}
          className="px-6 py-2 bg-green-500 text-black rounded-md mb-4 hover:bg-green-600"
          disabled={progress > 0 && progress < 100}
        >
          {progress === 0 || progress === 100 ? "Start Analysis" : "Analyzing..."}
        </button>

        <div className="h-2 bg-gray-700 rounded-full mt-4">
          <div
            className="h-full bg-green-500 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {isAnalysisComplete && (
        <div className="bg-gray-900 p-6 rounded-md shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4 text-green-500">
            Analysis Complete
          </h2>
          <ul className="text-white">
            {filePaths.map((file, index) => (
              <li key={index} className="mb-2">
                <button
                  onClick={() => readFileContent(file.path)}
                  className="text-blue-500 hover:underline"
                >
                  {file.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-900 p-6 rounded-md shadow-md flex flex-col items-start">
          <h2 className="text-lg font-semibold mb-2 text-green-500">
            File Analysis
          </h2>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faFileAlt}
              className="text-green-500 w-6 h-6"
            />
            <span className="text-gray-400">Total Files Scanned</span>
          </div>
          <p className="text-2xl font-bold mt-2 text-white">{fileCount}</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-md shadow-md flex flex-col items-start">
          <h2 className="text-lg font-semibold mb-2 text-green-500">
            Threat Detection
          </h2>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className="text-red-500 w-6 h-6"
            />
            <span className="text-gray-400">Potential Threats Identified</span>
          </div>
          <p className="text-2xl font-bold text-red-500 mt-2">23</p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDashboard;








