import React, { useContext, useEffect, useState } from "react";
import "./Chats.scss";
import Avatar from "@mui/material/Avatar";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  // Permet de s'abonner aux changements dans Firestore lorsque le composant est monté
  useEffect(() => {
    // Création d'un abonnement à Firestore pour obtenir les chats pour l'utilisateur actuel
    const getChats = () => {
      // L'abonnement est stocké dans 'unsub' pour qu'il puisse être annulé
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        const data = doc.data();
        // Mise à jour de l'état de 'chats' avec les données du document Firestore
        setChats(data);
      });

      return () => {
        unsub();
      };
    };
    // Si l'uid de l'utilisateur actuel est défini, exécute la fonction getChats
    currentUser.uid && getChats();
    // Déclenche l'exécution du useEffect chaque fois que 'currentUser.uid' change
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    // Dispatch d'une action pour changer l'utilisateur sélectionné dans le contexte de chat
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="userChats"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <Avatar
              className="avatar"
              alt="Jack"
              src={chat[1].userInfo.photoURL}
            />
            <div className="userChatsInfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
