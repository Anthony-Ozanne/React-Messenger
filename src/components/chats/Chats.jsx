import React from "react";
import "./Chats.scss";
import Avatar from "@mui/material/Avatar";

const Chats = () => {
  return (
    <div className="chats">
      <div className="userChats">
        <Avatar
          className="avatar"
          alt="Jack"
          src="https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=1600https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=1600"
        />
        <div className="userChatsInfo">
          <span>Jack</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  );
};

export default Chats;
