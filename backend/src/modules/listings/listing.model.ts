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
  location: string;
  country: string;
  city: string;
  rating: number;
  ratingCounts: number;
}

const ListingSchema = new Schema<IListing>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    filters: [{ type: String }],
    images: [{ type: String }],
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    pricePerSession: { type: Number, required: true },
    lengthOfSession: { type: Number, required: true },
    location: { type: String },
    country: { type: String },
    city: { type: String },
    rating: { type: Number, default: 0 },
    ratingCounts: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Listing = mongoose.model<IListing>('Listing', ListingSchema);
