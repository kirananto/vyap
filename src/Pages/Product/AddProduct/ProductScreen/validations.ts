import { validateSync, ValidationError } from 'class-validator'
import type { variantInterface } from '../redux/addProductSlice'
import { PostBrand, PostCategory, PostDescription, PostGST, PostHSN, PostMRP, PostSale, PostTag } from './types'

export function isValidMRP(value?: number) {
    const postMrp = new PostMRP()
    postMrp.mrpPrice = Number(value)

    const errors = validateSync(postMrp)
    if (errors.length > 0) {
        console.log('[VALIDATION]: Error in mrpPrice', errors)
    }
    return !(errors.length > 0)
}

export function isValidVariants(value: variantInterface[]) {
    let errors: ValidationError[] = []
    for (const val of value) {
        console.log('val', val)
        const postMrp = new PostMRP()
        postMrp.mrpPrice = Number(val.mrpPrice)
        errors = [...errors, ...validateSync(postMrp)]
        const postSale = new PostSale()
        postSale.salePrice = Number(val.salesPrice)
        errors = [...errors, ...validateSync(postSale)]
        const desc = new PostDescription()
        desc.description = val.name
        errors = [...errors, ...validateSync(desc)]
    }

    if (errors.length > 0) {
        console.log('[VALIDATION]: Error in variants', errors)
    }
    return !(errors.length > 0)
}

export function isValidSalePrice(value?: number) {
    const postSale = new PostSale()
    postSale.salePrice = Number(value)

    const errors = validateSync(postSale)
    if (errors.length > 0) {
        console.log('[VALIDATION]: Error in salePrice')
    }
    return !(errors.length > 0)
}

export function isValidHSN(taxEnabled: boolean, hasCatalogueId?: boolean, value?: number) {
    if (!taxEnabled) {
        return true
    }
    if (hasCatalogueId) {
        return true
    }

    const postHSN = new PostHSN()
    postHSN.hsnNum = Number(value)

    const errors = validateSync(postHSN)
    if (errors.length > 0) {
        console.log('[VALIDATION]: Error in hsnNum')
    }
    return !(errors.length > 0)
}
export function isValidGST(taxEnabled: boolean, hasCatalogueId?: boolean, value?: number) {
    if (!taxEnabled) {
        return true
    }
    if (hasCatalogueId) {
        return true
    }


    const postGST = new PostGST()
    postGST.gst = Number(value)

    const errors = validateSync(postGST)
    if (errors.length > 0) {
        console.log('[VALIDATION]: Error in gst')
    }
    return !(errors.length > 0)
}

export function isValidDescription(value?: string) {
    const postDesc = new PostDescription()
    postDesc.description = value ?? ''

    const errors = validateSync(postDesc)
    if (errors.length > 0) {
        console.log('[VALIDATION]: Error in description')
    }
    console.log('')
    return !(errors.length > 0)
}

export function isValidCategory(hasCatalogueId: boolean, value?: string) {
    if (hasCatalogueId) {
        return true
    }
    const postCat = new PostCategory()
    postCat.category = value ?? ''

    const errors = validateSync(postCat)
    if (errors.length > 0) {
        console.log('[VALIDATION]: Error in category')
    }
    return !(errors.length > 0)
}

export function isValidTag(hasCatalogueId: boolean, value?: string) {
    //if (hasCatalogueId) { return true }
    const postTag = new PostTag()
    postTag.tag = value ?? ''

    const errors = validateSync(postTag)
    if (errors.length > 0) {
        console.log('[VALIDATION]: Error in tag')
    }
    return !(errors.length > 0)
}

export function isValidBrand(hasCatalogueId: boolean, value?: string) {
    if (hasCatalogueId) {
        return true
    }
    const postBrand = new PostBrand()
    postBrand.brand = value ?? ''

    const errors = validateSync(postBrand)
    if (errors.length > 0) {
        console.log('[VALIDATION]: Error in brand')
    }
    return !(errors.length > 0)
}