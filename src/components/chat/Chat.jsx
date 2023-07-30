import React, { useContext } from "react";
import "./Chat.scss";
import Avatar from "@mui/material/Avatar";
import Messages from "../messages/Messages";
import Input from "../input/Input";
import { ChatContext } from "../../context/ChatContext";

const Chat = ({ sidebarOpen, setSidebarOpen }) => {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className={"chatInfo " + (sidebarOpen && "active")}>
        <div className="userChat">
          <Avatar className="avatar" alt="" src={data.user?.photoURL} />
          <div className="userChatInfo">
            <span>{data.user?.displayName}</span>
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
