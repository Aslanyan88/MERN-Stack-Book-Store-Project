import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner'; 

const ShowBook = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5555/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Failed to fetch book", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!book) {
    return <div className="p-4 max-w-xl mx-auto mt-10 text-center text-xl font-medium">Book not found</div>;
  }

  return (
    <div className="p-4 max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4">{book.title}</h1>
      <p className="text-lg mb-2"><strong>Author:</strong> {book.author}</p>
      <p className="text-lg"><strong>Publish Year:</strong> {new Date(book.publishYear).getFullYear()}</p>
    </div>
  );
};

export default ShowBook;
