import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishYear: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5555/books/', formData);
      navigate('/');
    } catch (error) {
      console.error("Failed to create book", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 shadow-lg rounded-lg bg-white mt-10">
      <h1 className="text-2xl font-bold mb-5 text-center">Add a New Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div>
          <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div>
          <label htmlFor="publishYear" className="block mb-2 text-sm font-medium text-gray-900">Publish Year</label>
          <input
            type="text"
            id="publishYear"
            name="publishYear"
            value={formData.publishYear}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
      </form>
    </div>
  );
};

export default CreateBook;
