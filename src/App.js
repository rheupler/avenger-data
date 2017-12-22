import React, { Component } from 'react';
import './App.css';
import Table from './components/Table';
import Search from './components/Search';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import _ from 'lodash';
const data = require('./data/data.json');

const byYearGender = _.chain(data)
 .groupBy("Year")
 .map((yearPeople, year) => {
  return _.reduce(yearPeople, (result, p) => {
    result[p.Gender]++
    return result
  }, {year,"MALE":0,"FEMALE":0,"Total":5})
}).value()

console.log(byYearGender)


// let d = data.reduce((obj, person) => {
//     const {Year, Gender} = person;
//     if (!obj[Year]) {
//         obj[Year] = {};
//     }
//
//     if (!obj[Year][Gender]) {
//         obj[Year][Gender] = 0;
//     }
//
//     obj[Year][Gender]++;
//     return obj;
// }, {})

const data2 = [
      {year: '1985', Male: 2, Female: 3, Total: 10},
      {year: '1986', Male: 2, Female: 3},
      {year: '1987', Male: 2, Female: 3},
      {year: '1988', Male: 2, Female: 4},
      {year: '1989', Male: 2, Female: 3},
      {year: '1990', Male: 1, Female: 3},
      {year: '1991', Male: 2, Female: 10},
];

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data,
      searchTerm: ''
    }
    this.onSearchChange = this.onSearchChange.bind(this)
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  render() {
    return (
      <div className="App">
        <BarChart width={1000} height={500} data={byYearGender}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
         <XAxis dataKey="year"/>
         <YAxis dataKey="Total"/>
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip />
         <Legend />
         <Bar dataKey="MALE" fill="#8884d8" />
         <Bar dataKey="FEMALE" fill="#82ca9d" />
      </BarChart>
        <Search
          value={this.state.searchTerm}
          onChange={this.onSearchChange}
        />
        <Table
          data={data}
          pattern={this.state.searchTerm}
        />
      </div>
    );
  }
}

export default App;
