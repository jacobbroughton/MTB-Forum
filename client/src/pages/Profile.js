import { useUser } from "../contexts/user";

const Profile = () => {

    let { user } = useUser();

    return (
        <div>
            Profile
            {user &&  <h1>{user.username}</h1>}
        </div>
    )
}

export default Profile;