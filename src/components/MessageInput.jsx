import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";
import sendIcon from "../assets/send.svg";

export const MessageInput = ({ chatId }) => {
    const [newMsg, setNewMsg] = useState("");

    const sendMessage = async () => {
        if (newMsg.trim() === "" || !chatId) return;

        await addDoc(collection(db, "chats", chatId, "messages"), {
            text: newMsg,
            createdAt: serverTimestamp(),
            uid: auth.currentUser.uid,
            name: auth.currentUser.displayName,
        });

        setNewMsg("");
    };

    return (
        <div className="friendInfo">
            <input
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                placeholder="Type your message..."
            />
            <button className="sendBtn" onClick={sendMessage}>
                <img src={sendIcon} alt="Send-button" />
            </button>
        </div>
    );
};
