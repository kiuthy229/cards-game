import logo from './logo.svg';
import './App.css';
import { matchRoutes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';

const cardImages= [
  {"src" : "/img/SuitOfClubs/suitOfClubs1.png", matched: false},
  {"src" : "/img/SuitOfClubs/suitOfClubs12.png", matched: false},
  {"src" : "/img/SuitOfDiamonds/suitOfDiamonds1.png", matched: false},
  {"src" : "/img/SuitOfDiamonds/suitOfDiamonds2.png", matched: false},
  {"src" : "/img/SuitOfDiamonds/suitOfDiamonds13.png", matched: false},
  {"src" : "/img/SuitOfHearts/suitOfHearts3.png", matched: false},
  {"src" : "/img/SuitOfHearts/suitOfHearts12.png", matched: false},
  {"src" : "/img/SuitOfSpades/suitOfSpades4.png", matched: false},
  {"src" : "/img/SuitOfSpades/suitOfSpades11.png", matched: false}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    //console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {

    if (choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src && choiceOne.id != choiceTwo.id){
        //console.log('those cards match')
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src){
              return{...card, matched: true}
            }
            else
            {
              return card
            }
          })
        })
        resetTurn()
      }
      else
      {
        //console.log('those cards do not match')
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  //console.log(cards)

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  useEffect(() => {
    shuffleCards()
  }, [])

  //console.log(cards, turns)

  return (
    <div className="App">
      <h1>j nguyen dem</h1>
      <button onClick={shuffleCards}>Let's Start</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard key={card.id} card={card} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched} disabled={disabled}/>
        ))}
      </div>
      <div>
        <p>
          Turns: {turns}
        </p>
      </div>
    </div>
  );
}
// Asset from: https://platinum-7645.itch.io/pixel-art-cards
export default App;
