import React from "react";
import "./Sidebar.scss";
import Navbar from "../navbar/Navbar";
import Search from "../search/Search";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
    </div>
  );
};

export default Sidebar;
