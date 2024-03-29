import { createContext, ReactNode, useEffect, useState } from "react";
import { firebase, auth } from "../service/firebase";

type UserType = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: UserType | undefined;
  singInWithGoogle: () => Promise<void>;
}

type AuthContextProviderType = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderType) {

  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user
        if (!displayName || !photoURL) {
          throw new Error(' Missing information from Google Account ')
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    });
    return () => {
      unsubscribe();
    }
  }, []);

  async function singInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user
      if (!displayName || !photoURL) {
        throw new Error(' Missing information from Google Account ')
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }
  return (
    <AuthContext.Provider value={{ user, singInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}