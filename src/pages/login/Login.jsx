import React, { useState } from "react";
import "./Login.scss";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">React Messenger</span>
        <h4 className="title">Je me connecte</h4>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email"></input>
          <input type="password" placeholder="Mot de passe"></input>
          <button>Se connecter</button>
        </form>
        {err && <span>Quelque chose ne marche pas comme prévu</span>}
        <p>
          Vous n'avez pas de compte ?{" "}
          <Link to="/register">Créer mon compte</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
