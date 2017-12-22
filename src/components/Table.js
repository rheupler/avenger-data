import React from 'react';
import './Table.css'

function isSearched(searchTerm) {
  return (person => {
    if (person.name) {
      return !searchTerm || person.name.toLowerCase().includes(searchTerm.toLowerCase())
    }
  })
}

const Table = ({ data, pattern }) =>
  <div className="table">
      <div className="table-row">
        <span style={{ width: '25%', textAlign: 'left' }}>
          <b>Name</b>
        </span>
        <span style={{ width: '15%', textAlign: 'left' }}>
          <b>Gender</b>
        </span>
        <span style={{ width: '15%', textAlign: 'left' }}>
          <b>Year</b>
        </span>
        <span style={{ width: '45%', textAlign: 'left' }}>
          <b>Notes</b>
        </span>
      </div>
      { data.filter(isSearched(pattern))
            .filter(person => person.Gender)
            .sort((a, b) => a.Year < b.Year ? -1 : 1)
            .map((person, index) =>
        <div key={index} className="table-row">
          <span style={{ width: '25%', textAlign: 'left' }}>
            <a className="table__name" href={person.URL}>{person.name}</a>
          </span>
          <span style={{ width: '15%', textAlign: 'left' }}>
            {person.Gender}
          </span>
          <span style={{ width: '15%', textAlign: 'left' }}>
            {person.Year}
          </span>
          <span style={{ width: '45%', textAlign: 'left' }}>
            {person.Notes}
          </span>
        </div>
      )}
  </div>

  export default Table;
