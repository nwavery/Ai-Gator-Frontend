import { Category } from './category.model'; // <-- Import Category

export interface Tool {
  id: string; // Corresponds to Firestore document ID
  name: string;
  description: string;
  websiteUrl: string; // Main URL from backend
  affiliateLink?: string; // Optional affiliate link from backend
  category: Category; // <-- Change type to Category object
  pricing: 'Free' | 'Freemium' | 'Paid' | 'Contact'; // Example pricing tiers
  tags?: string; // Keep original 'tags' from backend for now? Or ignore?
  tagsAsList?: string[]; // Use this from backend
  imageUrl?: string; // Optional image/logo URL
  upvotes?: number; // Optional upvote count
  dateAdded?: string; // <-- Changed type to string
} 