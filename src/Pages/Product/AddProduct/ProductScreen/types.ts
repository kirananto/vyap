import { Length, Min } from 'class-validator'


export enum TABS {
    'VARIANTS' = 'VARIANTS',
    'OTHERS' = 'OTHERS'
}

export enum PAGE_ACTION {
    'EDIT' = 'EDIT',
    'ADD' = 'ADD'
}

export class PostMRP {
    @Min(1)
        mrpPrice!: number
}

export class PostSale {
    @Min(1)
        salePrice!: number
}

export class PostHSN {
    @Min(1)
        hsnNum!: number
}

export class PostGST {
    @Min(1)
        gst!: number
}




export class PostDescription {
    @Length(0, 80)
        description!: string
}

export class PostCategory {
    @Length(1, 30)
        category!: string
}

export class PostTag {
    @Length(1, 30)
        tag!: string
}

export class PostBrand {
    @Length(1, 30)
        brand!: string
}