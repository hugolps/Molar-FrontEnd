import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({})
    const [address, setAddress] = useState({})
    const [user, setUser] = useState({})
    const [errors, setErrors] = useState({})

    
    const isAuthenticated = false

    useEffect(() => {
        setAddress(userInfo.endereco)
        setUser(userInfo.usuario)
        console.log('Auth: ', userInfo)
        console.log('User: ', user)
        console.log('Endereço: ', address)
    }, [userInfo, user, address])

    
    return (
        <AuthContext.Provider value={{
            isAuthenticated, 
            userInfo, 
            setUserInfo, 
            address, 
            setAddress, 
            errors,
            setErrors
            }}>
            {children}
        </AuthContext.Provider>
    )
}