import { z } from 'zod';
import { Types } from 'mongoose';

const availabilitySchema = z.object({
  day: z.string(),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  endTime: z.string().regex(/^\d{2}:\d{2}$/),
});

export const createListingRequestSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(10).max(500),
  category: z.string(),
  subcategory: z.string(),
  filters: z.array(z.string()).optional(),
  images: z.array(z.string().url()).optional(),
  creator: z.instanceof(Types.ObjectId),
  pricePerSession: z.number().min(0),
  lengthOfSession: z.number().min(0),
  availability: z.array(availabilitySchema),
  location: z.string(),
  rating: z.number().optional(),
  ratingCounts: z.number().optional(),
});

export const createListingResponseSchema = createListingRequestSchema.extend({
  _id: z.instanceof(Types.ObjectId),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ListingResponseDto = z.infer<typeof createListingResponseSchema>;

export const updateListingRequestSchema = createListingRequestSchema.partial();

export type createListingRequestDto = z.infer<
  typeof createListingRequestSchema
>;
export type updateListingRequestDto = z.infer<
  typeof updateListingRequestSchema
>;
