import React, { createContext, useContext, useEffect, useState } from 'react'
import { Systeminformation } from 'systeminformation'

const SystemContext = createContext({
    system: {} as Systeminformation.MemData,
    update: (system) => null,
})

export const SystemContextProvider = ({ children }) => {
    const [system, setSystem] = useState<Systeminformation.MemData>(
        {} as Systeminformation.MemData
    )

    useEffect(() => {
        console.log('useEffect')
        window?.electronAPI.system((_, value) => {
            setSystem(value)
        })
    }, [])

    return (
        <SystemContext.Provider value={{ system, update: setSystem }}>
            {children}
        </SystemContext.Provider>
    )
}

export const useSystem = () => {
    const { system, update } = useContext(SystemContext)
    return { system, update }
}
