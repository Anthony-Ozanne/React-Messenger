import React, { useContext, useState } from "react";
import "./Input.scss";
import AttachEmailOutlinedIcon from "@mui/icons-material/AttachEmailOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import SendIcon from "@mui/icons-material/Send";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage, db } from "../../firebase";
import { v4 as uuid } from "uuid";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Récupération des informations de l'utilisateur actuel et du contexte du chat
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    setIsLoading(true);
    if (img) {
      // Initialisation du processus de téléchargement de l'image sur le serveur Firebase
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {},
        async () => {
          try {
            // Une fois le téléchargement terminé, on récupère l'URL pour le téléchargement de l'image
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            // Et on met à jour la base de données Firebase avec les nouvelles données du message
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          } catch (error) {
            console.error("An error occurred:", error);
          } finally {
            // Indique la fin du processus d'envoi du message
            setIsLoading(false);
          }
        }
      );
    } else {
      // Si aucune image n'est attachée au message, on met simplement à jour la base de données avec les nouvelles données du message
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
      setIsLoading(false);
    }

    // Met à jour les informations du dernier message envoyé pour l'utilisateur actuel et l'utilisateur du chat
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    // Réinitialise le texte et l'image de l'état local
    setText("");
    setImg(null);
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Ecrivez votre message ..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <div className="send">
        <AttachEmailOutlinedIcon className="attach" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <AddPhotoAlternateOutlinedIcon className="AddPhoto" />
        </label>
        <SendIcon className="button" onClick={handleSend} />
      </div>
    </div>
  );
};

export default Input;
