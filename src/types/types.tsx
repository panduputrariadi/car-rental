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
  description: string
}

export type Vehicle = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category_id: string;
  status: 
    | 'AVAILABLE' 
    | 'UNAVAILABLE' 
    | 'RENTED' 
    | 'DAMAGED' 
    | 'UNDER_MAINTENANCE';
  transmission: 'MANUAL' | 'AUTOMATIC';
  plate_number: string;
  fuel_type: string;
  color: string;
  rate_per_day: number;
  rate_per_hour: number;
  capacity: number;
  mileage: number;
  model: string;
  brand: string;
  type: string;
  year: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  
  //relation
  category?: Categories;
  images?: VehicleImage[];
};

export type VehicleImage = {
  id: string;
  carId: string;
  imagePath: string;
  created_at?: string;
  updated_at?: string;
};