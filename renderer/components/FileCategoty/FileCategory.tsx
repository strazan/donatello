import { PencilIcon } from '@heroicons/react/24/outline'

import Toggle from 'components/Toggle'
import { useCallback } from 'react'

type Props = {
    name: string
    active: boolean
    files: string[]
}

const FileCategory = ({ name, active, files }: Props) => {
    const onToggle = useCallback(
        (value) => {
            window?.electronAPI.toggleDownload(name, value)
        },
        [active]
    )

    return (
        <div className="py-2 px-4 flex items-center rounded-lg bg-surfaceVariant">
            <p className="text-sm w-20 text-primaryText font-medium">{name}</p>
            <p className="text-xs pl-4 text-outline3 font-medium text-ellipsis w-52 overflow-hidden whitespace-nowrap">
                {files.join(', ')}
            </p>
            <div className="ml-auto flex items-center space-x-4">
                <Toggle value={active} onChange={() => onToggle(!active)} />
                <button className="rounded-lg hover:bg-uiSurface p-2">
                    <PencilIcon className="h-4 w-4 text-containerFill" />
                </button>
            </div>
        </div>
    )
}

export default FileCategory
