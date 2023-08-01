import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

// Composant fournisseur du contexte d'authentification
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  // Utilisation de useEffect pour gérer les changements d'état d'authentification
  useEffect(() => {
    // onAuthStateChanged est une méthode Firebase qui écoute les changements d'état d'authentification.
    const unsub = onAuthStateChanged(auth, (user) => {
      // À chaque changement d'état d'authentification, on met à jour l'état de currentUser.
      setCurrentUser(user);
      console.log(user);
    });
    // Lorsque le composant est désinstallé, nous arrêtons l'écoute des changements d'état d'authentification.
    return () => {
      unsub();
    };
  }, []); // Ne s'exécute qu'une fois après le rendu initial.

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
