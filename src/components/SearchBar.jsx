import React, { useState } from 'react';
import search from '../assests/search.svg';

const SearchBar = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    handleSearch('');
  };

  return (
    <div className="flex items-center bg-white rounded-xl px-2.5">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleChange}
        className="py-1 px-4 outline-0"
      />
      {searchQuery && (
        <button className="clear-button" onClick={clearSearch}>
          &#x2715; {/* X symbol */}
        </button>
      )}
      <img src={search} alt="search" className="" />
    </div>
  );
};

export default SearchBar;
