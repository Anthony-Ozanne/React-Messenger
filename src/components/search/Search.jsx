import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import "./Search.scss";
import Avatar from "@mui/material/Avatar";

const Search = () => {
  const [username, setUsername] = useState();
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  // Récupérer l'utilisateur courant à partir du contexte d'authentification
  const { currentUser } = useContext(AuthContext);

  // Fonction pour gérer la recherche
  const handleSearch = async () => {
    // Recherche un utilisateur par son nom
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      // Exécuter la requête et mettre à jour l'état avec les résultats
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    // Vérifier si le groupe chats(dans firestore) existe, sinon le créer
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        // Créer un chat dans la collection collection chats
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // Mettre à jour la collection 'userChats' pour l'utilisateur courant
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        // Mettre à jour la collection 'userChats' pour le nouvel utilisateur
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    // Réinitialiser l'état pour l'utilisateur et le nom d'utilisateur
    setUser(null);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Recherchez une personne"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>Utilisateur introuvable</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <Avatar
            className="avatar"
            alt={user.displayName}
            src={user.photoURL}
          />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
