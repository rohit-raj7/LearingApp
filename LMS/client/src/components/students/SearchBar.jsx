 

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets'; // Ensure correct path

function SearchBar({ data }) {
  const [searchTerm, setSearchTerm] = useState(data || '');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();  //  Use for stop refraceing the webside
    if (searchTerm.trim() !== '') {
      navigate(`/courses-list/${searchTerm.trim()}`);
    } else {
      navigate('/courses-list');
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded"
    >
      <img
        src={assets.search_icon}
        alt="search_icon"
        className="md:w-auto w-10 px-3"
      />

      <input
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        type="text"
        placeholder="Search for courses"
        className="w-full h-full outline-none text-gray-500/80"
      />

      <button
        type="submit"
        className="bg-blue-600 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1 cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
