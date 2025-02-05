import { Request, Response } from 'express';
import Book from '../models/Book';
import { BookFilters } from '../types/book.types';

export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: 'Error creating book', error });
  }
};

export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const filters: BookFilters = {};
    
    if (req.query.title) {
      filters.title = new RegExp(req.query.title as string, 'i');
    }
    if (req.query.author) {
      filters.author = new RegExp(req.query.author as string, 'i');
    }
    if (req.query.minPrice || req.query.maxPrice) {
      filters.price = {};
      if (req.query.minPrice) {
        filters.price.$gte = Number(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        filters.price.$lte = Number(req.query.maxPrice);
      }
    }
    if (req.query.publishedYear) {
      filters.publishedYear = Number(req.query.publishedYear);
    }

    const books = await Book.find(filters);
    res.json(books);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching books', error });
  }
};

export const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching book', error });
  }
};

export const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: 'Error updating book', error });
  }
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting book', error });
  }
};
