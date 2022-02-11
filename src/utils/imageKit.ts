export const IMAGEKIT_URL = `https://ik.imagekit.io/2ts5tqew8qy`

export enum IMAGEKIT_FOLDERS {
    CENTRAL_CATALOGUE_IMAGE = 'CENTRAL_CATALOGUE_IMAGE'
}

export const getImageURL = (path: string, folder: IMAGEKIT_FOLDERS) => `${IMAGEKIT_URL}/${folder}/${path}?tr=w-100,h-100,dpr-2,q-60,pr-true,bg-373464`

export const getProductImageURL = (path: string, folder: IMAGEKIT_FOLDERS) => `${IMAGEKIT_URL}/${folder}/${path}?tr=w-500,h-500,dpr-2,q-90,pr-true,bg-373464`