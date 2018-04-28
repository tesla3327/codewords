import React, { Component } from 'react';

const EmptyCard = () => <div className="card empty" />;

const Card = ({ card, handleEditClick, handleCardClick }) => (
  <div
    className={`card ${card.type} ${!card.revealed && 'hidden'}`}
    onClick={() => handleCardClick(card.id)}
  >
    <span>{card.word}</span>
    <button className="edit" onClick={() => handleEditClick(card.id)}>
      Edit
    </button>
  </div>
);

const Board = ({ cards, toggleCardRevealed }) => (
  <div className="board-view">
    {cards.map(
      card =>
        card.word === '' ? (
          <EmptyCard key={card.id} handleCardClick={() => {}} />
        ) : (
          <Card
            card={card}
            key={card.id}
            handleCardClick={toggleCardRevealed}
            handleEditClick={() => {}}
          />
        )
    )}
  </div>
);

export default Board;
