import axios from "axios";
import { useState } from "react";
let API = require("../api.js")
 
const Register = () => {

    // const [registerFormData, setRegisterFormData] = useState({});
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submitForm = async (e) => {
        // axios.post("http://localhost:5000/register", {
        //     name: name,
        //     email: email,
        //     password: password
        // })
        // .then((res) => console.log(res))
        // .catch((error) => console.log(error)) 
        e.preventDefault()
        let registerFormData = {
            name,
            email,
            password
        }

        API.postRegisterForm(registerFormData)
        await 
        
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={(e) => submitForm(e)} method="GET">

                <label htmlFor="name">Name</label>
                <input onChange={(e) => setName(e.target.value)} name="name" type="text"/>

                <label htmlFor="email">Email</label>
                <input onChange={(e) => setEmail(e.target.value)} name="email" type="email"/>

                <label htmlFor="password">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} name="password" type="password" required/>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Register