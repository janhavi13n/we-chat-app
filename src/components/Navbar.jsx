import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";
import "../styles/navbar.css";

export const Navbar = ({ theme, toggleTheme, user }) => {
    
    const handleSignOut = () => {
        signOut(auth);
    }

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h2>WeChat</h2>
            </div>
            <div className="navbar-right">
                {!user ? (
                    <div className="theme-toggle" onClick={toggleTheme} >
                        <img src={theme === "light" ? moon : sun} alt="theme-icon" width="30" height="30" />
                    </div>

                ) : (
                    <div className="navbarRight">
                        <div className="user-info">
                            <img
                                src={user.photoURL}
                                alt="Profile"
                                className="user-avatar"
                            />
                            <div className="user-details">
                                <label className="username">{user.displayName}</label>
                                <label className="useremail">{user.email}</label>
                            </div>
                        </div>
                        <div className="user-info">
                            <div className="theme-toggle" onClick={toggleTheme} >
                                <img src={theme === "light" ? moon : sun} alt="theme-icon" width="30" height="30" />
                            </div>
                            <button onClick={() => handleSignOut()} className="signout-btn">
                                Sign Out
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </nav>
    );
};
