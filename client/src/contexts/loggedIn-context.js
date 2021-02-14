import React, { useEffect, createContext, useContext } from "react";

export const LoggedInContext = createContext();
export const useLoggedIn = () => useContext(LoggedInContext);

export const LoggedInProvider = (props) => {

    useEffect(() => {
        axios
        .get("")
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }, [])

    return (
        <LoggedInProvider value={}>
            {props.children}
        </LoggedInProvider>
    )
}