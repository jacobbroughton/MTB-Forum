import { useEffect, createContext, useContext } from "react";

export const StatusUrlContext = createContext();
export const useStatusUrl = () => useContext(StatusUrlContext);

export const StatusUrlProvider = props => {

    let initialState = {
        serverUrl: process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://ecstatic-hodgkin-b2db53.netlify.app",
        clientUrl: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://ecstatic-hodgkin-b2db53.netlify.app"
    }

    return (

        <StatusUrlContext.Provider value={initialState}>
            {props.children}
        </StatusUrlContext.Provider>
    )
}