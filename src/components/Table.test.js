import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';

it('renders without crashing', () => {
  debugger;
  const json = require('../data/data.json');
  const data = json.map(obj => ({column1: obj.name,
                                 column2: obj.Gender,
                                 column3: obj.Year,
                                 column4: obj.Notes,
                                 link: obj.URL}))
  const div = document.createElement('div');
  ReactDOM.render(<Table data={data}/>, div);
});
