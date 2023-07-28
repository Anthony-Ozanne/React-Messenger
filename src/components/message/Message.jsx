import React from "react";
import "./Message.scss";
import Avatar from "@mui/material/Avatar";

const Message = () => {
  return (
    <div className="message owner">
      <div className="messageInfo">
        <Avatar
          className="avatar"
          alt="Remy Sharp"
          src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1600"
        />
        <span>à l'instant</span>
      </div>
      <div className="messageContent">
        <p>Bonjour</p>
        <img
          src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Remy"
        />
      </div>
    </div>
  );
};

export default Message;
