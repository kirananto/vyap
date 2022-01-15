import { validateSync } from "class-validator";
import { PostBrand, PostCategory, PostDescription, PostGST, PostHSN, PostMRP, PostSale, PostTag } from "./types";

export function isValidMRP(value?: number) {
    let postMrp = new PostMRP();
    postMrp.mrpPrice = Number(value);

    const errors = validateSync(postMrp)
    if (errors.length > 0) {
        console.log('[VALIDATION]: Error in mrpPrice')
    }
    return !(errors.length > 0)
}

export function isValidSalePrice(value?: number) {
    let postSale = new PostSale();
    postSale.salePrice = Number(value);

    const errors = validateSync(postSale)
    if (errors.length > 0) {
        console.log('[VALIDATION]: Error in salePrice')
    }
    return !(errors.length > 0)
}

export function isValidHSN(taxEnabled: boolean, hasCatalogueId?: boolean, value?: number) {
    if (!taxEnabled) { return true }
    if (hasCatalogueId) { return true }

    let postHSN = new PostHSN();
    postHSN.hsnNum = Number(value);

    const errors = validateSync(postHSN)
    if (errors.length > 0) {
        console.log('[VALIDATION]: Error in hsnNum')
    }
    return !(errors.length > 0)
}
export function isValidGST(taxEnabled: boolean, hasCatalogueId?: boolean, value?: number) {
    if (!taxEnabled) { return true }
    if (hasCatalogueId) { return true }


    let postGST = new PostGST();
    postGST.gst = Number(value);

    const errors = validateSync(postGST)
    if (errors.length > 0) {
        console.log('[VALIDATION]: Error in gst')
    }
    return !(errors.length > 0)
}

export function isValidDescription(value: string) {
    let postDesc = new PostDescription();
    postDesc.description = value;

    const errors = validateSync(postDesc)
    if (errors.length > 0) {
        console.log('[VALIDATION]: Error in description')
    }
    console.log('')
    return !(errors.length > 0)
}

export function isValidCategory(hasCatalogueId: boolean, value: string) {
    if (hasCatalogueId) { return true }
    let postCat = new PostCategory();
    postCat.category = value;

    const errors = validateSync(postCat)
    if (errors.length > 0) {
        console.log('[VALIDATION]: Error in category')
    }
    return !(errors.length > 0)
}

export function isValidTag(hasCatalogueId: boolean, value: string) {
    //if (hasCatalogueId) { return true }
    let postTag = new PostTag();
    postTag.tag = value;

    const errors = validateSync(postTag)
    if (errors.length > 0) {
        console.log('[VALIDATION]: Error in tag')
    }
    return !(errors.length > 0)
}

export function isValidBrand(hasCatalogueId: boolean, value: string) {
    if (hasCatalogueId) { return true }
    let postBrand = new PostBrand();
    postBrand.brand = value;

    const errors = validateSync(postBrand)
    if (errors.length > 0) {
        console.log('[VALIDATION]: Error in brand')
    }
    return !(errors.length > 0)
}


