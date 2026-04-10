import React, { createContext, useState, useContext, useEffect } from "react";
import auth, {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const AuthContext = createContext();

GoogleSignin.configure({
  webClientId:
    "722597026167-ipn9o770m780k3v20mvhjvrcvcsr167m.apps.googleusercontent.com",
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth(), (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // register with email
  const registerWithEmail = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth(), email, password);
    } catch (error) {
      console.error("Registration Error:", error);
      throw error;
    }
  };

  // login with email
  const loginWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth(), email, password);
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  };

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const signInResult = await GoogleSignin.signIn();

      const idToken = signInResult.data?.idToken;

      if (!idToken) {
        throw new Error("No ID Token found");
      }

      const credential = GoogleAuthProvider.credential(idToken);

      await signInWithCredential(auth(), credential);
    } catch (error) {
      console.error("Google Login Error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await GoogleSignin.signOut();
      await firebaseSignOut(auth());
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, googleLogin, registerWithEmail, loginWithEmail, logout, loading }}>
    {children}
  </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
