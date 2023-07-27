import React from "react";
import "./Register.scss";

const Register = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">React Messenger</span>
        <h4 className="title">Je veux m'enregistrer</h4>
        <form>
          <input type="text" placeholder="display name"></input>
          <input type="email" placeholder="email"></input>
          <input type="password" placeholder="password"></input>
          <input type="file"></input>
          <button>S'enregistrer</button>
        </form>
        <p>Vous avez déjà un compte ? Connectez-vous</p>
      </div>
    </div>
  );
};

export default Register;
