import React, { useEffect, useState } from 'react';
import { Book } from '../interfaces/book.interface';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '../firebase/firebase';

const db = getFirestore(app);

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'books'));
        const booksData: Book[] = [];
        querySnapshot.forEach(doc => {
          booksData.push(doc.data() as Book);
        });
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p>Loading artists...</p>;

  return (
    <div>
      <h2>Artist List</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <strong>{book.artist}</strong><br />
            <img src={book.image} alt={book.artist} width={100} /><br />
            <p>{book.bio}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
