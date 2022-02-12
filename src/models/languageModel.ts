
import type { IntlConfig } from 'react-intl'

export const languages = ['en', 'ml'] as const
export type Language = typeof languages[number];
export type IntlMessages = { [key in Language]: IntlConfig['messages'] };

export const userInterfaceLanguages: Language[] = ['en', 'ml']
export const defaultUserInterfaceLanguage: Language = 'en'