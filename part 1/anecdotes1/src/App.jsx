import { useState, useEffect } from 'react'

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const Anecdote = (props) => {
  return (
    <div>
      {props.anecdotes[props.selected]}
      <br />
      has {props.votes[props.selected]} votes
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]


  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [maxPos, setMaxPos] = useState(0);

  var max = anecdotes.length - 1


  const onNextAnecdote = () => {
    var updateSelected = getRandomIntInclusive(0, max)
    setSelected(updateSelected)

  }

  const onVote = () => {
    setVotes(prevVotes => {
      const copy = [...prevVotes];
      copy[selected] += 1;
      maxValue(copy);  // Pass the updated votes array to maxValue
      return copy;
    })}

    const maxValue = (updatedVotes) => {
      if (updatedVotes && updatedVotes.length > 0) {
        const maxPos = updatedVotes.indexOf(Math.max(...updatedVotes));
        setMaxPos(maxPos);
      }
    }

  useEffect(() => {
    maxValue();
  }, []);


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} selected={selected} votes={votes} />
      <Button handleClick={onVote} text="vote" />
      <Button handleClick={onNextAnecdote} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdotes={anecdotes} selected={maxPos} votes={votes} />
    </div>
  )
}

export default App