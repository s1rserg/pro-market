import { z } from 'zod';

export const ListingCreateRequestSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters long' })
      .max(50, { message: 'Name must be at most 50 characters long' }),
    description: z
      .string()
      .min(10, { message: 'Description must be at least 10 characters long' })
      .max(500, { message: 'Description must be at most 500 characters long' }),
    category: z.string().min(1, { message: 'Category is required' }),
    subcategory: z.string().min(1, { message: 'Subcategory is required' }),
    filters: z.array(z.string()).optional(),
    images: z.array(z.union([z.instanceof(File), z.string().url()])).optional(),
    pricePerSession: z.union([z.string(), z.number()]).refine(
      (value) => {
        const num = typeof value === 'string' ? parseFloat(value) : value;
        return !isNaN(num) && num >= 0;
      },
      { message: 'Price per session must be a positive number' }
    ),
    lengthOfSession: z.union([z.string(), z.number()]).refine(
      (value) => {
        const num = typeof value === 'string' ? parseFloat(value) : value;
        return !isNaN(num) && num >= 0;
      },
      { message: 'Length of session must be a positive number' }
    ),
    location: z.string().min(1, { message: 'Location is required' }),
    country: z.string().optional(),
    city: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.location === 'On-site') {
        return !!data.country && !!data.city;
      }
      return true;
    },
    {
      message:
        'When location is on-site, both country and city must be provided',
      path: ['location'],
    }
  );

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

export const ListingUpdateRequestSchema = ListingCreateRequestSchema;
