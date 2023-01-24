import {
    ArrowDownOnSquareIcon,
    Battery100Icon,
    BoltIcon,
} from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function SideBar() {
    const { pathname } = useRouter()

    const navigation = [
        {
            name: 'Overview',
            href: '/',
            icon: BoltIcon,
        },
        {
            name: 'Download Manager',
            href: '/download-manager',
            icon: ArrowDownOnSquareIcon,
        },
        {
            name: 'Battery',
            href: '/battery ',
            icon: Battery100Icon,
        },
        {
            name: 'Space',
            href: '/space',
            icon: ArrowDownOnSquareIcon,
        },
    ]

    return (
        <div className="flex w-52 flex-col bg-uiSurface">
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
                                        ? 'bg-primaryContainer text-onPrimaryContainer'
                                        : 'text-primaryText hover:bg-containerHover',
                                    'group rounded-md py-2 px-2 flex items-center text-xs font-regular'
                                )}
                            >
                                <item.icon
                                    className={classNames(
                                        'mr-3 flex-shrink-0 h-4 w-4'
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
