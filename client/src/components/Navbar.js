import {
    BrowserRouter as Router,
    Switch,
    useHistory,
    useLocation,
    Link
} from "react-router-dom";
import "./styles/Navbar.scss"
import { useUser } from "../contexts/user";
// import axios from "axios";
import { useEffect, useRef } from "react";

const Navbar = () => {

    const { user, authenticated, logout } = useUser();
    let history = useHistory();
    let location = useLocation();
    const { navListItem } = useRef();

    useEffect(() => {

    }, [location])

    return (
        <nav>

            <div className="container">
                <Link to="/"><h3>MTB Consumer</h3></Link>
                <ul>
                    {!user && <li><Link to="/register">Register</Link></li>}
                    <li><Link to="/feed">Feed</Link></li>
                    {
                        user && <>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link to="/post">Post</Link></li>
                        </>
                    }
                    {
                        user ?
                            <li><button onClick={(e) => logout(() => history.push("/"))}>Logout</button></li>
                            :
                            <li ref={navListItem}><Link to="/login">Login</Link></li>
                    }

                </ul>
                {
                    user ?
                        <div className="profileNameImageParent">
                            <div className="profileImageDiv">
                                <img className="placeholderImage" src="../../placeholderPerson.png" alt="" />
                            </div>
                            <h4>&nbsp; {user.username}</h4>
                        </div>
                        :
                        <></>
                }
            </div>
        </nav>
    )
}

export default Navbar;