import { z } from 'zod';
import { Types } from 'mongoose';

const availabilitySchema = z.object({
  day: z.string(),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  endTime: z.string().regex(/^\d{2}:\d{2}$/),
});

export const ListingCreateRequestSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(10).max(500),
  category: z.string(),
  subcategory: z.string(),
  filters: z.array(z.string()).optional(),
  images: z.array(z.string().url()).optional(),
  pricePerSession: z.number().min(0),
  lengthOfSession: z.number().min(0),
  availability: z.array(availabilitySchema),
  // location: z.string(), TODO: Implement this
  rating: z.number().optional(),
  ratingCounts: z.number().optional(),
});

export const ListingCreateResponseSchema = ListingCreateRequestSchema.extend({
  id: z.instanceof(Types.ObjectId),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ListingResponseDto = z.infer<typeof ListingCreateResponseSchema>;

export const ListingUpdateRequestSchema = ListingCreateRequestSchema.partial();

export type ListingCreateRequestDto = z.infer<
  typeof ListingCreateRequestSchema
>;
export type ListingUpdateRequestDto = z.infer<
  typeof ListingUpdateRequestSchema
>;
