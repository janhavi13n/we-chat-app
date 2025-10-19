import profileImg from "../assets/profile-circle.svg";

export const UserDetails = ({ user, showEmail }) => {
    return (
        <div key={user.uid} className="friendInfo">
            <img
                src={user.photoURL || profileImg}
                alt="Friend"
                className="user-avatar"
            />
            <label>{user.name} {showEmail && `(${user.email})`}</label>
        </div>
    );
};
