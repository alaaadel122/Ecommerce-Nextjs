export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  _id: string;
  id: string;                // sometimes same as _id
  title: string;
  imageCover: string;
  quantity: number;
  ratingsAverage: number;
  brand: Brand;
  category: Category;
  subcategory: SubCategory[];
}

export interface CartProduct {
  _id: string;               // id for this cart item
  product: Product;          // full product object
  count: number;             // quantity of this product in cart
  price: number;             // price of this cart item
}

export interface CartData {
  _id: string;
  cartOwner: string;         // user id
  products: CartProduct[];
  totalCartPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  numOfCartItems: number;
}

export interface CartResponse {
  status: string;            // e.g. "success"
  cartId: string;
  data: CartData;
}
