import React from 'react'

const Content = props => {
    const { persons } = props

    return (
        <div>
            {persons.map(p => (
                <Part key={p.name} name={p.name} number={p.number} />
            ))}
        </div>
    )
}
const Part = props => {
    const { name, number } = props

    return (
        <div>
            {name} {number}
        </div>
    )
}
const Persons = props => {
    const { persons } = props
    return (
        <div>
            <Content persons={persons} />
        </div>
    )
}

export default Persons