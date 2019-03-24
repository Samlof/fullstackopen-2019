import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import personService from './services/persons'


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
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')

    useEffect(() => {
        personService.getAll().then(res => {
            setPersons(res)
        })
    }, [])
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
            if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
                const old = persons.find(p => p.name === newName)
                const newObj = { ...old, number: newNumber }
                personService.update(old.id, newObj).then(newO => {
                    setPersons(persons.map(p => p.name === newO.name ? newO : p))
                    setNewName('')
                    setNewNumber('')
                })
            }
            return
        }
        const personObject = {
            name: newName,
            number: newNumber
        }
        personService.create(personObject).then(per => {
            setPersons(persons.concat(per))
            setNewName('')
            setNewNumber('')
        })
    }
    const deletePerson = id => {
        personService.remove(id).then(p => {
            console.log("deleted " + id)
            setPersons(persons.filter(per => per.id !== id))
        })
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
            <Persons persons={personsToShow} deletePerson={deletePerson} />
        </div>
    )

}

export default App