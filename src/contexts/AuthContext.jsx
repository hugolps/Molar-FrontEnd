import { useState, createContext, useEffect } from "react";
import Cookies from 'js-cookie'

export const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({})
    const [address, setAddress] = useState({})
    const [user, setUser] = useState({})
    const [authorization, setAuthorization] = useState({})
    const [errors, setErrors] = useState({})


    const isAuthenticated = false

    useEffect(() => {
        setAddress(userInfo.endereco)
        setUser(userInfo.usuario)
        setAuthorization(userInfo.Authorization)
        console.log('Auth: ', userInfo)
        console.log('User: ', user)
        console.log('Endereço: ', address)
        console.log('Authorization: ', authorization)
        const auth = Cookies.get('Authorization')
        if (!auth || auth === "undefined"){
          Cookies.set('Authorization', JSON.stringify(authorization))
        }
    }, [userInfo, user, address, authorization])


    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            userInfo,
            setUserInfo,
            address,
            setAddress,
            errors,
            setErrors,
            authorization,
            setAuthorization
            }}>
            {children}
        </AuthContext.Provider>
    )
}
