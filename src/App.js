import React, { Component } from 'react';
import Board from './Board';
// import { database } from './firebase.js';

// const textValue = database.ref('/text');

const createCard = (word = '', type = 'neutral', revealed = false) => ({
  word,
  type,
  revealed
});

const createWithWords = words =>
  Array(25)
    .fill(null)
    .map((el, index) => ({
      id: index,
      ...createCard(words[index])
    }));

const toggleCard = (board, id) =>
  board.map(card => {
    if (card.id === id) {
      return {
        ...card,
        revealed: !card.revealed
      };
    } else {
      return card;
    }
  });

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: 'Hello friend',
      board: createWithWords(['hello', 'there', 'friend'])
    };

    // textValue.on('value', newVal => this.setState({ text: newVal.val() }));
  }

  reduce({ type, payload }) {
    const { state } = this;
    let newState = state;

    switch (type) {
      case 'toggleCard':
        newState = {
          ...state,
          board: toggleCard(state.board, payload)
        };
        break;

      default:
        break;
    }

    this.setState(newState);
  }

  render() {
    return (
      <div className="App">
        <Board
          cards={this.state.board}
          toggleCardRevealed={id =>
            this.reduce({ type: 'toggleCard', payload: id })
          }
        />
      </div>
    );
  }
}

export default App;
