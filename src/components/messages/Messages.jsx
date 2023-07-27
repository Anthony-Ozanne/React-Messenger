import React from "react";
import "./Messages.scss";
import Message from "../message/Message";

const Messages = () => {
  return (
    <div className="messages">
      <Message />
      <Message />
      <Message />
    </div>
  );
};

export default Messages;
