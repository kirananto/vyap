import type { NavigateOptions } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import React from 'react'

export default function useQueryParam<T>(
    key: string
): [T | undefined, (newQuery: T, options?: NavigateOptions) => void] {
    const [searchParams, setSearchParams] = useSearchParams()
    const paramValue = searchParams.get(key)

    const value = React.useMemo(() => paramValue ? JSON.parse(paramValue) : null, [paramValue])

    const setValue = React.useCallback(
        (newValue: T, options?: NavigateOptions) => {
            const newSearchParams = new URLSearchParams(searchParams)
            newSearchParams.set(key, JSON.stringify(newValue))
            setSearchParams(newSearchParams, options)
        },
        [key, searchParams, setSearchParams]
    )

    return [value, setValue]
}