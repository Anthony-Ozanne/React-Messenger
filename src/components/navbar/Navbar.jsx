import React, { useContext } from "react";
import "./Navbar.scss";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch({ type: "CLEAR_CHAT" });
  };

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
        <LogoutIcon className="logoutIcon" onClick={handleLogout} />
      </div>
    </div>
  );
};

export default Navbar;
