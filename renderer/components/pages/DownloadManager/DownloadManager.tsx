import { PlusIcon } from '@heroicons/react/24/outline'
import FileCategory from 'components/FileCategoty'
import Layout from 'components/Layout'
import Toggle from 'components/Toggle'
import { useEffect, useState } from 'react'
import { useSettings } from 'utils/settings'
// const store = new Store();

type Props = {
    data: string[]
}

// const load = () => {
//     const jsonDirectory = path.join(path.parse(process.cwd()).root, 'Users/siggelabor/Downloads');
//     const dir = path.resolve(jsonDirectory);
//     const filenames = fs.readdirSync(dir);
//     console.log(filenames)
// }

export default function DownloadManager() {
    const [sorting, setSorting] = useState(false)
    const { settings } = useSettings()

    return (
        <Layout>
            <div className="flex items-center space-x-5 mt-8">
                <p className="text-secondaryText">Sort Downlaods</p>
                <Toggle value={sorting} onChange={setSorting} />
            </div>
            <div className="mt-6 space-y-2">
                {settings.map((category) => (
                    <FileCategory key={category.name} {...category} />
                ))}
                <button
                    type="button"
                    className="relative space-x-2 flex items-center w-full rounded-lg border-2 
          border-dashed border-outline1 p-4 justify-center text-center hover:border-outline3
           focus:outline-none focus:ring-2 focus:ring-primaryContainer focus:ring-offset-2"
                >
                    <PlusIcon className="w-4 h-4 text-outline3" />
                    <p className="block text-sm text-outline3">
                        Custom sort rule
                    </p>
                </button>
            </div>
        </Layout>
    )
}
