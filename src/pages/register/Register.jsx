import React from "react";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import "./Register.scss";

const Register = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">React Messenger</span>
        <h4 className="title">Je veux m'enregistrer</h4>
        <form>
          <input type="text" placeholder="Nom"></input>
          <input type="email" placeholder="Email"></input>
          <input type="password" placeholder="Mot de passe"></input>
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <AddPhotoAlternateOutlinedIcon className="icon" />
            <span>Ajouter une image de profil</span>
          </label>
          <button>S'enregistrer</button>
        </form>
        <p>Vous avez déjà un compte ? Connectez-vous</p>
      </div>
    </div>
  );
};

export default Register;
