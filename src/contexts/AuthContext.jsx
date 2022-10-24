import { createContext } from "react";

export const AuthContext = createContext({})

export function AuthProvider({children}) {
    const isAuthenticated = false

    async function signIn() {
        const { } = fetch()
    }

    return (
        <AuthContext.Provider value={{isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}