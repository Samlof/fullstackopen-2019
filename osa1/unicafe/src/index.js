import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const GiveFeedback = props => {
    const { setGood, setNeutral, setBad } = props
    return (
        < div >
            <h2>anna palautetta</h2>
            <button onClick={setGood}>hyvä</button>
            <button onClick={setNeutral}>neutraali</button>
            <button onClick={setBad}>huono</button>
        </div >
    )
}

const Statistics = props => {
    const { good, neutral, bad } = props
    return (
        <div>
            <h2>statistiikka</h2>
            <p>hyvä {good}</p>
            <p>neutraali {neutral}</p>
            <p>huono {bad}</p>
        </div>
    )
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <GiveFeedback setGood={() => setGood(good + 1)}
                setNeutral={() => setNeutral(neutral + 1)}
                setBad={() => setBad(bad + 1)} />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)