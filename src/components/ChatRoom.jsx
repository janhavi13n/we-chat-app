import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";
import { MessageInput } from "./MessageInput";
import Loader from "./Loader";

export const ChatRoom = ({ friendUid }) => {
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [chatId, setChatId] = useState("");
    const [friendInfo, setFriendInfo] = useState({
        name: "",
        email: "",
        photoURL: "",
    });

    useEffect(() => {
        const initChat = async () => {
            const id = [auth.currentUser.uid, friendUid].sort().join("_");
            setChatId(id);

            const friendDoc = await getDoc(doc(db, "users", friendUid));
            if (friendDoc.exists()) {
                setFriendInfo({
                    name: friendDoc.data().name,
                    email: friendDoc.data().email,
                    photoURL: friendDoc.data().photoURL,
                });
            }

            const chatRef = doc(db, "chats", id);
            const chatSnap = await getDoc(chatRef);
            if (!chatSnap.exists()) {
                await setDoc(chatRef, {
                    participants: [auth.currentUser.uid, friendUid],
                    createdAt: new Date(),
                });
            }

            const q = query(collection(db, "chats", id, "messages"), orderBy("createdAt"));

            const unsubscribe = onSnapshot(q, (snapshot) => {
                setMessages(snapshot.docs.map((doc) => doc.data()));
                setLoading(false);
            });

            return unsubscribe;
        };

        initChat();
    }, [friendUid]);

    return (
        <div className="chat-room">
            {friendInfo.name !== "" && 
            <div className="friendInfo">
                <img
                    src={friendInfo.photoURL}
                    alt="Friend"
                    className="user-avatar"
                />
                <label>
                    {friendInfo.name} ({friendInfo.email})
                </label>
            </div>}

            <div className="messages">
                {loading ? (
                    <Loader />
                ) : messages.length === 0 ?
                    (<label className="infolabel">No messages yet. Say hi 👋</label>) :
                    (messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message ${msg.uid === auth.currentUser.uid ? "mine" : "friend"
                                }`}
                        >
                            <strong>{msg.name}</strong>
                            <span className="message-text">{msg.text}</span>
                            {msg.createdAt && (
                                <span className="timestamp">
                                    {msg.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            )}
                        </div>
                    )))}
            </div>

            <MessageInput chatId={chatId} />
        </div>
    );
};
