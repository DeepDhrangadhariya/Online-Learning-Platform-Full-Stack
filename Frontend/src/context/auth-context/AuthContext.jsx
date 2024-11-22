import { initialSignInFormData, initialSignUpFormData } from "@/components/config/SignUpFormControls";
import { checkAuthService, loginService, registerService } from "@/services/services";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null)

export default function AuthProvider({children}) {

    const [signInFormData, setSignInFormData] = useState(initialSignInFormData)
    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData)
    const [authState, setAuthState] =useState({
        authenticate: false,
        user: null
    })

    async function handleRegisterUser(event) {
        event.preventDefault()
        const data = await registerService(signUpFormData)
    }

    async function handleLoginUser(event) {
        event.preventDefault()
        const data = await loginService(signInFormData)

        if(data.success) {
            sessionStorage.setItem('accessToken', JSON.stringify(data.data.accessToken))
            setAuthState({
                authenticate: true,
                user: data.data.user
            })
        } else {
            setAuthState({
                authenticate: false,
                user: null
            })
        }
    }

    async function checkAuthUser() {
        const data = await checkAuthService()

        if(data.success) {
            setAuthState({
                authenticate: true,
                user: data.data.user
            })
        } else {
            setAuthState({
                authenticate: false,
                user: null
            })
        }
    }

    useEffect(() => {
        checkAuthUser()
    },[])

    // console.log(authState)

    return( 
        <AuthContext.Provider value={{
            signInFormData,
            setSignInFormData,
            signUpFormData,
            setSignUpFormData,
            handleRegisterUser,
            handleLoginUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}