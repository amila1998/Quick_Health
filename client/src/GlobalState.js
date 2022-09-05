import React, { createContext, useState, useEffect } from 'react'
import UserAPI from './api/UserAPI'


export const GlobalState = createContext()


export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false)
    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')
        if (firstLogin) {
            setToken(window.sessionStorage.getItem('_t@ken'))
        }
    }, [])



    const state = {
        token: [token, setToken],
        userAPI: UserAPI(token),

    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}