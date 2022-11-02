import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({})
    const [address, setAddress] = useState({})
    const [user, setUser] = useState({})
    
    const isAuthenticated = false

    useEffect(() => {
        setAddress(userInfo.endereco)
        setUser(userInfo.usuario)
        console.log('Auth: ', userInfo)
    }, [userInfo])

    
    return (
        <AuthContext.Provider value={{isAuthenticated, userInfo, setUserInfo, address, setAddress}}>
            {children}
        </AuthContext.Provider>
    )
}