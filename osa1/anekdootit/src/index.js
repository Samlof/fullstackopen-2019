import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length + 1).join('0').split('').map(parseFloat))

    const addVote = () => {
        const copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
    }

    let index = 0
    votes.forEach((v, i) => {
        if (v > votes[index]) index = i;
    })
    return (
        <div>
            <h2>Anecdote of the day</h2>
            <p>{props.anecdotes[selected]}</p>
            <p>has {votes[selected]} votes</p>
            <button onClick={addVote}>vote</button>
            <button onClick={() => setSelected(getRand())}>next anecdote</button>

            <h2>Anecdote with most votes</h2>
            <p>{props.anecdotes[index]}</p>
            <p>has {votes[index]} votes</p>
        </div >
    )
}

function getRand() {
    return Math.floor(Math.random() * anecdotes.length);
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)