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

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

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
