import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();
// Composant fournisseur du contexte de chat
export const ChatContextProvider = ({ children }) => {
  // Accès à l'utilisateur courant à partir du contexte d'authentification
  const { currentUser } = useContext(AuthContext);

  // Etat initial du chat
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  // Reducer pour gérer les modifications de l'état du chat
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
        // ACTION CLEAR CHAT : permet de nettoyer le chat après la déconnexion d'un utilisateur
        case "CLEAR_CHAT":
      return INITIAL_STATE;

      default:
        return state;
    }
  };

  // useReducer pour gérer l'état du chat
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
