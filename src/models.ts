export interface Artist {
  id: number
  slug: string
  name: string
  designs: Array<Design>
}

export interface Category {
  id: number
  slug: string
  name: string
  images: Images
}

export interface Site {
  id: number
  slug: string
  name: string
  designs: Array<Design>
}

export interface Price {
  amount: number
  currency: string
  approximate: boolean
}

export interface Images {
  loader: string
  small: string
  large: string
  backgroundColor: string
  backgroundTextColor: string
  darkBackgroundColor: string
  darkBackgroundTextColor: string
}

export interface Product {
  id: number
  slug: string
  buyURL: string
  active: boolean
  deal: boolean
  lastChance: boolean
  site: Site
  prices: { [key: string]: Price }
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