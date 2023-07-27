import React from "react";
import "./Input.scss";
import AttachEmailOutlinedIcon from "@mui/icons-material/AttachEmailOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="Ecrivez votre message ..." />
      <div className="send">
        <AttachEmailOutlinedIcon className="attach" />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <AddPhotoAlternateOutlinedIcon className="AddPhoto" />
        </label>
        <button>Envoyer</button>
      </div>
    </div>
  );
};

export default Input;
