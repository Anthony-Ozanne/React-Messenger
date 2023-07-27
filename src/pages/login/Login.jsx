import React from "react";
import "./Login.scss";

const Login = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">React Messenger</span>
        <h4 className="title">Je me connecte</h4>
        <form>
          <input type="email" placeholder="Email"></input>
          <input type="password" placeholder="Mot de passe"></input>
          <button>Se connecter</button>
        </form>
        <p>Vous n'avez pas de compte ? Créer mon compte</p>
      </div>
    </div>
  );
};

export default Login;
