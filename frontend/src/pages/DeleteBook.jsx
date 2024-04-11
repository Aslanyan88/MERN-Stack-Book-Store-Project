import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookTitle, setBookTitle] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5555/books/${id}`)
      .then(response => {
        setBookTitle(response.data.title);
      })
      .catch(error => console.error("There was an error fetching the book data: ", error));
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        navigate('/');
      })
      .catch(error => console.error("There was an error deleting the book: ", error));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-lg font-semibold text-gray-800 mb-4">Delete Book</h1>
      <p className="mb-6">Are you sure you want to delete the book "<span className="font-semibold">{bookTitle}</span>"?</p>
      <div className="flex justify-between">
        <button 
          onClick={handleDelete} 
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
          Yes, Delete it
        </button>
        <button 
          onClick={() => navigate('/')} 
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
          No, Go back
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
