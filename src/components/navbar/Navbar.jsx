import React, { useContext } from "react";
import "./Navbar.scss";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="logo">React Messenger</span>
      <div className="user">
        <Avatar
          className="avatar"
          alt={currentUser.displayName}
          src={currentUser.photoURL}
        />
        <span>{currentUser.displayName}</span>
        <LogoutIcon className="logoutIcon" onClick={() => signOut(auth)} />
      </div>
    </div>
  );
};

export default Navbar;
