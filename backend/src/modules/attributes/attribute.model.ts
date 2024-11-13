import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  key: string;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  key: { type: String, required: true },
});

export const Category = mongoose.model<ICategory>('Category', CategorySchema);

export interface ISubcategory extends Document {
  name: string;
  key: string;
}

const SubcategorySchema = new Schema<ISubcategory>({
  name: { type: String, required: true },
  key: { type: String, required: true },
});

export const Subcategory = mongoose.model<ISubcategory>(
  'Subcategory',
  SubcategorySchema
);

export interface IFilter extends Document {
  name: string;
  key: string;
}

const FilterSchema = new Schema<IFilter>({
  name: { type: String, required: true },
  key: { type: String, required: true },
});

export const Filter = mongoose.model<IFilter>('Filter', FilterSchema);
