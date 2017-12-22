import React from 'react';
import './Search.css'

const Search = ({ value, onChange, children }) =>
  <form>
    <input
      type="text"
      placeholder="Search by name..."
      value={value}
      onChange={onChange}
    />
  </form>

  export default Search;
