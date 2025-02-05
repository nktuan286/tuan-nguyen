# Book Management Application

A simple book management system built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- MongoDB (v4.4 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://nktuan1:x7HKpAOETI8fpI2f@cluster0.hdgr5.mongodb.net/
   ```

## Running the Application

1. Development Mode
   ```bash
   npm run dev
   ```

2. Production Mode
   ```bash
   npm start
   ```

The application will be available at `http://localhost:5000`

## API Endpoints

### Books
- `GET /api/books` - Get all books
- `GET /api/books?title=Sample&author=john` - Filter books with title, author, publishedYear, minPrice and maxPrice
- `GET /api/books/:id` - Get a specific book
- `POST /api/books` - Create a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

### Request Body Example (Create/Update Book)

 ```bash
    {
      "title": "Sample Book",
      "author": "John Doe",
      "description": "Desc"
      "isbn": "978-3-16-148410-0",
      "publishedYear": 2023,
      "price": 123
    }
```
