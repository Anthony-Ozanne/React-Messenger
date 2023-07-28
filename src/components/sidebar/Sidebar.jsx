import React from "react";
import "./Sidebar.scss";
import Navbar from "../navbar/Navbar";
import Search from "../search/Search";
import Chats from "../chats/Chats";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className={"sidebar " + (!sidebarOpen && "active")}>
      <Navbar />
      <Search />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
    </div>
  );
};

export default Sidebar;
