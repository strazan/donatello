import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useTheme } from 'utils/theme'

export default function Menubar() {
    const { theme, update } = useTheme()
    return (
        <div className="py-1.5 [-webkit-app-region:drag] w-full flex bg-uiSurface border-b border-outline1">
            <div className="ml-auto text-containerFill mr-4 cursor-pointer p-1 rounded-md hover:bg-containerHover">
                {theme === 'dark' ? (
                    <MoonIcon
                        className="h-4 w-4"
                        onClick={() => update('light')}
                    />
                ) : (
                    <SunIcon
                        className="h-4 w-4"
                        onClick={() => update('dark')}
                    />
                )}
            </div>
        </div>
    )
}
