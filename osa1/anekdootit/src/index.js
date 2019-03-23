import React from 'react'
import ReactDOM from 'react-dom'

const Header = props => {
    return (
        <h1>{props.course}</h1>
    )
}
const Content = props => {
    return (
        <div>
            {props.parts.map(p => (
                <Part name={p.name} exercises={p.exercises} />
            ))}
        </div>
    )
}
const Part = props => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    )
}
const Total = props => {
    let total = 0;
    props.parts.forEach(e => {
        total += e.exercises;
    });
    return (
        <p>yhteensä {total} tehtävää</p>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
            {
                name: 'Reactin perusteet',
                exercises: 10
            },
            {
                name: 'Tiedonvälitys propseilla',
                exercises: 7
            },
            {
                name: 'Komponenttien tila',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))