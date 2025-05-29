import React, { useState } from 'react';
import { Book } from '../interfaces/book.interface';
import useForm from '../hooks/useForm';
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { app } from '../firebase/firebase';

const db = getFirestore(app);

interface BookFormProps {
  onAddBook: (book: Book) => void;
}


const LASTFM_API_KEY = 'naovomandaakeyprogithub';//nao deixei a key original pls entenda

const BookForm = ({ onAddBook }: BookFormProps) => {
  const [artist, setArtist] = useState('');
  const [error, setError] = useState('');
  const { validate } = useForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { errors, hasErrors } = validate({ artist });
    if (hasErrors) {
      setError(errors.artist);
      return;
    }

    try {
      const lastfmUrl = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artist)}&api_key=${LASTFM_API_KEY}&format=json`;

      console.log("Fetching from URL:", lastfmUrl);

      const response = await fetch(lastfmUrl);

      console.log("Raw Response object:", response);

      
      if (!response.ok) {
        const errorText = await response.text(); 
        console.error("HTTP Error:", response.status, response.statusText, errorText);
        setError(`Failed to fetch artist data: ${response.status} ${response.statusText}`);
        return;
      }

      const data = await response.json();
      console.log("Parsed JSON Data:", data); 

      
      if (data.error) { 
        console.error("Last.fm API Error:", data.error, data.message);
        setError(data.message || 'Artist not found from Last.fm (API error).');
        return;
      }

      if (!data.artist) { 
        console.error("No artist data found in response:", data);
        setError('Artist not found from Last.fm.');
        return;
      }

      const artistInfo = data.artist;

      const bio = artistInfo.bio?.summary?.replace(/<a href="[^"]*">Read more on Last.fm<\/a>/, '').trim() || 'No biography available.';
      
      const images = artistInfo.image;
      const imageUrl = images?.find((img: any) => img.size === 'extralarge' || img.size === 'large' || img.size === 'medium')?.['#text'] || '';

      if (!bio && !imageUrl) {
        setError('No biography or image found for this artist.');
        return;
      }

      const newBook: Book = {
        id: Date.now(),
        artist: artistInfo.name || artist,
        bio: bio,
        image: imageUrl,
      };

      await setDoc(doc(db, "books", newBook.id.toString()), newBook);
      
      onAddBook(newBook);
      setArtist('');
    } catch (err) {
    
      setError('An error occurred while fetching artist data or saving to Firebase.');
      console.error("General Fetch or Firebase error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome do artista"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        required
      />
      <button type="submit">Add Artist</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default BookForm;