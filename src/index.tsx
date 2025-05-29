import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home.page';
import BookForm from './pages/BookForm.page';
import { Book } from './interfaces/book.interface';
import BookList from './pages/book.list.page';
import Login from './pages/login-page';
import App from './App';
import { useState } from 'react';


const Index = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const handleAddBook = (book: Book) => {
    setBooks(prevBooks => [...prevBooks, book]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/books/create"
          element={<BookForm onAddBook={handleAddBook} />}
        />
        <Route path="/books/list" element={<BookList/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);

reportWebVitals();
