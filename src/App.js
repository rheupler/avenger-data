import React, { Component } from 'react';
import './App.css';
import { Column, Table } from 'react-virtualized';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import 'react-virtualized/styles.css';

const data = require('./data/data.json');

const gendersByYear = data.reduce((acc, person) => {
    const {Year, Gender} = person;
    const i = acc.findIndex( v => v.Year === Year);
    const obj = (i !== -1) ? acc[i] : {Year, MALE: 0, FEMALE: 0, max: 20};
    obj[Gender]++;
    (i !== -1) ? acc[i] = obj : acc.push(obj);
    return acc;
},[]);

const byDeathSort = data.map(person => {
  let counter = 0;
  if(person.Death1 === "YES") {
    counter += 1;
  }
  if(person.Death2 === "YES") {
    counter += 1;
  }
  if(person.Death3 === "YES") {
    counter += 1;
  }
  if(person.Death4 === "YES") {
    counter += 1;
  }
  if(person.Death5 === "YES") {
    counter += 1;
  }
  person.deathTotal = counter
})

// const deathsByName = data.reduce((acc, person) => {
//     var {name, deathTotal} = person;
//     var i = acc.findIndex( v => v.name === name);
//     var obj = (i !== -1) ? acc[i] : {deathTotal: 0, name};
//     obj[deathTotal]++;
//     (i !== -1) ? acc[i] = obj : acc.push(obj);
//     return acc;
// },[]);

// const deathsByName = _.chain(data)
//  .groupBy("Year")
//  .map((yearPeople, year) => {
//   return _.reduce(yearPeople, (result, p) => {
//     result[p.deathTotal]++
//     return result
//   }, {year,deathTotal:0})
// }).value()

let deathsByName = [];

for(let i = 0; i < data.length; i++){
  let total = { name: data[i].name, deaths: data[i].deathTotal};
  deathsByName.push(total);
}
deathsByName = deathsByName.filter(person => person.name)
                           .sort((a, b) => a.deaths > b.deaths ? -1 : 1)

console.log(deathsByName)
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
        <BarChart width={1000} height={500} data={gendersByYear}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
         <XAxis dataKey="Year"/>
         <YAxis dataKey="max"/>
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip />
         <Legend />
         <Bar dataKey="FEMALE" fill="#82ca9d" />
        </BarChart>
        <Table
         width={1000}
         height={1000}
         headerHeight={20}
         rowHeight={30}
         rowCount={this.state.data.length}
         rowGetter={({ index }) => this.state.data[index]}
        >
         <Column
           label='Name'
           dataKey='name'
           width={200}
         />
         <Column
           width={200}
           label='Gender'
           dataKey='Gender'
         />
         <Column
           width={100}
           label='Year'
           dataKey='Year'
         />
         <Column
           width={500}
           label='Notes'
           dataKey='Notes'
         />
       </Table>
       <BarChart width={1400} height={500} data={deathsByName}
           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="name"/>
        <YAxis dataKey="deaths"/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip />
        <Legend />
        <Bar dataKey="deaths" fill="#82ca9d" />
       </BarChart>
      </div>
    );
  }
}

export default App;
