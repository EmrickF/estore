export interface WooImage {
  id: number
  src: string
  alt: string
}

export interface Product {
  id: number
  name: string
  price: string
  description: string
  images: WooImage[]
}
