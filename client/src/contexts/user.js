import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import { useStatusUrl } from "./statusUrl";

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);



export const UserProvider = (props) => {

    const [user, setUser] = useState(null)
    const [authenticated, setAuthenticated] = useState(false)
    const { statusUrl } = useStatusUrl();


    useEffect(() => {
        getUser();
    }, [])
    

    useEffect(() => {
        console.log(user)
    }, [user])


    const logout = cb => {
        axios({
            method: "get",
            withCredentials: true,
            url: `${statusUrl}/api/logout`
        })
        .then((res) => {
            setAuthenticated(false)
            setUser(null)
        })
        cb();
    }


    const getUser = () => {
        console.log(user)
        axios({
            method: "get",
            withCredentials: true,
            url: `${statusUrl}/api/user`
        })
        .then((res) => {
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