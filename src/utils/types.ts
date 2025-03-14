export type CATEGORY = {
    name: string,
    slug: string,
    image?: string
}

export type VENDOR = {
    _id: string,
    name: string,
    slug: string,
    category: string,
    image: string,
    coverImage: string,
    rating: number,
    products: number,
    services: number,
}

export type PRODUCT = {
    _id: string,
    name: string,
    slug: string,
    rating: number,
    reviews: number,
    vendor: VENDOR,
    price: number,
    discountPrice: number,
    image: string
}

export type SERVICE = {
    _id: string,
    name: string
    slug: string,
    rating: number,
    reviews: number,
    vendor: VENDOR,
    price: number,
    discountPrice: number,
    priceFrequency: string,
    location: string,
    image: string
}