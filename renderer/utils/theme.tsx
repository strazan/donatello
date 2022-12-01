import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({
    theme: 'dark',
    update: (theme: stirng) => null,
})

export const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark')

    return (
        <ThemeContext.Provider value={{ theme, update: setTheme }}>
            <div className={`theme-${theme}`}>{children}</div>
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const { theme, update } = useContext(ThemeContext)
    return { theme, update }
}
