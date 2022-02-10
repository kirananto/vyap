import React from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { selecti18nConfig, setLanguage } from 'src/i18nSlice'
import { SimpleHeader } from '../../Components/Header'
import ToggleButton from '../../Components/ToggleButton'
import { selectCredentials, setDarkMode } from '../Login/credentialsSlice'


export default function Settings() {

    const { user } = useSelector(selectCredentials)
    const language = useSelector(selecti18nConfig).language
    const dispatch = useDispatch()
    const intl = useIntl()

    function changeDarkMode() {
        const newVal = !user?.settings?.isDarkMode
        dispatch(setDarkMode(newVal))
        // Whenever the user explicitly chooses light mode
        localStorage.theme = newVal ? 'dark' : 'light'

        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    return (
        <div className="dark:bg-gray-900">
            <SimpleHeader heading={intl.formatMessage({ id: 'global.settings'})} />
            <div className="pt-20 pl-8 bg-white dark:bg-gray-900 h-screen">
                {/* ------ */}
                <div className="flex gap-3 mb-2">
                    <h1 className="font-bold text-gray-700 text-md dark:text-gray-300">Team members</h1>
                    <div className="flex items-center justify-center px-4 text-xs font-bold text-center rounded-lg min-w-min bg-green-200 text-green-700 dark:bg-green-900 dark:text-green-400">
            Coming soon
                    </div>
                </div>
                {/* -------- */}
                <NavLink to="/employees" className="text-blue-500 underline ">10 Members</NavLink>
                {/* ------- */}
                <div className="flex gap-3 mt-8 mb-3">
                    <h1 className="font-semibold text-gray-500 text-md dark:text-gray-300">Dark Mode</h1>
                </div>
                <ToggleButton value={user?.settings?.isDarkMode} onChange={changeDarkMode} />
                <div className="flex gap-3 mt-8 mb-3">
                    <h1 className="font-semibold text-gray-500 text-md dark:text-gray-300">Set language to malayalam</h1>
                </div>
                <ToggleButton value={language === 'ml'} onChange={() => {
                    dispatch(setLanguage(language === 'ml' ? 'en' : 'ml'))
                }} />
                {/* --------- */}
                <div className="flex gap-3 mb-2 mt-9">
                    <h1 className="font-semibold text-gray-500 text-md dark:text-gray-300">Import Customer CSV</h1>
                    <div className="flex items-center justify-center px-4 text-xs font-bold text-center rounded-lg min-w-min bg-green-200 text-green-700 dark:bg-green-900 dark:text-green-400">
            Coming soon
                    </div>
                </div>
                <button className="w-2/4 h-8 mt-3 font-bold text-blue-500 border-2 border-blue-500 rounded-md text-md">Upload CSV</button>
            </div>
        </div>
    )
}