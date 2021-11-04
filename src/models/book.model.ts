import mongoose from 'mongoose';

const { Schema, model } = mongoose;

export interface BookModel {
  title: string;
  author: string;
  pages: number;
  description: string;
}

const bookSchema = new Schema<BookModel>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pages: { type: Number, required: true },
  description: { type: String, required: true },
});

export const Book = model('Book', bookSchema);
