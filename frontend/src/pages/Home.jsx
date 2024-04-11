import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5555/books/");
        setBooks(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="p-4">
      <div className="flex justify-end items-center mb-4">
        <Link to="/books/create" className="bg-sky-800 text-white p-2 rounded-md shadow-lg hover:bg-sky-700 transition duration-300">
          <MdOutlineAddBox className="text-4xl" />
        </Link>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="py-3 px-6">No</th>
            <th className="py-3 px-6">Title</th>
            <th className="py-3 px-6">Author</th>
            <th className="py-3 px-6">Publish Year</th>
            <th className="py-3 px-6">Operations</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="py-4 px-6">{index + 1}</td>
              <td className="py-4 px-6">{book.title}</td>
              <td className="py-4 px-6">{book.author}</td>
              <td className="py-4 px-6">{book.publishYear}</td>
              <td className="py-4 px-6">
                <div className="flex justify-center gap-x-4">
                  <Link to={`/books/details/${book._id}`}>
                    <BsInfoCircle className="text-2xl text-green-800 hover:text-green-600" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-yellow-400" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete className="text-2xl text-red-600 hover:text-red-400" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
