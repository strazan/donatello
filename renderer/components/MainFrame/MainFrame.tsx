type MainFrameProps = {
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactNode
}

export default function MainFrame({ children }: MainFrameProps) {
    return (
        <div className="grow bg-surface">
            <div className="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
                <main className="flex-1 px-4 md:px-0 h-full">{children}</main>
            </div>
        </div>
    )
}
