import React from "react";
import "./Chat.scss";
import Avatar from "@mui/material/Avatar";
import Messages from "../messages/Messages";
import Input from "../input/Input";

const Chat = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className="chat">
      <div className={"chatInfo " + (sidebarOpen && "active")}>
        <div className="userChat">
          <Avatar
            className="avatar"
            alt="Masha"
            src="https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=1600"
          />
          <div className="userChatInfo">
            <span>Masha</span>
          </div>
        </div>
        <div className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <span className="line1"></span>
          <span className="line2"></span>
          <span className="line3"></span>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
