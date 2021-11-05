import { Request, Response } from 'express';
import { BookModel, Book } from '../models/book.model.js';

function sendResponse(
  error: any,
  result: any,
  response: Response,
  errorCode: 404 | 400,
  successCode: 200 | 201
) {
  if (error) {
    response.status(errorCode).send(error.message);
  } else {
    response.status(successCode).send(result);
  }
}

export function getAllBooks(request: Request, response: Response) {
  Book.find((error: any, books: any) => {
    sendResponse(error, books, response, 404, 200);
  });
}

export function getBook(request: Request, response: Response) {
  const id = request.params.id;

  Book.findById(id, (error: any, book: any) => {
    sendResponse(error, book, response, 404, 200);
  });
}

export function addBook(request: Request, response: Response) {
  const book: BookModel = request.body;

  Book.create(book, (error: any, book: any) => {
    sendResponse(error, book, response, 400, 201);
  });
}

export function updateBook(request: Request, response: Response) {
  const id = request.params.id;
  const updateDetails = request.body;

  Book.findByIdAndUpdate(
    id,
    updateDetails,
    { returnOriginal: false },
    (error: any, book: any) => {
      sendResponse(error, book, response, 404, 200);
    }
  );
}

export function deleteBook(request: Request, response: Response) {
  const id = request.params.id;

  Book.findByIdAndDelete(id, (error: any) => {
    sendResponse(error, 'The book successfully deleted', response, 404, 200);
  });
}
