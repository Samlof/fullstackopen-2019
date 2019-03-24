import React, { useState } from 'react'
import Persons from './components/Persons'


const Filter = props => {
    const { filterName, handleNewFiltername } = props
    return (
        <div>
            rajaa näytettäviä
        <input value={filterName} onChange={handleNewFiltername} />
        </div>
    )
}

const PersonForm = props => {
    const { addPerson, newName, handleNameChange, newNumber, handleNumberChange } = props

    return (
        <form onSubmit={addPerson}>
            <div>
                nimi: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                numero: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )
}
const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')

    const handleNameChange = e => {
        setNewName(e.target.value)
    }
    const handleNumberChange = e => {
        setNewNumber(e.target.value)
    }
    const handleNewFiltername = e => {
        setFilterName(e.target.value)
    }
    const addPerson = e => {
        e.preventDefault()

        if (persons.findIndex(p => p.name === newName) > -1) {
            alert(`${newName} on jo luettelossa`)
            return
        }
        const personObject = {
            name: newName,
            number: newNumber
        }
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
    }
    const toFilterName = filterName.toLowerCase()
    const personsToShow = toFilterName ?
        persons.filter(p =>
            p.name.toLowerCase().includes(toFilterName))
        : persons
    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <Filter filterName={filterName} handleNewFiltername={handleNewFiltername} />
            <h4>lisää uusi</h4>
            <PersonForm
                addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
            <h2>Numerot</h2>
            <Persons persons={personsToShow} />
        </div>
    )

}

export default App