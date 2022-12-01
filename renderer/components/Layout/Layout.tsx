import MainFrame from 'components/MainFrame'
import Menubar from 'components/Menubar'
import SideBar from 'components/SideBar'
import React, { useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
    const [sideOpen, setSidebarOpen] = useState(false)
    return (
        <div className="h-full min-h-screen flex flex-col">
            <Menubar />
            <div className="flex relative w-full grow">
                <SideBar open={sideOpen} setOpen={setSidebarOpen} />
                <MainFrame setSidebarOpen={setSidebarOpen}>
                    {children}
                </MainFrame>
            </div>
        </div>
    )
}
