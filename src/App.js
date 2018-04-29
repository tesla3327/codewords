import React, { Component } from 'react';
import Board from './Board';
// import { database } from './firebase.js';

// const textValue = database.ref('/text');

const defaultWords = [
  'Date',
  'France',
  'Net',
  'Diamond',
  'Pass',
  'Knight',
  'Cross',
  'Tie',
  'Court',
  'Cotton',
  'Point',
  'Card',
  'Duck',
  'Star',
  'Slip',
  'Fighter',
  'Bridge',
  'Band',
  'Hood',
  'Olive',
  'Shop',
  'Match',
  'Ball',
  'Bow',
  'Mercury'
];

class App extends Component {
  constructor() {
    super();

    // textValue.on('value', newVal => this.setState({ text: newVal.val() }));
  }

  render() {
    return (
      <div className="App">
        <Board words={defaultWords} />
      </div>
    );
  }
}

export default App;
