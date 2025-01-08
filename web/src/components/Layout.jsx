import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col bg-black-20">
        {/* Navbar */}
        <Navbar />
        {/* Main Content */}
        <main className="flex-1 p-0 bg-gray-20">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
