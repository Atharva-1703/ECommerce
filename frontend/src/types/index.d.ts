
interface Dimensions{
  length: number;
  width: number;
  height: number;
}


export interface Product {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  price: number;
  tags?: string[];
  discountPercentage: number;
  stock: number;
  brand?: string;
  thumbnail: string;
  images?: string[];
  weight?: number;   
  rating: number;
  reviewCount?: number;          
  dimensions?: Dimensions;
  bigDescription?:string     
  reviews?:string[] | ProductReview[];
  createdAt?: string;          
  updatedAt?: string; 
}

// ? there is a question mark next to user due to sample data reviews which doesnt have any user associated with it
export interface ProductReview {
  _id: string;
  rating: number;
  comment: string;
  name: string;
  product: Partial<Product>;
  user?: string;
  createdAt:string;
}

interface address{
  _id?:string
  street:string;
  city:string;
  state:string;
  country:string;
  postalCode:string
  phone:string
  name?:string
}

export interface User{
  id:string;
  username:string;
  email:string;
  isAdmin:boolean;
  address:address[];
  cart:Product[];
  createdAt?:string;
}

export interface Cart{
  _id:string;
  product:Product;
  quantity:number
}

interface orderItem{
  _id:string;
  product:Partial<Product>;
  quantity:number;
  name:string;
  price:number;
  totalItemCost:number
}

export interface Order{
  _id:string;
  shippingAddress:address;
  status:"pending"| "processing"| "delivered"| "cancelled";
  items:orderItem[];
  paymentMethod:"cod"|"upi"|"card";
  totalCost:number;
  deliveryDate:string
  deliveredAt?:string
  isPaid:boolean
  createdAt:string;
  updatedAt?:string;
}