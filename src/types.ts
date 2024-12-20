export type ProductItem = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  inStock: boolean;
  inCart: boolean
}

export type User = {
  fullName: string;
  email: string;
}
