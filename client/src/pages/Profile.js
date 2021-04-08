import { useUser } from "../contexts/user";
import "./styles/Profile.scss";

const Profile = () => {
  let { user } = useUser();

  return (
    <div className="profileWrapper">
      {user.profile_picture ? (
        <img className="profilePicture" src={user.profile_picture} alt="" />
      ) : (
        <img
          className="profilePicture"
          src="../../placeholderPerson.png"
          alt=""
        />
      )}
      <h1 className="username">{user.username}</h1>
    </div>
  );
};

export default Profile;
