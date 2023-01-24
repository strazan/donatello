import { CircleStackIcon } from '@heroicons/react/24/outline'
import {
    Battery100Icon,
    BoltIcon,
    BoltSlashIcon,
} from '@heroicons/react/24/solid'
import classNames from 'classnames'
import Layout from 'components/Layout'
import React from 'react'
import { useSystem } from 'utils/providers/system'

const getBatteryColor = (percent: number) => {
    if (percent > 85) return 'text-primary'
    return 'text-primaryText'
}

const minsToString = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const min = minutes % 60
    if (hours && !min) {
        return `${hours}h left`
    }
    if (hours) {
        return `${hours}h and ${min} minutes left`
    }
    return `${min} minutes left`
}

export default function Battery() {
    const { system } = useSystem()
    const { battery } = system
    console.log(battery)
    return (
        <Layout>
            {battery && (
                <>
                    <p className="text-secondaryText text-xs mt-8">
                        {battery.manufacturer} {battery.type}
                    </p>
                    <div className="flex my-4 gap-2 items-center bg-containerActive p-2 rounded-md">
                        <Battery100Icon
                            className={classNames(
                                'h-6 w-6',
                                getBatteryColor(battery.percent)
                            )}
                        />
                        {battery.isCharging ? (
                            <BoltIcon className="h-4 w-4 text-primaryText" />
                        ) : (
                            <BoltSlashIcon className="h-4 w-4 text-secondaryText" />
                        )}
                        <p className="text-primaryText">{battery.percent}%</p>
                        <p className="text-secondaryText font-light text-sm ml-2">
                            {minsToString(battery.timeRemaining)}
                        </p>
                        <p className="text-secondaryText px-2 py-0.5 rounded bg-uiSurface font-light text-sm ml-2">
                            {battery.voltage + 'W'}
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2 mt-8 items-center">
                            <CircleStackIcon className="h-4 w-4 text-secondaryText" />
                            <p className="text-sm text-secondaryText">
                                Cycle count:
                            </p>
                            <p className="text-sm text-primaryText">
                                {battery.cycleCount}
                            </p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <CircleStackIcon className="h-4 w-4 text-secondaryText" />
                            <p className="text-sm text-secondaryText">
                                Designed Capacity
                            </p>
                            <p className="text-sm text-primaryText">
                                {(battery.designedCapacity / 1000).toFixed(2) +
                                    ' kmWh'}
                            </p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <CircleStackIcon className="h-4 w-4 text-secondaryText" />
                            <p className="text-sm text-secondaryText">
                                Max Capacity
                            </p>
                            <p className="text-sm text-primaryText">
                                {(battery.maxCapacity / 1000).toFixed(2) +
                                    ' kmWh'}
                            </p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <CircleStackIcon className="h-4 w-4 text-secondaryText" />
                            <p className="text-sm text-secondaryText">
                                Current Capacity
                            </p>
                            <p className="text-sm text-primaryText">
                                {(battery.currentCapacity / 1000).toFixed(2) +
                                    ' kmWh'}
                            </p>
                        </div>
                    </div>
                </>
            )}
        </Layout>
    )
}
