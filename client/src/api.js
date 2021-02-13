import axios from "axios";

export const postRegisterForm = (response) => {
     axios
        .post("http://localhost:5000/api/register", response)
        .then((res) => console.log("Posted to server"))
        .catch((error) => console.log(error)) 

}