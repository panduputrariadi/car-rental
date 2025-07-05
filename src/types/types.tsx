export type Payment = {
  id: string
  brand: string
  model: string
  year: number
  status: string
  price: number
  color: string
  type: string
  description: string
  plateNumber: string
  images: {
    carId: string
    imagePath: string
  }[]
}
