import { Link } from "react-router-dom"
import { useUser } from "../contexts/user"
import "./styles/Home.scss"


const Home = () => {

    const { user } = useUser();

    return (
        <>
            { !user && (
                <div className="loggedOutView">
                    <div className="loggedOutChild">
                        <h1>Mountain Biking Forum</h1>
                        <div className="signupSigninParent">
                            <Link className="homeRegister" to="/register">Create an account</Link>
                            <Link className="homeLogin" to="/login">Sign in</Link>
                        </div>
                    </div>

                </div>

            )}
        </>
    )
}

export default Home;