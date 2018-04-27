import React, { Component } from 'react';
import FirebaseApp from 'firebase/app';
import 'firebase/database';
import './App.css';

const firebaseConfig = {
  apiKey: 'AIzaSyDk_cdPFQ84EVKnYNZvTjoGSUaiyxrpjX8',
  authDomain: 'codewords-4ec79.firebaseapp.com',
  databaseURL: 'https://codewords-4ec79.firebaseio.com',
  projectId: 'codewords-4ec79',
  storageBucket: 'codewords-4ec79.appspot.com',
  messagingSenderId: '380474510016'
};
FirebaseApp.initializeApp(firebaseConfig);

const database = FirebaseApp.database();
const textValue = database.ref('/text');

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: 'Hello friend'
    };

    textValue.on('value', newVal => this.setState({ text: newVal.val() }));
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.text}</h1>
      </div>
    );
  }
}

export default App;
