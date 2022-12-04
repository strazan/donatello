import Layout from 'components/Layout'
import { useSystem } from 'utils/providers/system'

const bytesToSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return '0 Byte'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)) + '', 10)
    return `${Math.round(bytes / 1024 ** i)} ${sizes[i]}`
}

export default function Overview() {
    const { system } = useSystem()
    return (
        <Layout>
            {system.active && (
                <>
                    <div className="flex text-primaryText mt-4">
                        <p className="w-32">Active:</p>
                        <p>{bytesToSize(system.active)}</p>
                    </div>
                    <div className="flex text-primaryText mt-4">
                        <p className="w-32">Available:</p>
                        <p>{bytesToSize(system.available)}</p>
                    </div>
                    <div className="flex text-primaryText mt-4">
                        <p className="w-32">Buffcache:</p>
                        <p>{bytesToSize(system.buffcache)}</p>
                    </div>
                    <div className="flex text-primaryText mt-4">
                        <p className="w-32">Free:</p>
                        <p>{bytesToSize(system.free)}</p>
                    </div>
                    <div className="flex text-primaryText mt-4">
                        <p className="w-32">Swapfree:</p>
                        <p>{bytesToSize(system.swapfree)}</p>
                    </div>
                    <div className="flex text-primaryText mt-4">
                        <p className="w-32">Swaptotal:</p>
                        <p>{bytesToSize(system.swaptotal)}</p>
                    </div>
                    <div className="flex text-primaryText mt-4">
                        <p className="w-32">Swapused:</p>
                        <p>{bytesToSize(system.swapused)}</p>
                    </div>
                    <div className="flex text-primaryText mt-4">
                        <p className="w-32">Total:</p>
                        <p>{bytesToSize(system.total)}</p>
                    </div>
                    <div className="flex text-primaryText mt-4">
                        <p className="w-32">Used:</p>
                        <p>{bytesToSize(system.used)}</p>
                    </div>
                </>
            )}
        </Layout>
    )
}
