import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile 
} from "firebase/auth";

// ✅ CREATE CONTEXT
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = (email, password, name) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (cred) => {
        return updateProfile(cred.user, { displayName: name });
      }
    );
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, signup, login, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

// ✅ HOOK TO USE CONTEXT
export const useAuth = () => {
  return useContext(AuthContext);
};
