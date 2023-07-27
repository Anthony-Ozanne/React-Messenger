import React from "react";
import "./Navbar.scss";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">React Messenger</span>
      <div className="user">
        <Avatar
          className="avatar"
          alt="Remy Sharp"
          src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1600"
        />
        <span>Nom</span>
        <LogoutIcon className="logoutIcon" />
      </div>
    </div>
  );
};

export default Navbar;
