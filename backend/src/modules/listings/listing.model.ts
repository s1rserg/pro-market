import mongoose, { Schema, Document } from 'mongoose';

export interface IListing extends Document {
  name: string;
  description: string;
  category: string;
  subcategory: string;
  filters?: string[];
  images?: string[];
  creator: mongoose.Types.ObjectId;
  pricePerSession: number;
  lengthOfSession: number;
  availability: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  location: string;
  rating: number;
  ratingCounts: number;
}

const ListingSchema = new Schema<IListing>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  filters: [{ type: String }],
  images: [{ type: String }],
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  pricePerSession: { type: Number, required: true },
  lengthOfSession: { type: Number, required: true },
  availability: [
    {
      day: { type: String, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
  ],
  location: { type: String, required: true },
  rating: { type: Number, default: 0 },
  ratingCounts: { type: Number, default: 0 },
});

export const Listing = mongoose.model<IListing>('Listing', ListingSchema);
