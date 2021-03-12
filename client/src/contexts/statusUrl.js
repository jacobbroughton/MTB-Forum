import { useEffect, createContext, useContext } from "react";

export const StatusUrlContext = createContext();
export const useStatusUrl = () => useContext(StatusUrlContext);

export const StatusUrlProvider = props => {

    let initialState = {
        serverUrl: process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://mtb-forum.herokuapp.com",
        clientUrl: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://mtb-forum.herokuapp.com"
    }

    return (

        <StatusUrlContext.Provider value={initialState}>
            {props.children}
        </StatusUrlContext.Provider>
    )
}