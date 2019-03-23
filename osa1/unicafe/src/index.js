import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = props => {
    const { text, handler } = props
    return (
        <button onClick={handler}>{text}</button>
    )
}
const GiveFeedback = props => {
    const { setGood, setNeutral, setBad } = props
    return (
        < div >
            <h2>anna palautetta</h2>
            <Button handler={setGood} text="hyvä" />
            <Button handler={setNeutral} text="neutraali" />
            <Button handler={setBad} text="huono" />
        </div >
    )
}

const Statistic = props => {
    const { text, value } = props

    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}
const Statistics = props => {
    const { good, neutral, bad } = props
    const total = good + neutral + bad
    if (total === 0) {
        return (
            <div>
                <h2>statistiikka</h2>
                <p>Ei yhtään palautetta annettu</p>
            </div>
        )
    }
    return (
        <div>
            <h2>statistiikka</h2>
            <table>
                <tbody>
                    <Statistic text="hyvä" value={good} />
                    <Statistic text="neutraali" value={neutral} />
                    <Statistic text="huono" value={bad} />
                    <Statistic text="yhteensä" value={total} />
                    <Statistic text="keskiarvo" value={(good - bad) / total} />
                    <Statistic text="positiivisia" value={(good / total) * 100 + " %"} />
                </tbody>
            </table>
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