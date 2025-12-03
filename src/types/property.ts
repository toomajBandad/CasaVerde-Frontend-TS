export interface Property {
  _id: string;
  title: string;
  desc: string;
  location: string;
  price: number;
  duration: string;
  bedrooms: number;
  bathrooms: number;
  pets: boolean;
  couples: boolean;
  minors: boolean;
  owner: string; // ObjectId as string
  contractCategory: string; // ObjectId as string
  typeCategory: string; // ObjectId as string
  image?: string;
  city: string;
  latlng?: number[];
  area: number;
  createdAt?: string; // ISO date string
  updatedAt?: string;
}
