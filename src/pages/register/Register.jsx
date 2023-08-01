import React, { useState } from "react";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import "./Register.scss";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

// Composant pour la page d'inscription
const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // Crée un nouvel utilisateur avec l'email et le mot de passe
      const res = await createUserWithEmailAndPassword(auth, email, password);
  
      // Crée une référence au stockage pour l'avatar de l'utilisateur
      const storageRef = ref(storage, res.user.uid); 
  
      // Télécharge l'avatar dans le stockage
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Gère les changements d'état du téléchargement et les erreurs
      uploadTask.on('state_changed', 
        (snapshot) => {
          
        }, 
        (error) => {
          setErr(true);
        }, 
        () => {

          // Code à exécuter une fois le téléchargement terminé
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            
            // Met à jour le profil de l'utilisateur avec le nom d'affichage et l'URL de l'avatar
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            // Enregistre les données de l'utilisateur dans la base de données Firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">React Messenger</span>
        <h4 className="title">Je veux m'enregistrer</h4>
        <form onSubmit={handleSubmit}>
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
        {err && <span>Quelque chose ne marche pas comme prévu</span>}
        <p>
          Vous avez déjà un compte ? <Link to="/login">Connectez-vous</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
