export interface Artist {
  id: number
  slug: string
  name: string
}

export interface Category {
  id: number
  slug: string
  name: string
  designsCount: number
  images: Images
}

export interface Site {
  id: number
  slug: string
  name: string
}

export interface Price {
  amount: number
  currency: string
  approximate: boolean
}

export interface Images {
  loader: string
  small: string
  small_vignette: string
  large: string
  large_vignette: string
  backgroundColor: string
  primaryColor: string
}

export interface Product {
  id: number
  slug: string
  buyURL: string
  active: boolean
  deal: boolean
  lastChance: boolean
  site: Site
  prices: {[key: string]: Price}
  images: Images
}

export interface Order {
  index: number
  price: number
}

export interface Design {
  id: number
  slug: string
  name: string
  url: string
  artist: Artist
  products: Product[]
  categories: Category[],
  order: Order
}