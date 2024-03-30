import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = () =>{
        //to do 
        setCurrentUser({id:1, name:"Yiğit Sağlam",profilePic:
        "/images/yigitpp.jpg" })
    };

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser));
    },[currentUser]);


    return (
        <AuthContext.Provider value={{currentUser,login }}>
            {children}
        </AuthContext.Provider>
    );
};