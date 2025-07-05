export interface Profile {
  id: string;
  principal?: string;
  name?: string;
  username: string;
  email: string;
  bio?: string;
  website?: string;
  location?: string;
  avatar?: string;
  joinDate?: string; // Optional, if join date is not available
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  isVerified?: boolean; // Optional, if verification is supported
  isAdmin?: boolean; // Optional, if admin role is supported
  darkMode?: boolean; // Optional, user preference for dark mode
}
