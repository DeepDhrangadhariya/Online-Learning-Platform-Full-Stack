import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config/Config";
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
    const [loading, setLoading] = useState(true)

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
        try {
            const data = await checkAuthService()
    
            if(data.success) {
                setAuthState({
                    authenticate: true,
                    user: data.data.user
                })
                setLoading(false)
            } else {
                setAuthState({
                    authenticate: false,
                    user: null
                })
                setLoading(false)
            }
        } catch (error) {
            if(!error?.response?.data?.success) {
                setAuthState({
                    authenticate: false,
                    user: null
                })
                setLoading(false)
            }
        }
    }

    function resetCredentials() {
        setAuthState({
            authenticate: false,
            user: null
        })
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
            handleLoginUser,
            authState,
            resetCredentials
        }}>
            {loading ? <Skeleton/> : children}
        </AuthContext.Provider>
    )
}