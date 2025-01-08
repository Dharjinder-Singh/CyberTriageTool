import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImport,
  faSearch,
  faBarChart,
  faShield,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div className="w-64 bg-black h-screen flex flex-col shadow-lg min-h-screen">
      {/* Brand Header */}
      <div className="p-4 font-bold text-xl text-white flex items-center space-x-2">
        <span className="text-green-500 animate-pulse">⚡</span>
        <span>DigiForensics</span>
      </div>

      {/* Navigation Links */}
      <ul className="mt-6 flex flex-col space-y-2">
        <li>
          <Link
            to="/"
            className="block px-4 py-2 flex items-center space-x-3 hover:bg-green-500 hover:text-black rounded-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FontAwesomeIcon icon={faFileImport} className="text-white w-5 h-5" />
            <span className="text-white">Evidence Import</span>
          </Link>
        </li>
        <li>
          <Link
            to="/Analysis"
            className="block px-4 py-2 flex items-center space-x-3 hover:bg-green-500 hover:text-black rounded-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FontAwesomeIcon icon={faSearch} className="text-white w-5 h-5" />
            <span className="text-white">Analysis</span>
          </Link>
        </li>
        <li>
          <Link
            to="/Eventtimeline"
            className="block px-4 py-2 flex items-center space-x-3 hover:bg-green-500 hover:text-black rounded-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FontAwesomeIcon icon={faBarChart} className="text-white w-5 h-5" />
            <span className="text-white">Timeline</span>
          </Link>
        </li>
        <li>
          <Link
            to="/Report"
            className="block px-4 py-2 flex items-center space-x-3 hover:bg-green-500 hover:text-black rounded-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FontAwesomeIcon icon={faShield} className="text-white w-5 h-5" />
            <span className="text-white">Reporting</span>
          </Link>
        </li>
      </ul>

      {/* Settings Section */}
      <div className="mt-auto border-t border-gray-700" >
        <button className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-green-500 hover:text-black rounded-md transition duration-300 ease-in-out transform hover:scale-105">
          <FontAwesomeIcon icon={faGear} className="text-white w-5 h-5" />
          <span className="text-white">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
