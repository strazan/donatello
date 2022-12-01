import React, { createContext, useContext, useEffect, useState } from 'react'

const SettingsContext = createContext({
    settings: {},
    update: (settings: any) => null,
})

export const SettingsContextProvider = ({ children }) => {
    const [settings, setSettigns] = useState([])

    window?.electronAPI.init()

    useEffect(() => {
        window?.electronAPI.settings((_, value) => {
            setSettigns(value)
        })
    }, [])

    return (
        <SettingsContext.Provider value={{ settings, update: setSettigns }}>
            {children}
        </SettingsContext.Provider>
    )
}

export const useSettings = () => {
    const { settings, update } = useContext(SettingsContext)
    return { settings, update }
}
