import React, { useEffect, useState } from 'react'
import { AppProps } from 'next/app'

import 'styles/index.css'
import 'tailwindcss/tailwind.css'
import { SettingsContextProvider } from 'utils/settings'
import { ThemeContextProvider } from 'utils/theme'

function App({ Component, pageProps }: AppProps) {
    const [theme, setTheme] = useState('')

    useEffect(() => {
        if (typeof window === 'undefined') {
            setTheme('light')
        } else if (
            window &&
            window?.matchMedia('(prefers-color-scheme: dark)').matches &&
            'dark'
        ) {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }, [])

    if (!theme) return <p>LOading</p>

    return (
        <SettingsContextProvider>
            <ThemeContextProvider>
                <Component {...pageProps} />
            </ThemeContextProvider>
        </SettingsContextProvider>
    )
}

export default App
