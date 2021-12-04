import { NextFunction, Request, Response } from 'express';
import { asyncWrapper } from '../utils/async-wrapper.js';
import { createCustomError } from '../utils/custom-error.js';
import { BookModel, Book } from '../models/book.model.js';

export const getAllBooks = asyncWrapper(
  async (request: Request, response: Response) => {
    const books = await Book.find({});

    response.status(200).json(books);
  }
);

export const getBook = asyncWrapper(
  async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const book = await Book.findById(id);

    if (!book) {
      return next(createCustomError(`No book with id: ${id}`, 404));
    }

    response.status(200).json(book);
  }
);

export const addBook = asyncWrapper(
  async (request: Request, response: Response) => {
    const { title, author, pages, description }: BookModel = request.body;
    const book = await Book.create({ title, author, pages, description });

    response.status(201).json(book);
  }
);

export const updateBook = asyncWrapper(
  async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const { title, author, pages, description }: BookModel = request.body;

    const book = await Book.findByIdAndUpdate(
      id,
      { title, author, pages, description },
      { returnOriginal: false }
    );

    if (!book) {
      return next(createCustomError(`No book with id: ${id}`, 404));
    }

    response.status(200).json(book);
  }
);

export const deleteBook = asyncWrapper(
  async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return next(createCustomError(`No book with id: ${id}`, 404));
    }

    response.status(200).send('Book was deleted');
  }
);
