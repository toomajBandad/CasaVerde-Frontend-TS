export interface Property {
  _id: string;
  title: string;
  desc: string;
  location: string;
  price: number;
  duration: number;
  bedrooms: number;
  bathrooms: number;
  pets: boolean;
  couples: boolean;
  minors: boolean;
  owner: string;
  contractCategory: string;
  typeCategory: string;
  image?: string;
  city: string;
  latlng: {
    type: "Point";
    coordinates: [number, number];
  };
  area: number;
  createdAt?: string;
  updatedAt?: string;
}
