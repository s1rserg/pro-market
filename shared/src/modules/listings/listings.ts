import { z } from 'zod';
import { Types } from 'mongoose';

export const ListingCreateRequestSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(10).max(500),
  category: z.string().min(1),
  subcategory: z.string().min(1),
  filters: z.array(z.string()).optional(),
  images: z.array(z.instanceof(File)).optional(),
  pricePerSession: z.string().min(0),
  lengthOfSession: z.string().min(0),
  location: z.string(),
  country: z.string().optional(),
  city: z.string().optional(),
});

export const ListingCreateResponseSchema = ListingCreateRequestSchema.extend({
  id: z.instanceof(Types.ObjectId),
  createdAt: z.date(),
  updatedAt: z.date(),
  rating: z.number(),
  ratingCounts: z.number(),
});

export type ListingResponseDto = {
  name: string;
  description: string;
  category: string;
  subcategory: string;
  pricePerSession: string;
  lengthOfSession: string;
  location: string;
  filters?: string[] | undefined;
  images?: File[] | undefined;
  country?: string | undefined;
  city?: string | undefined;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  ratingCounts: number;
};

export type ListingCreateRequestDto = {
  name: string;
  description: string;
  category: string;
  subcategory: string;
  pricePerSession: string;
  lengthOfSession: string;
  location: string;
  filters?: string[] | undefined;
  images?: File[] | undefined;
  country?: string | undefined;
  city?: string | undefined;
};

export type ListingUpdateRequestDto = {
  name?: string;
  description?: string;
  category?: string;
  subcategory?: string;
  pricePerSession?: string;
  lengthOfSession?: string;
  location?: string;
  filters?: string[] | undefined;
  images?: File[] | undefined;
  country?: string | undefined;
  city?: string | undefined;
};

export const ListingUpdateRequestSchema = ListingCreateRequestSchema.partial();
