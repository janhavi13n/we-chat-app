import { useState, useEffect } from "react";
import "./App.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { Navbar } from "./components/Navbar";
import { AddFriend } from "./components/AddFriend";
import { FriendsList } from "./components/FriendsList";
import { ChatRoom } from "./components/ChatRoom";
import SignInPage from "./components/SignInPage";

function App() {
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [theme, setTheme] = useState("light");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        }
    }, []);

    useEffect(() => {
        document.body.className = theme === "dark" ? "dark-theme" : "";
    }, [theme]);

    const refreshFriends = () => {
        setRefreshKey(prev => prev + 1);
    };

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.body.className = newTheme === "dark" ? "dark-theme" : "";
    };

    return (
        <div className="app-container">
            <Navbar theme={theme} toggleTheme={toggleTheme} user={user} />

            {!!user ? <div className="chat-container">
                <div className="sidebar">
                    <AddFriend refreshFriends={refreshFriends} />
                    <FriendsList key={refreshKey} selectChat={setSelectedFriend} />
                </div>
                <div className="chatRoom">
                    {selectedFriend ? (
                        <ChatRoom friendUid={selectedFriend} />
                    ) : (
                        <label className="infolabel">Select a friend to start chatting</label>
                    )}
                </div>
            </div> : (<SignInPage />)}

        </div>
    );
}

export default App;
