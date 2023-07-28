import React from "react";
import "./Home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Chat from "../../components/chat/Chat";

const Home = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Chat sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
    </div>
  );
};

export default Home;
