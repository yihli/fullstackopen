import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import numbersService from './services/numbers'

import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    numbersService
      .getAll()
      .then(initialData => {
        console.log(initialData)
        setPersons(initialData)
      })
  },[])

  const nameExists = () => {
    for (const obj of persons) {
      if (obj.name === newName) {
        return true
      }
    }
    return false
  }

  const findId = (name) => {
    for (const obj of persons) {
      if (obj.name === newName) {
        return obj.id
      }
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const addEntry = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    setNewName('')
    setNewNumber('')

    if (nameExists()) {
      const confirmed = confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
      if (confirmed) {

        numbersService
          .replace(findId(newName), newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.name === newPerson.name ? {...person, newPerson} : person))
            console.log(updatedPerson)
            setMessage(`Updated ${updatedPerson.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
      return
    }

    numbersService
      .add(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setMessage(error.response.data.error)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const deleteEntry = (id) => {
    if (confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      numbersService
        .remove(id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== id))
          console.log(persons)
        })
    }
  }

  const personsToShow = newFilter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />

      <Filter onChange={handleFilterChange} value={newFilter} />

      <h2>Add a new number</h2>

      <PersonForm addEntry={addEntry} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}/>
      
      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} deleteEntry={deleteEntry}/>


    </div>
  )
}

export default App