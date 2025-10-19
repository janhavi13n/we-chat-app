import { useState } from "react";
import { db, auth } from "../firebase";
import { doc, updateDoc, arrayUnion, getDocs, collection, query, where } from "firebase/firestore";

export const AddFriend = ({ refreshFriends }) => {
    const [friendEmail, setFriendEmail] = useState("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleAddFriend = async () => {
        if (!friendEmail) {
            alert("Enter an email");
            return;
        }

        const user = auth.currentUser;
        if (!user) {
            alert("Please log in first");
            return;
        }

        try {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", friendEmail.toLowerCase()));
            const querySnapshot = await getDocs(q);

            if(!emailRegex.test(friendEmail)) {
                alert("Please enter a valid email address");
                setFriendEmail("");
                return;
            }

            if (querySnapshot.empty) {
                alert("User not found, please ask your friend to login first");
                setFriendEmail("");
                return;
            }

            const friendUid = querySnapshot.docs[0].id;

            // Prevent adding self
            if (friendUid === user.uid) {
                alert("You cannot add yourself");
                setFriendEmail("");
                return;
            }

            await updateDoc(doc(db, "users", user.uid), {
                friends: arrayUnion(friendUid)
            });

            alert("Friend added successfully!");
            setFriendEmail("");

            if (refreshFriends) refreshFriends();

        } catch (err) {
            console.error("Error adding friend:", err);
            alert("Failed to add friend");
        }
    };

    return (
        <div className="add-friend">
            <input
                type="email"
                value={friendEmail}
                onChange={(e) => setFriendEmail(e.target.value)}
                placeholder="Enter friend's email"
            />
            <button onClick={handleAddFriend}>Add Friend</button>
        </div>
    );
};
