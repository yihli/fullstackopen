import { useState } from 'react'

// Section that displays the anecdote as well as its vote count
const Anecdote = (props) => (
  <div>
    <h1>{props.header}</h1>
    <p>{props.anecdote}</p>
    <p>has {props.votes} votes</p>
  </div>
)

// Webpage that displays anecdotes and allows users to vote on their favorite.
// The highest voted anecdote is displayed.
const App = () => {

  // array of anecdotes
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

  // Use States 
  // -------------------------------------
  const [selected, setSelected] = useState(0)
  const [numVotes, setNumVotes] = useState(Array(anecdotes.length).fill(0))

  // Event Handlers
  // --------------------------------------
  const handleVote = () => {
    const copy = [...numVotes]
    copy[selected]++
    setNumVotes(copy)
  }

  // Relevant Functions
  // ---------------------------------------
    const getMaxValueIndex = () =>{
    let index = 0;
    for (let i = 0; i < numVotes.length; i++) {
      if (numVotes[i] > numVotes[index]) {
        index = i
      }
    }
    return index
  }

  return (
    <div>
      <Anecdote header="Anecdote of the day" anecdote={anecdotes[selected]} votes={numVotes[selected]} />
      <button onClick={handleVote}>vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} >next anecdote</button>
      <Anecdote header="Anecdote with most votes" anecdote={anecdotes[getMaxValueIndex()]} votes={numVotes[getMaxValueIndex()]} />
    </div>
  )
}

export default App


