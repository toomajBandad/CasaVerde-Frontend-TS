import type { Message } from "./message";
import type { Property } from "./property";

export type Role = "user" | "owner" | "admin";

export type Search = {
  query: string;
  date: string; // serialized as ISO string from backend
  filters?: Record<string, unknown>;
};

export type Profile = {
  image?: string;
  bio?: string;
  phone?: string;
};

export type User = {
  id: string; // unique identifier (string instead of ObjectId)
  username: string;
  email: string;
  role: Role;
  listings?: Property[]; // owner property IDs
  favorites?: Property[]; // favorite saved property IDs
  recentSearches?: Search[];
  messages?: Message[]; // message IDs
  profile?: Profile;
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
};
