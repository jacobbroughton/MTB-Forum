import { useState, useEffect } from "react";
import axios from "axios"
import { useUser } from "../contexts/user";
import { useHistory, useLocation } from "react-router-dom"
import "./styles/Login.scss";

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { getUser } = useUser()
    let history = useHistory();
    let location = useLocation();


    const loginReq = (e) => {
        e.preventDefault()

        let payload = {
            username,
            password
        }



        let { from } = location.state || { from: { pathname: "/" } }

        axios({
            method: "post",
            data: payload,
            withCredentials: true, // True otherwise I receive another error
            url: `${statusUrl}/api/login`
        })
            .then(() => getUser())
            .catch(err => console.log(err))

        history.replace(from)

    }

    return (
        <div className="loginFullPage">
            
            <form className="loginForm" onSubmit={(e) => loginReq(e)} method="POST">
               <h1 className="loginHeading">Login</h1>
                <div className="formInputParent">

                    <input onChange={(e) => setUsername(e.target.value)} name="username" type="text" />
                    <label htmlFor="username">Username</label>
                </div>


                <div className="formInputParent">
                    <input onChange={(e) => setPassword(e.target.value)} name="password" type="password" />
                    <label htmlFor="password">Password</label>
                </div>


                <button type="submit">Submit</button>
            </form>
        </div>

    )
}

export default Login;