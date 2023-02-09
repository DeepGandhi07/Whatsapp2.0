// import '../styles/globals.css'
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loading } from "../components/Loading";
import { auth, db } from "../firebase";
import Login from "./Login";
import firebase from "../firebase";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const db = getFirestore();
      setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          lastSeen: serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]);
  if (loading) return <Loading />;
  if (!user) return <Login />;
  return <Component {...pageProps} />;
}

export default MyApp;
