import React, { useContext, useEffect, useState } from "react";
import "./Messages.scss";
import Message from "../message/Message";
import { ChatContext } from "../../context/ChatContext";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  // À chaque changement de l'ID du chat dans les données du contexte du chat, on s'abonne à l'observateur du document correspondant dans la base de données Firebase
  useEffect(() => {
    // Définition de l'observateur
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      // Si le document existe, on met à jour l'état des messages avec les nouvelles données du document
      doc.exists() && setMessages(doc.data().messages);
    });

    // Lors du nettoyage de l'effet, on se désabonne de l'observateur
    return () => {
      unSub();
    };
  }, [data.chatId]);

  //console.log(messages);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
