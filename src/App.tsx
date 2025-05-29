import React, { useState } from 'react';
import BookForm from './pages/BookForm.page';
import BookList from './pages/book.list.page';
import { Book } from './interfaces/book.interface';

const App = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const handleAddBook = (book: Book) => {
    setBooks(prevBooks => [...prevBooks, book]);
  };
}
export default App;