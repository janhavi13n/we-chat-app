import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Loader from "./Loader";

export const FriendsList = ({ selectChat }) => {
    const [loading, setLoading] = useState(true);
    const [friends, setFriends] = useState([]);

    const loadFriends = async (uid) => {
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
            const friendIds = userDoc.data().friends || [];

            const friendData = [];
            for (let fid of friendIds) {
                const fDoc = await getDoc(doc(db, "users", fid));
                if (fDoc.exists()) {
                    friendData.push({
                        uid: fid,
                        name: fDoc.data().name,
                        email: fDoc.data().email,
                        photoURL: fDoc.data().photoURL,
                    });
                }
            }
            setFriends(friendData);
            setLoading(false);
        } else {
            setLoading(false)
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) loadFriends(user.uid);
        });
        return unsubscribe;
    }, []);


    return (
        <div className="friends-list">
            <h3>Your Friends</h3>
            {loading ? (
                <Loader />
            ) : friends.length === 0 ? (
                <p>No friends found</p>
            ) : (
                <div>
                    {friends?.map((friend) => (
                        <div
                            key={friend.uid}
                            className="friendList"
                            onClick={() => selectChat(friend.uid)}
                        >
                            <img src={friend.photoURL} alt="Friend" className="user-avatar" />
                            {friend.name}
                        </div>
                    ))}
                </div>
            )}


        </div>
    );
};
