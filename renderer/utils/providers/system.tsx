import React, { createContext, useContext, useEffect, useState } from 'react'
import { Systeminformation } from 'systeminformation'

const SystemContext = createContext({
    system: {} as Systeminformation.DynamicData,
    update: (system) => null,
})

export const SystemContextProvider = ({ children }) => {
    const [system, setSystem] = useState<Systeminformation.DynamicData>(
        {} as Systeminformation.DynamicData
    )

    useEffect(() => {
        console.log('useEffect')
        window?.electronAPI.system((_, value) => {
            // console.log(value)
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
