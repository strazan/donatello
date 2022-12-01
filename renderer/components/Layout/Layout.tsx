import MainFrame from 'components/MainFrame'
import SideBar from 'components/SideBar'
import React, { useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
    const [sideOpen, setSidebarOpen] = useState(false)
    return (
        <div className="flex min-h-screen relative h-full">
            <SideBar open={sideOpen} setOpen={setSidebarOpen} />
            <MainFrame setSidebarOpen={setSidebarOpen}>{children}</MainFrame>
        </div>
    )
}
