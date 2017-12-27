import React from 'react';
import './Table.css'

const Table = ({ data, columnHeader1, columnHeader2,
                 columnHeader3, columnHeader4, rowTitle1, rowTitle2,
                 rowTitle3, rowTitle4}) =>
  <div className="table">
    <div className="table-row">
        <span style={{ width: '25%', textAlign: 'center' }}>
          <b>{columnHeader1}</b>
        </span>
        <span style={{ width: '15%', textAlign: 'center' }}>
          <b>{columnHeader2}</b>
        </span>
        <span style={{ width: '20%', textAlign: 'center' }}>
          <b>{columnHeader3}</b>
        </span>
        <span style={{ width: '40%', textAlign: 'center' }}>
          <b>{columnHeader4}</b>
        </span>
      </div>
      { data.map((person, index) =>
        <div key={index} className="table-row">
          <span style={{ width: '25%', textAlign: 'center' }}>
            <a className="table__name" href={person.link}>{person.column1}</a>
          </span>
          <span style={{ width: '15%', textAlign: 'center' }}>
            {person.column2}
          </span>
          <span style={{ width: '20%', textAlign: 'center' }}>
            {person.column3}
          </span>
          <span style={{ width: '40%', textAlign: 'center' }}>
            {person.column4}
          </span>
        </div>
      )}
  </div>


  export default Table;
