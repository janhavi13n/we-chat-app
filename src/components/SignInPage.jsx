import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import "../styles/sign-in-page.css";

const SignInPage = ({ onSignIn }) => {
    const handleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Create Firestore user doc if it doesn't exist
            const userRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userRef);

            if (!docSnap.exists()) {
                await setDoc(userRef, {
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email.toLowerCase(),
                    photoURL: user.photoURL,
                    friends: [],
                });
            }

            if (onSignIn) onSignIn(user);
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    return (
        <div className="sign-in-page">
            <h2>Welcome to WeChat 💬</h2>
            <p>Please sign in to continue</p>
            <button className="signin-btn" onClick={handleSignIn}>
                Sign in with Google
            </button>
        </div>
    );
};

export default SignInPage;
