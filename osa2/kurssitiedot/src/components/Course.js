import React from 'react'

const Header = props => {
    return (
        <h1>{props.course}</h1>
    )
}
const Content = props => {
    return (
        <div>
            {props.parts.map(p => (
                <Part key={p.name} name={p.name} exercises={p.exercises} />
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
    const total = props.parts.reduce((s, p) => s + p.exercises, 0)
    return (
        <p>yhteensä {total} tehtävää</p>
    )
}

const Course = props => {
    const { course } = props
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course