import React, { Component } from 'react';
import './App.css';
import Table from './components/Table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import 'react-virtualized/styles.css';

const data = require('./data/data.json');

/**
 * Reduces data to new object array for sum of
 * males and females per year.
 */
const gendersByYear = data.reduce((acc, person) => {
    const {Year, Gender} = person;
    const i = acc.findIndex( v => v.Year === Year);
    const obj = (i !== -1) ? acc[i] : {Year, MALE: 0, FEMALE: 0, max: 20};
    obj[Gender]++;
    (i !== -1) ? acc[i] = obj : acc.push(obj);
    return acc;
},[]);

/**
 * Adds death total property for chart
 */
data.map(person => {
  let counter = 0;
  for(let i = 1; i <= 5; i++) {
    let propName = 'Death' + i;
    if(person[propName] === "YES") {
      counter += 1;
    }
  }
  return person.deathTotal = counter;
})

const deathsByName = data.map(obj => ({ name : obj.name, deaths: obj.deathTotal}))
                         .filter(person => person.deaths)
                         .sort((a, b) => a.deaths > b.deaths ? -1 : 1)

/**
 * Data for Table component.
 */
const tableData1 = data.map(obj => ({column1: obj.name,
                                     column2: obj.Gender,
                                     column3: obj.Year,
                                     column4: obj.Notes,
                                     link: obj.URL}))
const tableData2 = data.map(obj => ({column1: obj.name,
                                     column2: obj.Year,
                                     column3: obj.deathTotal,
                                     link: obj.URL,
                                     column4: obj["Current?"]}))

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data
    }
  }

  render() {
    return (
      <div className="App">
        <BarChart className="chart1" width={1000} height={500} data={gendersByYear}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
         <XAxis dataKey="Year"/>
         <YAxis dataKey="max"/>
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip />
         <Legend />
         <Bar dataKey="FEMALE" fill="green" />
         <Bar dataKey="MALE" fill="purple" />
        </BarChart>
        <Table
          data={tableData1}
          columnHeader1="Name"
          columnHeader2="Gender"
          columnHeader3="Year"
          columnHeader4="Notes"
          rowTitle1="name"
        />
       <BarChart className="chart2" width={1400} height={500} data={deathsByName}
           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="name"/>
        <YAxis dataKey="deaths"/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip />
        <Legend />
        <Bar dataKey="deaths" fill="green" />
       </BarChart>
       <Table
         data={tableData2}
         columnHeader1="Name"
         columnHeader2="Year"
         columnHeader3="Death Count"
         columnHeader4="Current?"
       />
      </div>
    );
  }
}

export default App;
