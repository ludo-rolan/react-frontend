import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react';
import { createContext, useState } from 'react'
import { useNavigate } from 'react-router';

interface AuthContextType {
    user: any,
    authTokens: any,
    loginUser: any,
    logoutUser: any,
}

interface AuthToken {
    token_type: any,
    exp: any,
    iat: any,
    jti: any,
    user_id: any,
    username: any
}

interface AuthTokens {
    access: string,
    refresh: string
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    authTokens: null,
    loginUser: null,
    logoutUser: null,
})

export default AuthContext;

export const AuthProvider = ({ children }: { children: any }) => {

    let [loading, setLoading] = useState(true)

    const initialUser: any | null = () => {
        const authToken = localStorage.getItem('authTokens');
        return authToken ? jwtDecode(authToken) : null;
    };

    const [user, setUser] = useState<AuthToken | null>(initialUser);


    // Initial state function
    const initialAuthTokens = (): AuthTokens | null => {
        const storedTokens = localStorage.getItem('authTokens');
        return storedTokens ? JSON.parse(storedTokens) : null;
    };
    // State declaration
    const [authTokens, setAuthTokens] = useState<AuthTokens | null>(initialAuthTokens);

    const navigate = useNavigate()

    useEffect(() => {

        const REFRESH_INTERVAL = 1000 * 60 * 4 // 4 minutes
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, REFRESH_INTERVAL)
        return () => clearInterval(interval)

    }, [authTokens])


    let loginUser = async (e: any) => {
        e.preventDefault()
        const response = await fetch(
            'http://pesthoteldeepleaf.eastus.cloudapp.azure.com/api/token/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        username: e.target.username.value,
                        password: e.target.password.value
                    }
                )
            }
        )

        let data = await response.json()

        if (data.access) {
            localStorage.setItem('authTokens', JSON.stringify(data))
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            navigate('/')
        } else {
            alert('Something went wrong while loggin in the user!')
        }
    }


    let logoutUser = (e: any) => {
        e.preventDefault()
        localStorage.removeItem('authTokens')
        setAuthTokens(null)
        setUser(null)
        navigate('/login')
    }

    const updateToken = async () => {
        const response = await fetch(
            'http://pesthoteldeepleaf.eastus.cloudapp.azure.com/api/token/refresh/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refresh: authTokens?.refresh })
            }
        )

        const data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            // logout user
            localStorage.removeItem('authTokens')
            setAuthTokens(null)
            setUser(null)
            navigate('/login')
        }

        if (loading) {
            setLoading(false)
        }
    }

    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}