import { useState } from "react";
import axios from "axios";
import moment from "moment";
import {
    useHistory
} from "react-router-dom";
import { useStatusUrl } from "../contexts/statusUrl"
import "./styles/Register.scss";

const Register = () => {

    const [registerName, setRegisterName] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const { serverUrl } = useStatusUrl()
    let history = useHistory()

    const register = () => {

        let date = moment().format('MMMM Do YYYY')
        let time = moment().format('LT')
        let profilePicture = ""; // Change to state eventually

        axios({
            method: "post",
            data: {
                username: registerName,
                password: registerPassword,
                firstName,
                lastName,
                profilePicture,
                date: date,
                time: time
            },
            withCredentials: true,
            url: `${serverUrl}/api/register`
        })
        .then((res) => console.log(res))
        history.push("/login");
    }

    return (
        <div className="registerFullPage">

            <form className="registerForm" onSubmit={(e) => register(e)}>
                <h1 className="registerHeading">Register</h1>


                <div className="formInputParent">
                    <input onChange={(e) => setRegisterName(e.target.value)} name="username" type="text" />
                    <label htmlFor="username">Username <span className="requiredAsterisk">*</span></label>
                </div>


                <div className="formInputParent">
                    <input onChange={(e) => setRegisterPassword(e.target.value)} name="password" type="password" required />
                    <label htmlFor="password">Password <span className="requiredAsterisk">*</span></label>
                </div>

                <div className="formInputParent">
                    <input onChange={(e) => setFirstName(e.target.value)} name="firstName" type="text" />
                    <label htmlFor="firstName">First Name</label>
                </div>

                <div className="formInputParent">
                    <input onChange={(e) => setLastName(e.target.value)} name="lastName" type="text" />
                    <label htmlFor="lastName">Last Name</label>
                </div>


                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Register