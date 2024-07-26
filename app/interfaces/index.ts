export interface UserType {
  _id: string;
  name: string;
  email: string;
  userId: string;
  profile: string;
  isActive: boolean;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HotelType {
  _id: string;
  name: string;
  owner: string;
  email: string;
  number: string;
  address: string;
  media: string[];
  createdAt: string;
  updatedAt: string;
}
