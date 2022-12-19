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
    const [auth, setAuth] = useState(Cookies.get('Authorization'))
    const [userAuth, setUserAuth] = useState(Cookies.get('Usuario'))
    const [addressAuth, setAddressAuth] = useState(Cookies.get('Endereco'))
    const [imovelId, setImovelId] = useState()

    const isAuthenticated = false
    // const auth = Cookies.get('Authorization')
    // const userAuth = Cookies.get('Usuário')
    // const addressAuth = Cookies.get('Endereço')
    const router = useRouter()


    const logout = () => {
        Cookies.remove('Authorization', {path: ''})
        Cookies.remove('Usuario', {path: ''})
        Cookies.remove('Endereco', {path: ''})

        setUserInfo({})

        if (!auth || auth === "undefined" || auth === {}) {
            router.push('/')
        }

    }

    useEffect(() => {
        if(userInfo !== {} && userInfo !== "undefined") {
        setAddress(userInfo.endereco)
        setUser(userInfo.usuario)
        setAuthorization(userInfo.Authorization)
        } else{
          setAddress({})
          setUser({})
          setAuthorization({})
        }
    }, [userInfo])

    useEffect(() => {
      if (!auth || auth === "undefined" || auth === {}) {

            Cookies.set('Authorization', JSON.stringify(authorization))
          }
    },[authorization, auth])

    useEffect(() => {
        if (!userAuth || userAuth === "undefined" || userAuth === {}) {
            Cookies.set('Usuario', JSON.stringify(user))
          }
    },[user, userAuth])

    useEffect(() => {
        if (!addressAuth || addressAuth === "undefined" || addressAuth === {}) {
            Cookies.set('Endereco', JSON.stringify(address))
          }
    },[address, addressAuth])


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
            auth,
            addressAuth,
            userAuth,
            setAuth,
            logout,
            imovelId,
            setImovelId
            }}>
            {children}
        </AuthContext.Provider>
    )
}
