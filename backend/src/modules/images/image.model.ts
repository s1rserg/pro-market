import { Schema, model, Document } from 'mongoose';

export interface IImage extends Document {
  url: string;
  key: string;
  uploadedAt: Date;
}

const imageSchema = new Schema<IImage>({
  url: { type: String, required: true },
  key: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

export const Image = model<IImage>('Image', imageSchema);
