import mongoose, { Schema, Document } from 'mongoose';
import { IBook } from '../types/book.types';

export interface IBookDocument extends IBook, Document {}

const BookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    isbn: { type: String, required: true, unique: true },
    publishedYear: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IBookDocument>('Book', BookSchema);
