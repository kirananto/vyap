
   
import { defaultUserInterfaceLanguage, Language } from '../models/languageModel'

export const matchLanguage = (language: string, availableLanguages: Language[]): Language => {
    const match = availableLanguages.find((l) => l === language.slice(0, 2))
    return match ?? defaultUserInterfaceLanguage
}