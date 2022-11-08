import { useState, createContext, useEffect } from "react";
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

export const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({})
    const [address, setAddress] = useState({})
    const [user, setUser] = useState({})
    const [authorization, setAuthorization] = useState({})
    const [errors, setErrors] = useState({})

    const isAuthenticated = false
    const auth = Cookies.get('Authorization')
    const userAuth = Cookies.get('Usuário')
    const addressAuth = Cookies.get('Endereço')
    const router = useRouter()


    const logout = () => {
        Cookies.remove('Authorization', {path: ''})
        Cookies.remove('Usuário', {path: ''})
        Cookies.remove('Endereço', {path: ''})
        
        setUserInfo({})

        if (!auth || auth === "undefined") {
            router.push('/pages/login')
          }
        
    }

    useEffect(() => {
        if(userInfo !== {}) {
        setAddress(userInfo.endereco)
        setUser(userInfo.usuario)
        setAuthorization(userInfo.Authorization)
        console.log('Auth: ', userInfo)
    }
    }, [userInfo])

    useEffect(() => {
        if (!auth || auth === "undefined") {
            Cookies.set('Authorization', JSON.stringify(authorization))
            console.log('Token: ', authorization)
          }
    },[authorization, auth])

    useEffect(() => {
        if (!userAuth || userAuth === "undefined") {
            Cookies.set('Usuário', user)
            console.log('Usuário', user)
          }
    },[user, userAuth])

    useEffect(() => {
        if (!addressAuth || addressAuth === "undefined") {
            Cookies.set('Endereço', address)
            console.log('Endereço', address)
          }
    },[address, addressAuth])


    // useEffect(() => {
    //     console.log(user)
    // },[user])


    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            userInfo,
            setUserInfo,
            user,
            setUser,
            address,
            setAddress,
            errors,
            setErrors,
            authorization,
            setAuthorization,
            logout
            }}>
            {children}
        </AuthContext.Provider>
    )
}
