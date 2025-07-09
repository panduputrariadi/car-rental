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
  // images: {
  //   carId: string
  //   imagePath: string
  // }[]
  images: [{
    carId: string
    imagePath: string
  }]
}

export type Categories = {
  id: string
  name: string
  slug: string
  descpription: string
}