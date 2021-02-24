import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);


export const UserProvider = (props) => {

    const [user, setUser] = useState(null)
    const [authenticated, setAuthenticated] = useState(false)


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
            url: "http://localhost:5000/api/logout"
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
            url: "http://localhost:5000/api/user"
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