import React, { useEffect, useState } from 'react'
import { AppProps } from 'next/app'

import 'styles/index.css'
import 'tailwindcss/tailwind.css'
import { SettingsContextProvider } from 'utils/providers/settings'
import { ThemeContextProvider } from 'utils/providers/theme'
import { SystemContextProvider } from 'utils/providers/system'

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
            <SystemContextProvider>
                <ThemeContextProvider>
                    <Component {...pageProps} />
                </ThemeContextProvider>
            </SystemContextProvider>
        </SettingsContextProvider>
    )
}

export default App
