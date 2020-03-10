import React, {useState, createContext} from "react";


export const IpContext = createContext([]);

export const IpProvider = (props) => {

    const [backendIp, setBackendIp] = useState("http://localhost:8080");

    return (
        <IpContext.Provider value={{backendIp, setBackendIp}} >
            {props.children}
        </IpContext.Provider>
    )
};