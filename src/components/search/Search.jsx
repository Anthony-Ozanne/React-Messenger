import React from "react";
import "./Search.scss";
import Avatar from "@mui/material/Avatar";

const Search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Recherchez une personne" />
      </div>
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
    </div>
  );
};

export default Search;
