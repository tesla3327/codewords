import React, { Component } from 'react';

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

const getCardClasses = card =>
  `card ${card.type} ${!card.revealed && 'hidden'}`;

const EmptyCard = () => <div className="card empty" />;

const Card = ({ card, handleEditClick, handleCardClick }) => (
  <div
    className={getCardClasses(card)}
    onClick={() => handleCardClick(card.id)}
  >
    <span>{card.word}</span>
    <button
      className="edit"
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        handleEditClick(card.id);
      }}
    >
      Edit
    </button>
  </div>
);

class EditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: props.card
    };

    this.updateCard = this.updateCard.bind(this);
  }

  updateCard() {
    this.props.handleUpdateCard(this.state.card);
  }

  render() {
    return (
      <div className={`edit ${getCardClasses(this.props.card)}`}>
        <form
          onSubmit={e => {
            this.updateCard();
            e.preventDefault();
          }}
        >
          <input
            placeholder="Enter word"
            value={this.state.card.word}
            onChange={e => {
              this.setState({
                card: { ...this.state.card, word: e.target.value }
              });
            }}
          />
          <select
            value={this.state.card.type}
            onChange={e => {
              this.setState({
                card: { ...this.state.card, type: e.target.value }
              });
            }}
          >
            <option value="neutral">Neutral</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="assassin">Assassin</option>
          </select>
          <button className="save">Save</button>
        </form>
      </div>
    );
  }
}

class Board extends Component {
  constructor() {
    super();
    this.state = {
      board: [],
      editing: ''
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      board: createWithWords(props.words)
    };
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

      case 'editCard':
        newState = {
          ...state,
          editing: payload
        };
        break;

      case 'updateCard':
        newState = {
          ...state,
          editing: '',
          board: state.board.map(card => {
            if (card.id === payload.id) {
              return payload;
            } else {
              return card;
            }
          })
        };

      default:
        break;
    }

    this.setState(newState);
  }

  render() {
    return (
      <div className="board-view">
        {this.state.board.map(card => {
          if (this.state.editing === card.id) {
            return (
              <EditCard
                card={card}
                key={card.id}
                handleUpdateCard={card =>
                  this.reduce({
                    type: 'updateCard',
                    payload: card
                  })
                }
              />
            );
          } else if (card.word === '') {
            return (
              <EmptyCard
                key={card.id}
                handleCardClick={id =>
                  this.reduce({ type: 'editCard', payload: id })
                }
              />
            );
          } else {
            return (
              <Card
                card={card}
                key={card.id}
                handleCardClick={id =>
                  this.reduce({ type: 'toggleCard', payload: id })
                }
                handleEditClick={id =>
                  this.reduce({ type: 'editCard', payload: id })
                }
              />
            );
          }
        })}
      </div>
    );
  }
}

export default Board;
