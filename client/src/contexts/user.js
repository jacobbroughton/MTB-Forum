import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import { useStatusUrl } from "./statusUrl";

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);



export const UserProvider = (props) => {

    const [user, setUser] = useState(null)
    const [authenticated, setAuthenticated] = useState(false)
    const { serverUrl } = useStatusUrl();


    useEffect(() => {
        console.log(serverUrl)
        getUser();
    }, [])
    

    const logout = cb => {
        axios({
            method: "get",
            withCredentials: true,
            url: `${serverUrl}/api/logout`
        })
        .then((res) => {
            console.log("Logging out")
            setAuthenticated(false)
            setUser(null)
        })
        cb();
    }


    const getUser = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: `${serverUrl}/api/user`
        })
        .then((res) => {
            console.log("Getting user")
            console.log(res.data)
            setAuthenticated(true);
            setUser(res.data)
        })
        .catch(err => console.log(err))
    }


    return (
        <UserContext.Provider value={{
            user,
            logout,
            authenticated,
            setAuthenticated,
            getUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}