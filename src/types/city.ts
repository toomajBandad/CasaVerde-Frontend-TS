export interface City {
  _id: string;
  province: string;
  name: string;
  location: [number, number]; // [longitude, latitude]
}
