import React from 'react'

const Content = props => {
    const { persons, deletePerson } = props

    return (
        <div>
            {persons.map(p => (
                <Part deletePerson={deletePerson} key={p.name} person={p} />
            ))}
        </div>
    )
}
const Part = props => {
    const { person, deletePerson } = props

    const confirmBox = () => {
        if (window.confirm(`Poistetaanko ${person.name}?`)) {
            deletePerson(person.id)
        }
    }
    return (
        <div>
            {person.name} {person.number}
            <button onClick={confirmBox}>Poista</button>
        </div>
    )
}
const Persons = props => {
    const { persons, deletePerson } = props
    return (
        <div>
            <Content deletePerson={deletePerson} persons={persons} />
        </div>
    )
}

export default Persons