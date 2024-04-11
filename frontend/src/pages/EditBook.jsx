import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: '', author: '', publishYear: '' });

  useEffect(() => {
    axios.get(`http://localhost:5555/books/${id}`)
      .then(response => {
        setBook(response.data); 
      })
      .catch(error => console.error("There was an error fetching the book data: ", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5555/books/${id}`, book)
      .then(() => {
        navigate('/'); 
      })
      .catch(error => console.error("There was an error updating the book: ", error));
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">Edit Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={book.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            value={book.author}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="publishYear" className="block text-sm font-medium text-gray-700">Publish Year</label>
          <input
            type="text"
            name="publishYear"
            id="publishYear"
            value={book.publishYear}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBook;
