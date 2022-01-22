import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Workbox, messageSW } from 'workbox-window'
import { hapticFeedback } from './utils/vibrate'


export default function ServiceWorkerIntegration() {
    const intl = useIntl()
    const workbox = new Workbox(import.meta.env.SNOWPACK_PUBLIC_SERVICE_WORKER)
    const [updateNotificationOpen, setUpdateNotificationOpen] = React.useState(false)
    const [registration, setRegistration] = React.useState<ServiceWorkerRegistration>()

    const showSkipWaitingPrompt = () => {
        setUpdateNotificationOpen(true)
    }

    const updateApplication = (currentRegistration?: ServiceWorkerRegistration) => () => {
        // console.log('Updating application')
        hapticFeedback()
        // skip waiting until all service workers are closed to force update
        if (currentRegistration && currentRegistration.waiting) {
            messageSW(currentRegistration.waiting, { type: 'SKIP_WAITING' })
            setUpdateNotificationOpen(false)
            window.location.reload()
        }
    }

    // register service worker on first load if the browser supports it
    React.useEffect(() => {
        if ('serviceWorker' in navigator) {
            // Open update prompt because there is an update waiting
            workbox.addEventListener('waiting', showSkipWaitingPrompt)
            workbox.register().then((r) => {
                setRegistration(r)
            })
        }
    }, [])

    return updateNotificationOpen ? (
        <div
            className={`fixed top-1 flex flex-row items-center justify-between w-96 bg-gray-900 px-4 py-6 text-white shadow-2xl hover:shadow-none transform-gpu translate-y-0 hover:translate-y-1 rounded-xl transition-all duration-500 ease-in-out  self-center z-50`}
            style={{ left: `calc(50% - 12rem)` }}
        >
            <div className="text-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
            <div className="flex flex-col items-start justify-center ml-4 cursor-default">
                <h1 className="text-base text-gray-200 font-semibold leading-none tracking-wider">New version available !</h1>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed tracking-wider">
                    {intl.formatMessage({
                        id: 'action.updateApplication',
                        defaultMessage: 'An improved version of vyap is now available, refresh to update',
                        description: 'Requests the user to update the application'
                    })}
                </p>

                <button onClick={updateApplication(registration)} className="mt-2 text-sm border p-1 px-4 rounded-lg hover:bg-gray-800">
                    <FormattedMessage id="action.reload" defaultMessage="Tap to Refresh" description="Action to reload something" />
                </button>
            </div>
            <div className="absolute top-4 right-4 cursor-pointer text-lg" onClick={() => {
                hapticFeedback()
                setUpdateNotificationOpen(false)
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        </div>
    ) : null
}