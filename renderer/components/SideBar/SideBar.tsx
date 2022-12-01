import { ArrowDownOnSquareIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function SideBar() {
    const { pathname } = useRouter()

    const navigation = [
        {
            name: 'Download Manager',
            href: '/download-manager',
            icon: ArrowDownOnSquareIcon,
        },
    ]

    return (
        <div className="flex w-64 flex-col bg-uiSurface">
            <div className="flex flex-grow flex-col overflow-y-auto border-r border-outline1 ">
                <div className="flex flex-shrink-0 items-center px-4 pt-4">
                    <img
                        className="h-12 w-12"
                        src="/logo.png"
                        alt="Your Company"
                    />
                </div>
                <div className="mt-5 flex flex-grow flex-col">
                    <nav className="flex-1 space-y-1 px-2 pb-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                    item.href === pathname
                                        ? 'bg-containerActive text-primaryText'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                    'group rounded-md py-2 px-2 flex items-center text-sm font-regular'
                                )}
                            >
                                <item.icon
                                    className={classNames(
                                        item.href === pathname
                                            ? 'text-blue-500'
                                            : 'text-blue-400 group-hover:text-gray-500',
                                        'mr-3 flex-shrink-0 h-5 w-5'
                                    )}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}
